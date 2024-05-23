/**
 * Holds the right side navigation bar used for the blog posts.
 */
import {fetchAllTags} from "@/lib/data";
import {TAG_COLOR_PALETTES} from "@/lib/consts";
import TagNavigator from "@/components/blog-right-side-nav-tagging";
import {Suspense} from "react";
import {Skeleton} from "@/components/ui/skeleton";
import {auth} from "@/auth";
import {Role} from "@/lib/definitions";
import TagAdminNavigator from "@/components/blog-right-side-nav-tag-admin";

export default async function RightBlogNav() {
    // if we want to give an admin the ability to remove tags, we should include an X marker next to the tags in order
    // to allow for their deletion
    const sess = await auth();

    // We need to grab all our potential blog tags from the server
    const receivedTags = await fetchAllTags();

    if(!receivedTags)
        throw Error("Invalid tag return. Is the server down?");

    // we randomly select colors for the tags according to their ids
    const tagsWithColors = receivedTags.map(curTag => {
        const hash = String(curTag.id).split("").map(char => char.charCodeAt(0)).reduce((prev, cur, ind) => (prev ^ cur), 0);

        const selected = TAG_COLOR_PALETTES.at(hash % TAG_COLOR_PALETTES.length);
        if(!selected)
            throw new Error("Color palette list cannot be empty.");

        return {...curTag, color: selected};
    })

    return (
        <div className="w-64 h-fit p-3 pb-6 bg-card mr-6 shadow-2xl">
            <div className="relative flex flex-row justify-center">
                <p className="text-center pb-3 text-2xl">
                    Topics
                </p>
            </div>

            {/*This can contain our relevant tags in the form of clickable tags (only 1 selectable)*/}
            <div className="flex flex-row gap-3 flex-wrap align-middle justify-center">
                <Suspense
                    fallback={<Skeleton className="w-full h-64" />}
                >
                    {
                        (sess && sess.user.role === Role.ADMIN) ?
                            <TagAdminNavigator tagsWithColors={tagsWithColors} />
                            :
                            <TagNavigator tagsWithColors={tagsWithColors} />
                    }
                </Suspense>
            </div>
        </div>
    )
}