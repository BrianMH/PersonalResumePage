'use server';

import {unstable_noStore as noStore} from "next/dist/server/web/spec-extension/unstable-no-store";
import {auth} from "@/auth";
import {TagElement} from "@/lib/definitions";
import {z} from "zod";

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
    if(asUser) {
        const session = await auth();
        accessTokHeader = session ? {"Authorization": `Bearer ${session?.user?.access_token}`} : null;
    }

    let response = await fetch(url, {
        method: requestType,
        headers: {"Content-Type": "application/json",
            ...accessTokHeader}, // Add our bearer token if it exists in the session
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
        title?: string[];
        content?: string[];
    },
    message?: string | null;
}

const BlogTag = z.object({
    id: z.string().nullable(),  // this is mostly used for rendering, so we can largely ignore its presence
    tagName: z.string({
        required_error: "Tag must have some valid non-null string value associated."
    })
})

const BlogPost = z.object({
    id: z.string({
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
    title: z.string({
        required_error: "A blog post must have a valid non-null title",
    }).min(4, {
        message: "Please use a more descriptive post title."
    }),
    content: z.string({
        required_error: "A blog's content cannot be empty.",
    })
})

// And now our blog post update schemas
const NewBlogPostSchema = BlogPost.omit({id: true});

/**
 * Make a request to the backend for the creation of a new post. Performs some simple validation before being
 * sent to the backend.
 *
 * @param blogPostTitle
 * @param blogPostContent
 * @param blogHeaderRef
 * @param postTags
 */
export async function submitBlogPost(blogPostTitle : string, blogPostContent : string, blogHeaderRef : string, postTags : TagElement[]) : Promise<BlogStatus> {
    // validate our inputs first
    const validatedNewBlogPost = NewBlogPostSchema.safeParse({
        headerUrl: blogHeaderRef,
        title: blogPostTitle,
        content: blogPostContent,
        postTags: postTags.map(tag => ({id: (tag.id === tag.tagName) ? null : tag.id, tagName: tag.tagName})),
    })

    if(!validatedNewBlogPost.success) {
        console.log(validatedNewBlogPost.error.flatten())
        return {
            errors: validatedNewBlogPost.error.flatten().fieldErrors,
            message: "Failed to create new post."
        }
    }

    // then attempt to communicate with backend to create the post
    try {
        console.log(validatedNewBlogPost.data);
    } catch (e) {
        console.log("Exception encountered during post creation.")
        return {
            errors: {},
            message: "Unknown error encountered. Is the server up?"
        }
    }

    // successful operation. no message needed
    return {message: "/blog/1"}
}