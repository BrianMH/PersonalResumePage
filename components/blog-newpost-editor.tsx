'use client';
/**
 * The editor to be used in order to create new blog posts. This has to be client-sided as it would be rendering values
 * on the client's end instead of parsing them server-side.
 */
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from "@/components/extensions/editor-menu-bar";
import { SectionBlock } from "@/components/extensions/editor-section-extension";
import { Figure } from "@/components/extensions/editor-image-extension";
import "@/app/(landing)/(blog)/blog/posts.css";
import PostHeaderForm from "@/components/blog-newpost-header-form";
import {Separator} from "@/components/ui/separator";

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

const initialContent = `
    <section>
        <h3>Section 1</h3>
        <p>Content goes in here. Lorem ipsum dolor sit amet...</p>
    </section>
`

export default function NewPostEditor() {
    const postTitleString = "postTitle"

    return (
        <article
            className="flex flex-col align-middle justify-center gap-4 p-6"
        >
            {/*Provides the form to adjust the main header image and post title*/}
            <PostHeaderForm
                postId={postTitleString}
            />

            {/*Horizontal break to mark start of editor*/}
            <Separator className="bg-black" />

            <EditorProvider
                slotBefore={<MenuBar />}
                extensions={extensions}
                content={initialContent}
            >
                <>
                </>
            </EditorProvider>
        </article>
    )
}