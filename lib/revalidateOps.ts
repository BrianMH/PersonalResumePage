'use server';
/**
 * Provides all the server-side revalidation actions to be used for debugging
 */

import {revalidateTag} from "next/cache";

/**
 * Forces revalidation of all post paths (specifically the post rendering paths)
 */
export async function revalidateAllBlogPosts() {
    revalidateTag("blogPost");
}

/**
 * Forces revalidation of all blog post previews.
 */
export async function revalidateAllBlogPreviews() {
    revalidateTag("blogPreview");
}

/**
 * Forces revalidation of all blog post tags.
 */
export async function revalidateAllBlogTags() {
    revalidateTag("blogTag");
}