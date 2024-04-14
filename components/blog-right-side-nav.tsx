/**
 * Holds the right side navigation bar used for the blog posts.
 */
import {fetchAllTags} from "@/lib/data";
import {TAG_COLOR_PALETTES} from "@/lib/consts";
import TagNavigator from "@/components/blog-right-side-nav-tagging";

export default async function RightBlogNav() {
    // We need to grab all our potential blog tags from the server
    const receivedTags = await fetchAllTags();

    // we randomly select colors for the tags according to their ids
    const tagsWithColors = receivedTags.map(curTag => {
        const hash = String(curTag.id).split("").map(char => char.charCodeAt(0)).reduce((prev, cur, ind) => (prev ^ cur), 0);

        const selected = TAG_COLOR_PALETTES.at(hash % TAG_COLOR_PALETTES.length);
        if(!selected)
            throw new Error("Color palette list cannot be empty.");

        return {...curTag, color: selected};
    })

    return (
        <div className="w-64 h-60 p-3 bg-card mr-6 shadow-2xl">
            <p className="text-center pb-3 text-2xl">
                Topics
            </p>

            {/*This can contain our relevant tags in the form of clickable tags (only 1 selectable)*/}
            <div className="flex flex-row gap-3 flex-wrap align-middle justify-center">
                <TagNavigator tagsWithColors={tagsWithColors} />
            </div>
        </div>
    )
}