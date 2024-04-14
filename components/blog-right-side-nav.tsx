/**
 * Holds the right side navigation bar used for the blog posts.
 */
import {Badge} from "@/components/ui/badge";
import {clsx} from "clsx";
import {fetchAllTags} from "@/lib/data";

export default async function RightBlogNav() {
    // We need to grab all our potential blog tags from the server
    const receivedTags = await fetchAllTags();

    return (
        <div className="w-64 h-60 p-3 bg-card mr-6 shadow-2xl">
            <p className="text-center pb-3 text-2xl">
                Topics
            </p>

            {/*This can contain our relevant tags in the form of clickable tags (only 1 selectable)*/}
            <div className="flex flex-row gap-3 flex-wrap align-middle justify-center">
                {receivedTags.map(curTag => {

                    return (
                        <Badge
                            key={curTag.id}
                            className={`h-10 text-[0.9rem] ${curTag.color}`}
                        >
                            {curTag.tagName}
                        </Badge>
                    )
                })}
            </div>
        </div>
    )
}