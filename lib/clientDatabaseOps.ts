'use server';

import {unstable_noStore as noStore} from "next/dist/server/web/spec-extension/unstable-no-store";
import {auth} from "@/auth";
import {BlogPost, Project, ServerStatusResponse, TagElement} from "@/lib/definitions";
import {z} from "zod";
import {generateAPIContentWithMappings} from "@/lib/helper";
import {revalidatePath, revalidateTag} from "next/cache";

/***********************************************************************
 *                       FETCH OPERATION
 * *********************************************************************/
type RequestType = "POST" | "GET" | "DELETE" | "PATCH" | "PUT";
type PayloadType = Record<string, any> | null;
/**
 * Helper function to request an online attribute. Note that unlike the other requesting method, this one makes a request
 * using the user's authorization instead of the authorization intrinsic to the backend. This method will be used for
 * any requests that do not need backend user account administration access.
 *
 * @param url the endpoint to acquire data from
 * @param requestType the type of request to make
 * @param jsonResponse whether or not to expect a JSON object in the return value
 * @param data the data to convert to JSON to pass as the body to the server
 * @param asUser determines the header token to use
 *
 * @return The response returned (or the body of the response if jsonResponse is true)
 */
export async function makeLocalRequestWithData(url: string, requestType: RequestType, jsonResponse: boolean = false, data: PayloadType = null, asUser: boolean = false) {
    noStore(); // prevent any caching of response

    // access token will be attached to all requests but only validated on certain paths
    let accessTokHeader = null;
    let refererHeader = null;
    if(asUser) {
        const session = await auth();
        accessTokHeader = session ? {"Authorization": `Bearer ${session?.user?.access_token}`} : null;
        refererHeader = session ? {"Referer": `${session.user.referer}`} : null;
    }

    let response = await fetch(url, {
        method: requestType,
        headers: {"Content-Type": "application/json",
            ...accessTokHeader, // Add our bearer token if it exists in the session
            ...refererHeader}, // and our referer as needed
        ...(data && {body: JSON.stringify(data)})
    });

    try {
        if (jsonResponse)
            return response.json();
        else
            return response;
    } catch(error) {
        console.error("Database Error: ", error);
        throw new Error("Failed to generate a proper response...")
    }
}

/***********************************************************************
 *                  BLOG POST OPERATIONS                               *
 ***********************************************************************/
export type BlogStatus = {
    errors?: {
        id?: string[];
        postTags?: string[];
        headerUrl?: string[];
        headerFilename?: string[];
        title?: string[];
        content?: string[];
        imageMappings?: string[];
        published?: string[];
    },
    message?: string | null;
}

const BlogTag = z.object({
    id: z.coerce.string().nullable(),  // this is mostly used for rendering, so we can largely ignore its presence
    tagName: z.string({
        required_error: "Tag must have some valid non-null string value associated."
    })
})

const BlogPostSchema = z.object({
    id: z.coerce.string({
        required_error: "Post must have a valid id",
    }),
    postTags: z.array(BlogTag).optional(),
    headerUrl: z.string({
        required_error: "Header Image Url cannot be empty.",
    }).url({
        message: "Header must have a valid URL entity."
    }).refine(inputUrl => {
        return inputUrl !== (process.env.AWS_CLOUDFRONT_SERVE_ORIGIN + "/static/" + "dummyimage.png");
    }, {message: "Passed URL cannot be the base provided URL."}),
    headerFilename: z.string({
        required_error: "Header image filename cannot be empty.",
    }),
    title: z.string({
        required_error: "A blog post must have a valid non-null title",
    }).min(4, {
        message: "Please use a more descriptive post title."
    }),
    content: z.string({
        required_error: "A blog's content cannot be empty.",
    }),
    published: z.boolean({
        required_error: "Published must be set to some boolean value."
    }),
    imageMappings: z.record(
        z.string(),
        z.string().url({
            message: "Value must have a valid URL entity"
        }),
        {required_error: "There must be at least 1 mapping corresponding to the header image."}
    ),
})

// And now our blog post update schemas
const NewBlogPostSchema = BlogPostSchema.omit({id: true}).refine((data) => {
    return data.headerUrl.endsWith(data.headerFilename);
}, {message: "Header filename must be a substring of the header URL."});
const UpdateBlogPostSchema = BlogPostSchema.refine((data) => {
    return data.headerUrl.endsWith(data.headerFilename);
})

/**
 * Make a request to the backend for the creation or update of a new post. Performs some simple validation before being
 * sent to the backend.
 *
 * @param blogPostTitle
 * @param blogPostContent
 * @param blogHeaderRef
 * @param postTags
 * @param publish
 * @param blogId
 */
export async function submitBlogPost(blogPostTitle : string,
                                     blogPostContent : string,
                                     blogHeaderRef : string,
                                     postTags : TagElement[],
                                     publish : boolean,
                                     blogId? : String) : Promise<BlogStatus> {
    // In order for the upload to work, we need to process the images before we can send it to the backend. The REST API
    // requests the images in the object as just the filenames that would be used in the key for the bucket, and instead
    // the imageMappings map within the request body would allow the API to upload the requested images.
    const updatedValues = await generateAPIContentWithMappings(blogPostContent, blogHeaderRef);

    // validate our inputs first
    let validatedPost;
    if(!blogId) {
        validatedPost = NewBlogPostSchema.safeParse({
            headerUrl: blogHeaderRef,
            headerFilename: updatedValues.postHeader,
            title: blogPostTitle,
            content: updatedValues.postContent,
            postTags: postTags.map(tag => ({id: (tag.id === tag.tagName) ? null : tag.id, tagName: tag.tagName})),
            published: publish,
            imageMappings: updatedValues.imgMaps,
        });
    } else {
        validatedPost = UpdateBlogPostSchema.safeParse({
            id: blogId,
            headerUrl: blogHeaderRef,
            headerFilename: updatedValues.postHeader,
            title: blogPostTitle,
            content: updatedValues.postContent,
            postTags: postTags.map(tag => ({id: (tag.id === tag.tagName) ? null : tag.id, tagName: tag.tagName})),
            published: publish,
            imageMappings: updatedValues.imgMaps,
        });
    }

    if(!validatedPost.success) {
        console.log(validatedPost.error.flatten());
        return {
            errors: validatedPost.error.flatten().fieldErrors,
            message: "Failed to create new post."
        };
    }

    // then attempt to communicate with backend to create the post
    try {
        const relEndpoint = process.env.BACKEND_API_ROOT! + ((blogId) ? `/blog/posts/${blogId}` : "/blog/posts/new");
        const response = await makeLocalRequestWithData(relEndpoint, "POST", false, validatedPost.data, true);

        if(!response.ok)
            throw response;

        // and try to parse the json response from the server
        // since this REST API returns the new post along with ids, we can simply pass the id itself back to the front-end as proof of creation
        const jsonReturn : BlogPost = await response.json();

        // and revalidate both the post itself and values touched by the blog preview page
        revalidatePath('/blog')
        revalidatePath(`/blog/${jsonReturn.id}`);
        return {
            message: `/blog/${jsonReturn.id}`
        };
    } catch (e) {
        return {
            errors: {},
            message: `Unknown error encountered curing ${(blogId)? "updating" : "creation"}. Is the server up?`
        };
    }
}

/**
 * Performs deletion of a tagId given the string ID of the tag
 * @param tagId
 */
export async function deleteTagById(tagId: string): Promise<ServerStatusResponse> {
    try {
        const relEndpoint = process.env.BACKEND_API_ROOT + `/blog/tags/${tagId}`;
        const response = await makeLocalRequestWithData(relEndpoint, "DELETE", false, null, true);

        // revalidate tags and return
        revalidateTag("blogTag");
        return response.json();
    } catch (e) {
        console.log("Error encountered during tag deletion.");
        return {
            success: false,
            statusCode: 400,
            message: "Unknown error encountered."
        };
    }
}

export async function deletePostById(postId: string): Promise<ServerStatusResponse> {
    try {
        const relEndpoint = process.env.BACKEND_API_ROOT + `/blog/posts/${postId}`;
        const response = await makeLocalRequestWithData(relEndpoint, "DELETE", false, null, true);

        // revalidate path and return
        revalidatePath("/blog");
        return response.json();
    } catch (e) {
        console.log("Error encountered during post deletion");
        return {
            success: false,
            statusCode: 400,
            message: "Unknown error encountered."
        };
    }
}

/***********************************************************************
 *                  RESUME PROJECT OPERATIONS                          *
 ***********************************************************************/

export type ResumeProjectStatus = {
    errors?: {
        id?: string[];
        title?: string[];
        shortDescription?: string[];
        projectRole?: string[];
        projectType?: string[];
        projectStart?: string[];
        projectEnd?: string[];
        content?: string[];
    },
    message?: string | null;
}

const ReferenceSchema = z.object({
    id: z.string().nullable(),
    href: z.string({
        required_error: "Reference must contain a valid hyperlink reference."
    }),
    icon: z.string({
        required_error: "Reference must have a valid icon type string value."
    }),
    description: z.string().nullable(),
})

const ResumeProjectSchema = z.object({
    id: z.string().nullable(),
    title: z.string({
        required_error: "Resume project must have a valid title.",
    }).max(50, {
        message: "Title cannot be more than 50 characters long.",
    }).min(1, {
        message: "Title cannot be empty."
    }),
    shortDescription: z.string({
        required_error: "Resume project must have some short description.",
    }),
    projectRole: z.string({
        required_error: "Resume project must have some defined role.",
    }).min(1, {
        message: "Role cannot be empty."
    }),
    projectType: z.string({
        required_error: "Resume project must have some type.",
    }).min(1, {
        message : "Type cannot be empty."
    }),
    projectStart: z.string().date("Invalid date"),
    projectEnd: z.union([z.string().date(), z.null()], {
        required_error: "Resume project end date must either be null or a valid date."
    }),
    content: z.object({
        bullets: z.array(z.string()).min(1, {
            message: "Cannot be empty."
        }),
        references: z.array(ReferenceSchema),
    }, {
        required_error: "There must be a valid content entry within a resume project entry."
    }),
})

const UpdateResumeProjectSchema = ResumeProjectSchema;
const NewResumeProjectSchema = ResumeProjectSchema.omit({"id": true});

// and then our operation functions
export async function submitResumeProject(formData: FormData) : Promise<ResumeProjectStatus> {
    // validate our inputs
    let validatedProject;
    const projectId = formData.get("id");

    if(!projectId) {
        validatedProject = NewResumeProjectSchema.safeParse({
            title: formData.get("title"),
            shortDescription: formData.get("description"),
            projectRole: formData.get("role"),
            projectType: formData.get("type"),
            projectStart: formData.get("start"),
            projectEnd: formData.get("end") !== "" ? formData.get("end") : null,
            content: {
                bullets: JSON.parse(formData.get("bullets") as string),
                references: JSON.parse(formData.get("references") as string),
            },
        });
    } else {
        validatedProject = UpdateResumeProjectSchema.safeParse({
            id: projectId,
            title: formData.get("title"),
            shortDescription: formData.get("description"),
            projectRole: formData.get("role"),
            projectType: formData.get("type"),
            projectStart: formData.get("start"),
            projectEnd: formData.get("end") !== "" ? formData.get("end") : null,
            content: {
                bullets: JSON.parse(formData.get("bullets") as string),
                references: JSON.parse(formData.get("references") as string),
            },
        });
    }

    if(!validatedProject.success) {
        return {
            errors: validatedProject.error.flatten().fieldErrors,
            message: `Failed to create new post. Please fix the errors below.`
        };
    }

    // and then attempt to post it to our server and return the expected status
    // then attempt to communicate with backend to create the post
    try {
        const relEndpoint = process.env.BACKEND_API_ROOT! + ((projectId) ? `/resume/project/${projectId}` : "/resume/project/new");
        const response = await makeLocalRequestWithData(relEndpoint, "POST", false, validatedProject.data, true);

        if(!response.ok)
            throw response;

        // and revalidate both the post itself and values touched by the blog preview page
        revalidatePath('/resume')
        revalidatePath(`/dashboard/resume/projects`);
        return {
            message: "Updated resume project.",
        };
    } catch (e) {
        return {
            errors: {},
            message: `Unknown error encountered curing ${(projectId)? "updating" : "creation"}. Is the server up?`,
        };
    }
}

export async function deleteResumeProject(projectId: string) {
    try {
        const relEndpoint = process.env.BACKEND_API_ROOT! + `/resume/project/${projectId}`;
        const response = await makeLocalRequestWithData(relEndpoint, "DELETE", false, null, true);

        if(!response.ok)
            throw response;

        // and revalidate paths as usual
        revalidatePath('/resume');
        revalidatePath('/dashboard/resume/projects');
        return true;
    } catch (e) {
        return false;
    }
}