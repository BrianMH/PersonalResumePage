'use client'
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import {TagElement} from "@/lib/definitions";
import {usePathname, useSearchParams} from "next/navigation";

/**
 * Provides the client-sided portion of the tag-based navigation on the blog
 */

interface TagWithColor extends TagElement {
    color: {bg: string; hover: string};
}

export default function TagNavigator({ tagsWithColors } : { tagsWithColors : TagWithColor[] }) {
    const pathName = usePathname()
    const searchParams = useSearchParams();

    const updateTagQuery = (inputTag : string) => {
        const params = new URLSearchParams();
        searchParams.forEach((value, key) => params.set(key, value));
        params.set('category', inputTag);
        return `${pathName}?${params.toString()}`;
    }

    return (
        <>
            {tagsWithColors.map(curTag => {
                    return (
                        <Link
                            key={curTag.id}
                            href={updateTagQuery(curTag.tagName)}
                        >
                            <Badge
                                className={`h-10 text-[0.9rem] ${curTag.color.bg} ${curTag.color.hover}`}
                            >
                                {curTag.tagName}
                            </Badge>
                        </Link>
                    )
                })}
        </>
    )
}