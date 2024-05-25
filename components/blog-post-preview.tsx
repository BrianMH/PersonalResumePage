/**
 * Provides a brief view into a particular blog post given a blog id. This is all wrapped around a suspense element as well
 * to make sure it is properly streamed to the user.
 */
import {fetchPostPreviewById} from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import {auth} from "@/auth";
import LoadingButton from "@/components/extended_ui/loading-button";
import {MinusCircleIcon} from "lucide-react";
import {Role} from "@/lib/definitions";
import {deletePostById, deleteTagById} from "@/lib/clientDatabaseOps";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {Button} from "@/components/ui/button";
import UserFormattedTime from "@/components/ui/user-time";

export default async function BlogPostCard( { blogId } : { blogId : string }) {
    // get our session to allow for post deletion as well
    const sess = await auth();

    // get our post via the post ID
    const postContent = await fetchPostPreviewById(blogId);

    // make sure blog post exists
    if(!postContent)
        throw new Error("Post not found!");

    // and create our deletion functor
    async function postDeleteAction(postId: string) {
        'use server';

        // first attempt deletion
        const deletionResponse = await deletePostById(postId);

        return deletionResponse.success;
    }
    const dispatch = postDeleteAction.bind(null, blogId);

    return (
        <div className="flex-1 relative">
            {
                (sess && sess.user.role === Role.ADMIN) &&
                <div
                    className="absolute -left-3 -top-3 z-20"
                >
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="outline"
                                type="button"
                                className="bg-inherit border-none rounded-[100%] w-10 h-10 p-0 bg-opacity-90 bg-red-500 hover:bg-red-700"
                            >
                                <MinusCircleIcon className="h-5 text-white hover:text-gray-300"/>
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete Post?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This will permanently delete the given post. Any associated tags will not be deleted and must
                                    be managed manually separately.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <form
                                    action={dispatch}
                                >
                                    <LoadingButton
                                        variant="destructive"
                                        loadingMessage=""
                                        forceChildren={true}
                                        type="submit"
                                    >
                                        Delete
                                    </LoadingButton>
                                </form>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            }

            <Link
                href={`/blog/${blogId}`}
                className="relative bg-card flex flex-col min-w-[400px] text-center rounded-2xl"
            >
                {/*We have the image previews*/}
                <div className="relative h-64 rounded-t-2xl overflow-hidden">
                    <Image
                        src={process.env.AWS_CLOUDFRONT_SERVE_ORIGIN + "/dynamic/" + postContent.id + "/" + postContent.headerFilename}
                        alt={`A header image for a post with the title: ${postContent.title}`}
                        fill={true}
                        className="flex flex-col align-middle justify-center"
                        style={{objectFit: "cover"}}
                    />
                </div>

                {/*And then we have our post title*/}
                <div className="min-h-32 flex flex-col align-middle justify-center">
                    <div className="flex-1 flex flex-col align-middle justify-center">
                        <p className="font-bold text-2xl">
                            {postContent.title}
                        </p>
                    </div>
                    <div className="flex flex-row align-middle justify-center">
                        <p className="font-light text-sm pb-1">
                            {"Posted: "} <UserFormattedTime setTime={postContent.created} />
                        </p>
                    </div>
                </div>

                {/*TODO: And then (maybe) we have our tags if it isn't too cluttered*/}
                <div>

                </div>
            </Link>
        </div>
    )
}