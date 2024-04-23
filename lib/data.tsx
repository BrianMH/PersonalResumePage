'use server';
import {
    BlogPost,
    BlogPreview,
    EducationEntry,
    ExperienceEntry,
    GaugeValue,
    IdWrapper,
    ProjectBrief, ProjectEntry, Role, TagElement
} from "@/lib/definitions";
import {
    DummyEducationEntries,
    DummyExperienceEntries, DummyPostData,
    DummyProjectData,
    DummySoftSkillData, DummyTagData,
    DummyTechnicalGuageData
} from "@/lib/dummyData";
import {NUM_BLOG_POSTS} from "@/lib/consts";
import {Profile} from "next-auth";
import {unstable_noStore as noStore} from "next/cache";
import {auth} from "@/auth";

type RequestType = "POST" | "GET" | "DELETE" | "PATCH" | "PUT";
type PayloadType = Record<string, any> | null;
/**
 * Helper function to request an online attribute
 * @param url the endpoint to acquire data from
 * @param requestType the type of request to make
 * @param jsonResponse whether or not to expect a JSON object in the return value
 * @param data the data to convert to JSON to pass as the body to the server
 *
 * @return The response returned (or the body of the response if jsonResponse is true)
 */
export async function makeLocalRequestWithData(url: string, requestType: RequestType, jsonResponse: boolean = false, data: PayloadType = null) {
    noStore(); // prevent any caching of response

    // access token will be attached to all requests but only validated on certain paths
    const session = await auth();
    const accessTokHeader = {"Authorization": `Bearer ${session?.user?.access_token}`};

    let response = await fetch(url, {
        method: requestType,
        headers: {"Content-Type": "application/json",
                    ...(session && accessTokHeader)}, // Add our bearer token if it exists in the session
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


/**
 * This is where all the database retrievals will happen.
 */

export async function fetchTechnicalSkills() : Promise<GaugeValue[]> {
    // first load our data via a fetch operation
    const skillData = Promise.resolve(DummyTechnicalGuageData);

    // and then return it
    return skillData;
}

export async function fetchSoftSkills() : Promise<GaugeValue[]> {
    // first load in our data
    const skillData = Promise.resolve(DummySoftSkillData);

    // and then return it
    return skillData;
}

export async function fetchProjectBriefs() : Promise<ProjectBrief[]> {
    // first load in data
    const briefData = Promise.resolve(DummyProjectData.map(
        (curProj => ({
            id: curProj.id,
            name: curProj.name,
            description: curProj.description,
        }))
    ));

    // and return it
    return briefData;
}

export async function fetchProjects() : Promise<ProjectEntry[]> {
    // first load in data
    const projData = Promise.resolve(DummyProjectData);

    // and return it
    return projData;
}

export async function fetchEducationEntries() : Promise<EducationEntry[]> {
    // first load in data
    const eduData = Promise.resolve(DummyEducationEntries);

    // and return it
    return eduData;
}

export async function fetchExperienceEntries() : Promise<ExperienceEntry[]> {
    // first load in data
    const expData = Promise.resolve(DummyExperienceEntries);

    // and return it
    return expData;
}

export async function fetchNumPages(query: string) : Promise<number> {
    // first load in our data
    const numPages = Promise.resolve(1);

    return numPages;
}

export async function fetchPostById(id: string) : Promise<BlogPost | undefined> {
    // fetch post from database
    const relevantPost = Promise.resolve(DummyPostData.find((post) => post.id === id));

    // and then return
    return relevantPost;
}

export async function fetchPostPreviewById(id: string) : Promise<BlogPreview | undefined> {
    // fetch preview from database
    const relevantPost = Promise.resolve(DummyPostData.map(post => ({
        id: post.id,
        postTitle: post.postTitle,
        headerImage: post.headerImage,
        postDate: post.postDate,
    })).find((post) => post.id === id));

    // and then return our preview
    return relevantPost;
}

export async function fetchNextNPPostIds(query: string, currentPage: number, pageSize: number = NUM_BLOG_POSTS) : Promise<IdWrapper[]> {
    // first load our data in
    const nextNPosts = Promise.resolve(DummyPostData.map(post => ({
        id: post.id,
    })));

    return nextNPosts;
}

export async function fetchAllTags() : Promise<TagElement[]> {
    // first load our data in
    const allTags = Promise.resolve(DummyTagData);

    return allTags;
}

/**
 * User our server to look up the proper role to return given an input email. We can (in theory) pass even more elements
 * to the server, but for an application this simple the user email should be sufficient.
 *
 * @param userPayload the user profile to pass to the database to check for privileges
 */
export async function fetchUserRoleGivenEmail(userPayload : Profile) : Promise<Role> {
    return (userPayload.email === process.env.ADMIN_EMAIL) ? Role.ADMIN : Role.USER;
}