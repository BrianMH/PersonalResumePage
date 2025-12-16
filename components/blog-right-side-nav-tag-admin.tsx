'use client'
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import {TagElement} from "@/lib/definitions";
import {usePathname, useSearchParams} from "next/navigation";
import {XIcon} from "lucide-react";
import LoadingButton from "@/components/extended_ui/loading-button";
import {deleteTagById} from "@/lib/clientDatabaseOps";
import {useToast} from "@/components/ui/use-toast";

/**
 * Provides the client-sided portion of the tag-based navigation on the blog
 */

interface TagWithColor extends TagElement {
    color: {bg: string; hover: string};
}

export default function TagAdminNavigator({ tagsWithColors } : { tagsWithColors : TagWithColor[] }) {
    const pathName = usePathname()
    const searchParams = useSearchParams();
    const { toast } = useToast();

    // like with the non-admin version, this is still used to adjust the search params
    const updateTagQuery = (inputTag : string) => {
        const params = new URLSearchParams();
        searchParams.forEach((value, key) => params.set(key, value));
        params.set('category', inputTag);
        return `${pathName}?${params.toString()}`;
    }

    // however, for the admin version we provide a client-side callback to the front-end that allows for removal of a
    // tag by its id
    async function tagDeletionAction(tagId: string) {
        // first attempt deletion
        const deletionResponse = await deleteTagById(tagId);

        // and serve a toast indicating whether the operation succeeded or not
        toast({
            variant: deletionResponse.success ? "default" : "destructive",
            title: deletionResponse.success ? "Tag Deleted" : "Deletion Failed",
            description: `${deletionResponse.message}`,
            duration: 2000,
        })

        // TODO: This was also returned due to most recent patch change. Investigate whether this disrupts the chain
        //       somehow (it shouldn't. seems like it only determined whether the return would be processed or not)
        // return deletionResponse.success;

        return
    }

    return (
        <>
            {tagsWithColors.map(curTag => {
                return (
                        <Badge
                            key={curTag.id}
                            className={`h-10 text-[0.9rem] ${curTag.color.bg} ${curTag.color.hover}`}
                        >
                            <form
                                className="flex flex-col justify-center"
                                action={tagDeletionAction.bind(null, curTag.id)}
                            >
                                <LoadingButton
                                    variant="outline"
                                    type="submit"
                                    loadingMessage=""
                                    forceChildren={true}
                                    hideLoader={true}
                                    className="border-none bg-inherit hover:bg-inherit text-white -mx-2 -ml-4"
                                >
                                    <XIcon className="h-8" />
                                </LoadingButton>
                            </form>
                            <Link
                                href={updateTagQuery(curTag.tagName)}
                                className="flex flex-col justify-center h-full"
                            >
                                {curTag.tagName}
                            </Link>
                        </Badge>
                )
            })}
        </>
    )
}