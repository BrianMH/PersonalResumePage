'use client';
/**
 * The editor to be used in order to create new blog posts. This has to be client-sided as it would be rendering values
 * on the client's end instead of parsing them server-side.
 */
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import {EditorProvider} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from "@/components/extensions/editor-menu-bar";
import { SectionBlock } from "@/components/extensions/editor-section-extension";
import { Figure } from "@/components/extensions/editor-image-extension";
import "@/app/(landing)/(blog)/blog/posts.css";
import PostHeaderForm from "@/components/blog-newpost-header-form";
import {Separator} from "@/components/ui/separator";
import {useRef, useState} from "react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import BlogTagSelector from "@/components/blog-editor-tag-selector";
import {TagElement} from "@/lib/definitions";
import {BlogStatus, submitBlogPost} from "@/lib/clientDatabaseOps";
import {useToast} from "@/components/ui/use-toast";
import {ToastAction} from "@/components/ui/toast";

/**
 * The extensions used by the relevant editor. This can technically be moved to another file, but since the editor won't
 * be used in other pages, it makes sense to keep it here for now.
 */
const extensions = [
    Color.configure({types: [TextStyle.name, ListItem.name]}),
    TextStyle,
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
    }),
    SectionBlock,
    Figure,
]

export default function BlogPostEditor({ defaultImagePath, initialContent, postId } :
        { defaultImagePath : string, initialContent : string, postId? : string }) {
    // toaster
    const { toast } = useToast();

    // Here we define some of the references we will need to collect all inputs following the completion of the new post
    // "form"
    const imageInputRef = useRef<HTMLImageElement>(null);
    const titleInputRef = useRef<HTMLInputElement>(null);

    // use to store the HTML value of the editor
    const editorHTMLCode = useRef(initialContent);

    // and this will allow us to store our tags
    const [relTags, setRelTags] = useState([] as TagElement[])

    // and finally our dispatch function with properly bound values
    const initialState : BlogStatus = {message: null}
    const [currentState, setFormState] = useState(initialState);
    async function newPostDispatch(postId : string | undefined, formData: FormData) {
        // we either update or create a new post depending on the bound value passed
        if(postId === undefined) {
            const nextState = await submitBlogPost(titleInputRef.current!.value, editorHTMLCode.current, imageInputRef.current!.src, relTags);
            setFormState(nextState);
            if(!nextState.errors) {
                // allow user redirection if desired
                toast({
                    variant: "default",
                    title: (postId !== undefined) ? "Post Updated" : "Post Created",
                    description: (postId !== undefined) ? "Post has been updated successfully." : "Post has been created successfully",
                    action: (
                        <Link
                            href={nextState.message!}
                        >
                            <ToastAction
                                altText={"Go to post"}
                            >
                                Go to Post
                            </ToastAction>
                        </Link>
                    )
                });
            }
        } else {
            console.log("Not Implemented.")
        }
    }

    // and then customize our dispatch depending on the update type
    const dispatch = newPostDispatch.bind(null, postId)

    return (
        <form
            className="flex flex-col align-middle justify-center gap-4 p-6"
            action={dispatch}
        >
            {/*Provides the form to adjust the main header image and post title*/}
            <PostHeaderForm
                blogState={currentState}
                titleRef={titleInputRef}
                imageRef={imageInputRef}
                defaultImagePath={defaultImagePath}
            />

            {/*Horizontal break to mark start of editor*/}
            <Separator className="-mt-2"/>

            <article className="flex flex-col align-middle justify-center gap-4">
                <EditorProvider
                    slotBefore={<MenuBar/>}
                    slotAfter={
                        <>
                            <div className="text-center text-sm">
                                {
                                    currentState.errors ?
                                        (<p className="text-red-500 pt-3">{currentState.message}</p>) :
                                        (<></>)
                                }
                            </div>
                            <div className="grid grid-cols-2 w-full gap-x-3 px-20 justify-items-center">
                                <Link
                                    href={"/blog"}
                                    className="max-w-52 w-full"
                                >
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        className="w-full"
                                    >
                                        Cancel
                                    </Button>
                                </Link>
                                <Button
                                    type="submit"
                                    variant="outline"
                                    className="w-full max-w-52"
                                >
                                    Create Post
                                </Button>
                            </div>
                        </>
                    }
                    extensions={extensions}
                    content={editorHTMLCode.current}
                    onCreate={({editor}) => {
                        editorHTMLCode.current = editor.getHTML(); // this will eat up all the extra whitespace from the sample
                    }}
                    onUpdate={({editor}) => {
                        editorHTMLCode.current = editor.getHTML();
                    }}
                >
                    {/* For the tag selector to propagate information upward, we need to allow it to control the parent's state */}
                    <BlogTagSelector
                        tagList={relTags}
                        tagListSetter={setRelTags}
                    />
                    <div className="flex flex-row justify-center align-middle" id="tagError" aria-live="polite"
                         aria-atomic="true">
                        {currentState.errors?.postTags && currentState.errors.postTags.map((error: string) => (
                            <p className="text-sm text-red-500 py-1" key={error}>{error}</p>
                        ))}
                    </div>
                </EditorProvider>
            </article>
        </form>
    )
}