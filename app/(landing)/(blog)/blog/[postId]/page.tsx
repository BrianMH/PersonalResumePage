/**
 * SHows us a given blog post assuming a specific blog post id
 */
import {fetchPostById} from "@/lib/data";
import {adjustImageSourcePath} from "@/lib/helper";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import "@/app/(landing)/(blog)/blog/[postId]/posts.css";
import Image from "next/image";

export default async function BlogPostPage({ params } : { params : { postId : string } }) {
    // fetch our given main post
    const relPost = await fetchPostById(params.postId);

    if(!relPost)
        throw new Error("No post exists with the given id.");

    // Before we post the image, we would like to make sure our image is properly targeting the right path
    relPost.content = await adjustImageSourcePath(relPost.content, params.postId);

    return (
        <main className="flex-1 flex mb-6 p-6 min-w-screen flex-row align-middle justify-center">
            <div className="bg-card w-full lg:max-w-[1000px]">
                {/*Our post header (along with title)*/}
                <div className="flex flex-col align-middle justify-center px-10 pt-10">
                    <p className="text-sm font-light">Posted: {relPost.postDate}</p>

                    <Image
                        src={process.env.AWS_CLOUDFRONT_SERVE_ORIGIN + "/dynamic/" + relPost.id + "/" + relPost.headerImage}
                        alt="Header of the current post"
                        width={0}
                        height={0}
                        sizes='100vw'
                        className="rounded-lg"
                        style={{width: '100%', height: '100%'}}
                    />

                    <p className="font-semibold text-3xl pt-6 text-center">
                        {relPost.postTitle}
                    </p>
                </div>

                {/*Our post content*/}
                <article className="flex flex-col align-middle justify-center gap-4 p-6" dangerouslySetInnerHTML={{__html: relPost.content}}></article>

                {/*And finally our post tags!*/}
                <div className="flex flex-row align-middle justify-center">
                    <Separator className="y-4 px-3 w-[80%]" />
                </div>
                <div className="flex flex-row py-3 gap-1 align-middle flex-wrap justify-center">
                    <p className="text-sm px-1.5 flex flex-col align-middle justify-center">
                        Post Tags:
                    </p>
                    {relPost.postTags.map(curTag => {

                        return (
                            <Badge
                                key={curTag.id}
                                className={`${curTag.color}`}
                            >
                                {curTag.tagName}
                            </Badge>
                        )
                    })}
                </div>
            </div>
        </main>
    )
}