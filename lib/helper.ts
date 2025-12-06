'use server';
import {JSDOM} from "jsdom";
import {signOut} from "@/auth";
/**
 * Contains some of the helper functions that are necessary to manipulate the blog pages into properly functioning versions.
 */

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
        "October", "November", "December"];
/**
 * Converts an input date string of the format dd-MM-YYYY to a simplified MMM-YY format.
 * @param inputDate
 */
export async function convertNumericalDateToMM_YY(inputDate : string) {
    // if entry is null, then it must be due to being the current date
    if(inputDate === null)
        return "Current";

    // first split our strings into the required three parts
    const resToks = inputDate.split("-")
    if(resToks.length !== 3)
        return inputDate; // prevent manipulation if the passed value makes no sense

    // then use the relevant parts to create the final response
    return monthNames[Number(resToks[1]) - 1].substring(0, 3) + " '" + resToks[0].substring(2);
}

/**
 * Takes in a post's content and adapts it from its generic "filename.extension" format into the proper path that includes
 * the CDN path prefix.
 *
 * @param postContent content as saved on the backend
 * @param postId the id of the content being modified
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

/**
 * Basic helper function to strip the filename out of a given URL path
 * @param url the input for which to strip the url from
 */
const urlGrabber = (url : string) => url.split('#')[0].split('?')[0].split('/').pop()!;

/**
 * Given a raw blog content, builds the API requested list of images along with their corresponding filenames in order to
 * allow for easier blog creation.
 * @param postContent
 * @param postHeader
 */
export async function generateAPIContentWithMappings(postContent: string, postHeader: string) {
    // let us first load up the content
    let postDoc = new JSDOM(postContent);

    // grab all images present in our file and creates a mapping between filename -> filepath + filename
    const postHeaderFilename = urlGrabber(postHeader);
    let imgMapping : Record<string, string> = {};
    imgMapping[urlGrabber(postHeader)] = postHeader;
    for(const imgElem of postDoc.window.document.getElementsByTagName("img")) {
        // first use the paths in order to assign to our mapping
        imgMapping[urlGrabber(imgElem.src)] = imgElem.src;

        // and then adjust the image
        imgElem.src = urlGrabber(imgElem.src);
    }

    // and return the modified content
    const bodyTag = postDoc.window.document.querySelector("body");
    if(!bodyTag) {
        throw new Error("Malformed document passed.");
    }

    return {
        imgMaps: imgMapping,
        postContent: bodyTag.innerHTML,
        postHeader: urlGrabber(postHeader),
    };
}

export async function performLogOut() {
    await signOut();
}