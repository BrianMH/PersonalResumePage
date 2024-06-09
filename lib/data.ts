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
    DummyExperienceEntries,
    DummyProjectData,
    DummySoftSkillData,
    DummyTechnicalGuageData
} from "@/lib/dummyData";
import {NUM_BLOG_POSTS} from "@/lib/consts";
import {makeLocalRequestWithData} from "@/lib/clientDatabaseOps";
import {auth} from "@/auth";

/***********************************************************************
 *                       FETCH OPERATION
 * *********************************************************************/
/**
 * We already have two no_cache operations available (one for API and one for USER access). However,
 * this function is only used to make "GET" requests that prompt for JSON returns
 * that are subsequently cached by the server. This is useful as it will be used later on in
 * order to allow for custom invalidations and only used for non-authenticated paths in the API.
 * Note that by default, the API will revalidate all requests every hour (but that can be changed if desired)
 * @param url
 * @param tagList
 * @param revalidateTime
 * @param useAuth
 */
export async function makeCachedGetRequest(url: string, tagList?: string[], useAuth: boolean = false, revalidateTime: number = 3600) {
    // grab session if necessary
    let accessTokHeader = null;
    let refererHeader = null;
    if (useAuth) {
        const session = await auth();
        accessTokHeader = session ? {"Authorization": `Bearer ${session?.user?.access_token}`} : null;
        refererHeader = session ? {"Referer": `${session.user.referer}`} : null;
    }

    let response = await fetch(url, {
        method: "GET",
        headers: {"Content-Type": "application/json",
            ...accessTokHeader, // Add our bearer token if it exists in the session
            ...refererHeader}, // and our referer as needed,
        ...(tagList && { next: { tags: tagList, revalidate: revalidateTime } }),
    });

    return response;
}

/***********************************************************************
 *                       DATA OPERATIONS
 * *********************************************************************/

/**
 * This is where all the database retrievals will happen.
 */
export async function fetchTechnicalSkills() : Promise<GaugeValue[]> {
    try {
        const relEndpoint = process.env.BACKEND_API_ROOT + '/resume/skills/type/technical';
        const response = await makeCachedGetRequest(relEndpoint, ['resume', 'skill']);

        if(!response.ok)
            throw response.status;

        // then process json
        return response.json() as Promise<GaugeValue[]>;
    } catch (e) {
        console.log("Error encountered fetching technical skills. Falling back on dummy data.");
        return DummyTechnicalGuageData;
    }
}

export async function fetchSoftSkills() : Promise<GaugeValue[]> {
    try {
        const relEndpoint = process.env.BACKEND_API_ROOT + '/resume/skills/type/soft';
        const response = await makeCachedGetRequest(relEndpoint, ['resume', 'skill']);

        if(!response.ok)
            throw response.status;

        // then process json
        return response.json() as Promise<GaugeValue[]>;
    } catch (e) {
        console.log("Error encountered fetching soft skills. Falling back on dummy data.");
        return DummySoftSkillData;
    }
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
    try {
        const relEndpoint = process.env.BACKEND_API_ROOT + '/resume/education';
        const response = await makeCachedGetRequest(relEndpoint, ['resume', 'education']);

        if(!response.ok)
            throw response.status;

        // then process json
        return response.json() as Promise<EducationEntry[]>;
    } catch (e) {
        console.log("Error encountered fetching soft skills. Falling back on dummy data.");
        return DummyEducationEntries;
    }
}

export async function fetchExperienceEntries() : Promise<ExperienceEntry[]> {
    try {
        const relEndpoint = process.env.BACKEND_API_ROOT + '/resume/experience';
        const response = await makeCachedGetRequest(relEndpoint, ['resume', 'experience']);

        if(!response.ok)
            throw response.status;

        // then process json
        return response.json() as Promise<ExperienceEntry[]>;
    } catch (e) {
        console.log("Error encountered fetching soft skills. Falling back on dummy data.");
        return DummyExperienceEntries;
    }
}

export async function fetchNumPages(query: string, pageSize: number = NUM_BLOG_POSTS) : Promise<number> {
    try {
        const relEndpoint = process.env.BACKEND_API_ROOT + `/blog/posts/paged/${pageSize}?tagName=${query}`;
        const response = await makeCachedGetRequest(relEndpoint, ['blogPreview']);

        if(!response.ok)
            throw response.status;

        // then process it
        return response.json() as Promise<number>;
    } catch (e) {
        console.log(`Error encountered on post fetch : ${e}`);
        return -1;
    }
}

/**
 * In order to provide a chance to cache, we have to use the built-in fetch operation without the caching prevention.
 * @param id
 */
export async function fetchPostById(id: string) : Promise<BlogPost | null> {
    try {
        // get our session to identify the user
        const session = await auth();
        const getDrafts = session?.user?.role === Role.ADMIN;

        let relEndpoint : string;
        let response;
        if(getDrafts) {
            relEndpoint = process.env.BACKEND_API_ROOT + `/blog/all/posts/${id}`
            response = await makeCachedGetRequest(relEndpoint, ['blogPost'], true);
        } else {
            relEndpoint = process.env.BACKEND_API_ROOT + `/blog/posts/${id}`;
            response = await makeCachedGetRequest(relEndpoint, ['blogPost']);
        }

        if(!response.ok)
            throw response.status;

        // then process the json to get our actual blog post
        return response.json() as Promise<BlogPost>;
    } catch (e) {
        console.log(`Error encountered on post fetch : ${e}`);
        return null;
    }
}

export async function fetchPostPreviewById(id: string) : Promise<BlogPreview | null> {
    try {
        const relEndpoint = process.env.BACKEND_API_ROOT + `/blog/posts/${id}/preview`;
        const response = await makeCachedGetRequest(relEndpoint, ['blogPreview']);

        if(!response.ok)
            throw response.status;

        // then process the json to get the preview
        return response.json() as Promise<BlogPreview>;
    } catch (e) {
        console.log(`Error encountered on post preview fetch : ${e}`);
        return null;
    }
}

export async function fetchNextNPPostIds(query: string, currentPage: number, pageSize: number = NUM_BLOG_POSTS) : Promise<IdWrapper[]> {
    try {
        // get our session to identify the user
        const session = await auth();
        const getDrafts = session?.user?.role === Role.ADMIN;

        let relEndpoint : string;
        let response;
        if(getDrafts) {
            relEndpoint = process.env.BACKEND_API_ROOT + `/blog/posts/all/paged/${pageSize}/${currentPage - 1}?tagName=${query}`;
            response = await makeCachedGetRequest(relEndpoint, ['blogPreview'], true)
        } else {
            relEndpoint = process.env.BACKEND_API_ROOT + `/blog/posts/paged/${pageSize}/${currentPage - 1}?tagName=${query}`;
            response = await makeCachedGetRequest(relEndpoint, ['blogPreview']);
        }

        if(!response.ok)
            throw response.status;

        // then process the json
        return response.json() as Promise<IdWrapper[]>;
    } catch (e) {
        console.log(`Error encountered on post id fetch : ${e}`);
        return [];
    }
}

/**
 * Unlike the above fetch function, this returns a list of ALL post ids that are available.
 */
export async function fetchAllPostIds() : Promise<IdWrapper[]> {
    try {
        const relEndpoint = process.env.BACKEND_API_ROOT + '/blog/posts';
        const response = await makeLocalRequestWithData(relEndpoint, "GET", false);

        if(!response.ok)
            throw response.json();

        // then process json
        return response.json() as Promise<IdWrapper[]>;
    } catch (e) {
        console.log(`Error encountered on all post ids fetch : ${e}`);
        return [];
    }
}

export async function fetchAllTags() : Promise<TagElement[] | null> {
    try {
        const relEndpoint = process.env.BACKEND_API_ROOT + '/blog/tags/all';
        const response = await makeCachedGetRequest(relEndpoint, ["blogTag"]);

        if(!response.ok)
            throw response.status

        // and then process to get the tags
        return response.json() as Promise<TagElement[]>;
    } catch (e) {
        console.log(`Error encountered on tag fetch : ${e}`);
        return null;
    }
}