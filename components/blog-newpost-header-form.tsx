'use client';
import Image from "next/image";
import {Input} from "@/components/ui/input";

/**
 * Provides the ability to adjust the header for the new post.
 */

export default function PostHeaderForm({ postId } : { postId: string }) {

    return (
        <div className="flex flex-col align-middle justify-center px-10 pt-10">
            <p className="text-sm font-light">Posted: TBD</p>

            <Image
                src={process.env.AWS_CLOUDFRONT_SERVE_ORIGIN + "/static/blog_template/" + "header.png"}
                alt="Header of the current post"
                width={0}
                height={0}
                sizes='100vw'
                className="rounded-lg"
                style={{width: '100%', height: '100%'}}
            />

            {/*We allow users to modify this directly to adjust the title*/}
            <Input
                id={postId}
                className="font-semibold text-3xl text-center mt-3"
                aria-placeholder="Post Title"
                placeholder="Enter A Post Title"
                contentEditable={true}>
            </Input>
        </div>
    )
}