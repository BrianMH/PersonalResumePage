/**
 * Holds our data types that would eventually be extracted from the server
 */

/**
 * A representation of a "scale" that's used to measure the knowledge associated with a given technical or
 * soft skill
 */
export type GaugeValue = {
    id: string;
    name: string;
    barVal: number;
};

/**
 * A shortened version of project that doesn't provide as much information since it may not be used again
 *
 * Maybe includes an image ref that can be used? Not sure if it would be necessary at this point.
 */
export type ProjectBrief = {
    id: string;
    name: string;
    description: string;

    imageRef?: string|null;
}

export type ProjectEntry = {
    id: string;
    name: string;
    description: string;
    imageRef: string;
    content: {};
}

export type Project = {
    id: string;
    title: string;
    short_description: string;
    project_role: string;
    project_type: string;
    project_start: string;
    project_end: string;
    content: {
        bullets: string[];
        references: ReferenceEntry[];
    };
}

/**
 * Used to keep track of education elements
 */
export type EducationEntry = {
    id: string;
    degreeType: string;
    degreeFocus: string;
    degreeLocation: string;
    degreeStart: string;
    degreeEnd: string;
    description: {
        focus?: string;
        gpa?: number;
        topics?: string[];
    }
}

/**
 * Used to keep track of experiences (AKA paid work / internships / etc.)
 */
export type ReferenceEntry = {
    id: string;
    icon: string;
    description: string;
    href: string;
}

export type ExperienceEntry = {
    id: string;
    jobTitle: string;
    jobLocation: string;
    jobTimeStart: string;
    jobTimeEnd: string;
    jobType: string;
    description: {
        bullets: String[];
        references?: ReferenceEntry[];
    };
}

export type TagElement = {
    id: string;
    tagName: string;
}

// previews aren't dependent on the content as no content is shown from the front page
export type BlogPreview = {
    id: string;
    title: string;
    headerFilename: string;
    created: string;
    published: boolean;
}

export type BlogPost = {
    id: string;
    title: string;
    headerFilename: string;
    content: string;
    published: boolean;
    created: string;
    updated: string;
    postTags: TagElement[];
}

// Used only for streaming content, as the id would uniquely identify each element
export type IdWrapper = {
    id: string;
}

export const enum Role {
    USER = "ROLE_USER",
    ADMIN = "ROLE_ADMIN",
}

export type ServerStatusResponse = {
    success: boolean,
    statusCode: number,
    message: string,
}