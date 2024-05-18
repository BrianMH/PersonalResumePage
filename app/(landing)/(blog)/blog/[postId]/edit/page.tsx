import {fetchPostById} from "@/lib/data";
import {notFound} from "next/navigation";
import {adjustImageSourcePath} from "@/lib/helper";
import NewPostEditor from "@/components/blog-newpost-editor";

/**
 * The edit page for the post. Unlike the post page itself, this can't be entirely rendered on the server-side.
 */

export default async function BlogPostEditPage({ params } : { params : { postId : string } }) {
    // fetch our given main post
    const relPost = await fetchPostById(params.postId);

    if(!relPost)
        return notFound();

    // Before we post the image, we would like to make sure our image is properly targeting the right path
    relPost.content = await adjustImageSourcePath(relPost.content, params.postId);

    return (
        <main className="flex-1 flex mb-6 p-6 min-w-screen flex-row align-middle justify-center">
            <div className="bg-card w-full lg:max-w-[1000px]">
                <NewPostEditor
                    defaultImagePath={process.env.AWS_CLOUDFRONT_SERVE_ORIGIN + "/dynamic/" + relPost.id + "/" + relPost.headerFilename}
                    initialContent={relPost.content}
                    initialTags={relPost.postTags}
                    initialTitle={relPost.title}
                    postId={relPost.id}
                />
            </div>
        </main>
    )
}