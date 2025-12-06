/**
 * A UI that allows a user to set the tags for a given post (and add new ones if so desired). It does not keep track of
 * its own tags, and must be passed a setter and relevant variable container from the parent to properly set its state.
 *
 * The idea of the tag selector is simple. We have a hidden div that takes the appearance of the left side of the form
 * as a sort of "padding" element that eventually is populated by the user's selection of tags. Of course, this is only
 * visually the appearance and the actual input itself will be present to the right of the input-like div element.
 */
import {ChangeEvent, Dispatch, KeyboardEvent, RefObject, SetStateAction, useRef} from "react";
import {TagElement} from "@/lib/definitions";
import {clsx} from "clsx";
import {Badge} from "@/components/ui/badge";

export default function BlogTagSelector({ tagList, tagListSetter } :
        { tagList: TagElement[]; tagListSetter : Dispatch<SetStateAction<TagElement[]>> }) {
    // we need access to a ref that accesses the input
    const inputRef : RefObject<HTMLInputElement> = useRef(null);

    // reaction to creating / removing tags (maybe enter functionality as well?)
    // this has its own reference passed as the event itself is intrinsic to the input value
    function handleTagAdd(event : ChangeEvent<HTMLInputElement>) {
        // we don't ever want to handle empty tags or multiple spaces...
        if(event.target.value === " ") {
            event.target.value = "";
            return;
        }

        if(event.target.value.length && event.target.value.endsWith(" ")) {
            // if our starting character is a quotation mark, we can ignore this for now
            if (event.target.value.length > 2 && (event.target.value.startsWith("\"") && !event.target.value.endsWith("\" "))) {
                return;
            }

            // for a space, we force the creation of a new tag
            const relPreds = event.target.value.split(/\s(?=(?:[^'"`]*(['"`])[^'"`]*\1)*[^'"`]*$)/);
            const newTag = relPreds.at(0)!.trim();
            const newElem: TagElement = {
                id: newTag, // this isn't properly the ID we would expect, but it should be enough to identify the tag itself
                tagName: newTag
            };

            tagListSetter((oldTags) => {
                // make sure our tag isn't already in here
                if(oldTags.findIndex(tag => (tag.id === newElem.id)) !== -1)
                    return oldTags;

                return [...oldTags, newElem];
            });
            event.target.value = relPreds.slice(1).join(" ").trim();
        }
    }

    function handleTagErase(event : KeyboardEvent<HTMLInputElement>) {
        if(event.key === 'Backspace' && !inputRef.current!.value && tagList.length > 0) {
            // for the backspace, we pop a tag and allow the user to modify the tag if there's nothing in the input
            const relElem = tagList.at(tagList.length-1)!;
            tagListSetter((oldTags) => oldTags.slice(0, tagList.length-1));
            inputRef.current!.value = relElem.tagName + " "; // we need the space if it's handled on keyup (buffered erase)
        }
    }

    return (
        <div className="flex flex-row w-full border rounded-md border-input ring-offset-background has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:disabled]:cursor-not-allowed disabled:opacity-50">
            <div className={clsx("flex h-10 flex-row min-w-1 rounded-l-md bg-background pl-3 py-2",
                        "border-r-0 rounded-r-none select-none text-sm justify-center align-middle gap-x-1.5 overflow-x-scroll")}>
                <p className="flex flex-col align-middle justify-center">Tags</p>
                { tagList.map( (tag) => {
                    return (
                        <Badge
                            key={tag.id}
                        >
                            {tag.tagName}
                        </Badge>
                    )
                }) }
            </div>

            {/* And our input which we disabled the ring for convenience... */}
            <input
                type="text"
                ref={inputRef}
                placeholder="Enter tags"
                className={clsx("flex h-10 flex-1 rounded-md bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground",
                            "border-l-0 rounded-l-none outline-none")}
                onChange={handleTagAdd}
                onKeyDown={handleTagErase}
            />
        </div>
    )
}