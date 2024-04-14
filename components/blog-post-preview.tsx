/**
 * Provides a brief view into a particular blog post given a blog id. This is all wrapped around a suspense element as well
 * to make sure it is properly streamed to the user.
 */
import {fetchPostPreviewById} from "@/lib/data";
import Link from "next/link";
import Image from "next/image";

export default async function BlogPostCard( { blogId } : { blogId : string }) {
    // get our post via the post ID
    const postContent = await fetchPostPreviewById(blogId);

    // make sure blog post exists
    if(!postContent)
        throw new Error("Post not found!");

    return (
        <Link
            href={`/blog/${blogId}`}
            className="bg-card flex flex-col min-w-[400px] text-center rounded-2xl"
        >
            {/*We have the image previews*/}
            <div className="relative h-64 rounded-t-2xl overflow-hidden">
                <Image
                    src={process.env.AWS_CLOUDFRONT_SERVE_ORIGIN + "/dynamic/" + postContent.id + "/" + postContent.headerImage}
                    alt={`A header image for a post with the title: ${postContent.postTitle}`}
                    fill={true}
                    className="flex flex-col align-middle justify-center"
                    style={{objectFit:"cover"}}
                />
            </div>

            {/*And then we have our post title*/}
            <div className="min-h-32 flex flex-col align-middle justify-center">
                <div className="flex-1 flex flex-col align-middle justify-center">
                    <p className="font-bold text-2xl">
                        {postContent.postTitle}
                    </p>
                </div>
                <div className="flex flex-row align-middle justify-center">
                    <p className="font-light text-sm pb-1">
                        {`Posted: ${postContent.postDate}`}
                    </p>
                </div>
            </div>

            {/*And then we have our tags*/}
            <div>

            </div>
        </Link>
    )
}