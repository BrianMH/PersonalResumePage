'use client';

import {useCurrentEditor} from "@tiptap/react";
import {Button} from "@/components/ui/button";
import {
    BoldIcon,
    Code2Icon,
    CodeSquareIcon,
    ItalicIcon,
    ListIcon,
    ListOrderedIcon, MessageSquareQuoteIcon, Redo2Icon, SeparatorHorizontalIcon,
    StrikethroughIcon, Undo2Icon
} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import React from "react";

/**
 * Provides most of the functionality for the post editor.
 */
export default function MenuBar() {
    const { editor } = useCurrentEditor()

    if (!editor) {
        return null
    }

    return (
        <div className="flex flex-row justify-center align-middle flex-wrap gap-x-1 gap-y-1 pb-1">
            <Button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleBold()
                        .run()
                }
                className={`bg-card text-card-foreground border-black border-[1px] hover:bg-accent hover:text-accent-foreground ${editor.isActive('bold') ? 'bg-blend-color bg-zinc-300' : ''}`}
            >
                <BoldIcon />
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleItalic()
                        .run()
                }
                className={`bg-card text-card-foreground border-black border-[1px] hover:bg-accent hover:text-accent-foreground ${editor.isActive('italic') ? 'bg-blend-color bg-zinc-300' : ''}`}
            >
                <ItalicIcon />
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleStrike()
                        .run()
                }
                className={`bg-card text-card-foreground border-black border-[1px] hover:bg-accent hover:text-accent-foreground ${editor.isActive('strike') ? 'bg-blend-color bg-zinc-300' : ''}`}
            >
                <StrikethroughIcon />
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleCode()
                        .run()
                }
                className={`bg-card text-card-foreground border-black border-[1px] hover:bg-accent hover:text-accent-foreground ${editor.isActive('code') ? 'bg-blend-color bg-zinc-300' : ''}`}
            >
                <Code2Icon />
            </Button>
            <Button
                onClick={() => editor.chain().focus().unsetAllMarks().run()}
                className="bg-card text-card-foreground border-black border-[1px] hover:bg-accent hover:text-accent-foreground"
            >
                clear marks
            </Button>
            <Button
                onClick={() => editor.chain().focus().clearNodes().run()}
                className="bg-card text-card-foreground border-black border-[1px] hover:bg-accent hover:text-accent-foreground"
            >
                clear nodes
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`bg-card text-card-foreground border-black border-[1px] hover:bg-accent hover:text-accent-foreground ${editor.isActive('heading', { level: 1 }) ? 'bg-blend-color bg-zinc-300' : ''}`}
            >
                h1
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`bg-card text-card-foreground border-black border-[1px] hover:bg-accent hover:text-accent-foreground ${editor.isActive('heading', { level: 2 }) ? 'bg-blend-color bg-zinc-300' : ''}`}
            >
                h2
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`bg-card text-card-foreground border-black border-[1px] hover:bg-accent hover:text-accent-foreground ${editor.isActive('heading', { level: 3 }) ? 'bg-blend-color bg-zinc-300' : ''}`}
            >
                h3
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                className={`bg-card text-card-foreground border-black border-[1px] hover:bg-accent hover:text-accent-foreground ${editor.isActive('heading', { level: 4 }) ? 'bg-blend-color bg-zinc-300' : ''}`}
            >
                h4
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                className={`bg-card text-card-foreground border-black border-[1px] hover:bg-accent hover:text-accent-foreground ${editor.isActive('heading', { level: 5 }) ? 'bg-blend-color bg-zinc-300' : ''}`}
            >
                h5
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                className={`bg-card text-card-foreground border-black border-[1px] hover:bg-accent hover:text-accent-foreground ${editor.isActive('heading', { level: 6 }) ? 'bg-blend-color bg-zinc-300' : ''}`}
            >
                h6
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`bg-card text-card-foreground border-black border-[1px] hover:bg-accent hover:text-accent-foreground ${editor.isActive('bulletList') ? 'bg-blend-color bg-zinc-300' : ''}`}
            >
                <ListIcon />
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`bg-card text-card-foreground border-black border-[1px] hover:bg-accent hover:text-accent-foreground ${editor.isActive('orderedList') ? 'bg-blend-color bg-zinc-300' : ''}`}
            >
                <ListOrderedIcon />
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={`bg-card text-card-foreground border-black border-[1px] hover:bg-accent hover:text-accent-foreground ${editor.isActive('codeBlock') ? 'bg-blend-color bg-zinc-300' : ''}`}
            >
                <CodeSquareIcon />
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`bg-card text-card-foreground border-black border-[1px] hover:bg-accent hover:text-accent-foreground ${editor.isActive('blockquote') ? 'bg-blend-color bg-zinc-300' : ''}`}
            >
                <MessageSquareQuoteIcon />
            </Button>
            <Button
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                className="bg-card text-card-foreground border-black border-[1px] hover:bg-accent hover:text-accent-foreground"
            >
                <SeparatorHorizontalIcon />
            </Button>
            <Button
                onClick={() => editor.chain().focus().setHardBreak().run()}
                className="bg-card text-card-foreground border-black border-[1px] hover:bg-accent hover:text-accent-foreground"
            >
                {"<br>"}
            </Button>
            <Button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .undo()
                        .run()
                }
                className="bg-card text-card-foreground border-black border-[1px] hover:bg-accent hover:text-accent-foreground"
            >
                <Undo2Icon />
            </Button>
            <Button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .redo()
                        .run()
                }
                className="bg-card text-card-foreground border-black border-[1px] hover:bg-accent hover:text-accent-foreground"
            >
                <Redo2Icon />
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleSectionBlock().run()}
                className={`bg-card text-card-foreground border-black border-[1px] hover:bg-accent hover:text-accent-foreground ${editor.isActive('sectionBlock') ? 'bg-blend-color bg-zinc-300' : ''}`}
            >
                Section
            </Button>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        className="bg-card text-card-foreground border-black border-[1px] hover:bg-accent hover:text-accent-foreground"
                    >
                        Figure
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-96">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">Figure Options</h4>
                            <p className="text-sm text-muted-foreground">
                                Specify attributes for the figure and caption.
                            </p>
                        </div>
                        <div className="grid gap-2">
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="src">Source</Label>
                                <Input
                                    id="src"
                                    defaultValue=""
                                    placeholder="Enter URL of image source"
                                    className="col-span-2 h-8"
                                />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="caption">Caption</Label>
                                <Input
                                    id="caption"
                                    defaultValue=""
                                    placeholder="Enter a caption"
                                    className="col-span-2 h-8"
                                />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="alt">Alt</Label>
                                <Input
                                    id="alt"
                                    defaultValue=""
                                    placeholder="Enter an image description"
                                    className="col-span-2 h-8"
                                />
                            </div>
                        </div>
                        <div className="flex flex-row justify-center">
                            <Button
                                className="bg-card text-card-foreground border-black border-[1px] hover:bg-accent hover:text-accent-foreground"
                                onClick={() => {
                                    // first gather our elements
                                    const imageSrc = (document.getElementById("src") as HTMLInputElement).value;
                                    const imageAlt = (document.getElementById("alt") as HTMLInputElement).value;
                                    const imageCaption = (document.getElementById("caption") as HTMLInputElement).value;

                                    // and then create the new node
                                    return editor.chain().focus().setFigure({ src : imageSrc, alt : imageAlt, caption : imageCaption }).run();
                                }}
                            >
                                Create
                            </Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}