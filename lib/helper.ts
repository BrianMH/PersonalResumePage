'use server';
import {JSDOM} from "jsdom";
import {signOut} from "@/auth";
/**
 * Contains some of the helper functions that are necessary to manipulate the blog pages into properly functioning versions.
 */

export async function adjustImageSourcePath(postContent: string, postId: string) {
    // first we extract the line with the <img> tag
    let postDoc = new JSDOM(postContent);

    // adjust our images
    for(const imgElem of postDoc.window.document.getElementsByTagName("img")) {
        if(!imgElem.src.startsWith(process.env.AWS_CLOUDFRONT_SERVE_ORIGIN+''))
            imgElem.src = process.env.AWS_CLOUDFRONT_SERVE_ORIGIN + "/dynamic/" + postId + "/" + imgElem.src;
    }

    // and return the modified content
    const bodyTag = postDoc.window.document.querySelector("body");
    if(!bodyTag) {
        throw new Error("Malformed document passed.");
    }

    return bodyTag.innerHTML;
}

export async function performLogOut() {
    await signOut();
}