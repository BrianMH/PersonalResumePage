/**
 * Provides the editor the ability to upload an image and embed it into the document. This communicates with the front-end
 * upload API, which then proceeds to upload an image to the backend and returns the expected path for the given image
 * object from the CDN.
 *
 * Taken and adjusted from https://tiptap.dev/docs/editor/experiments/figure.
 */
import {
    findChildrenInRange, JSONContent,
    mergeAttributes,
    Node,
    Tracker,
} from '@tiptap/core'
import {customNodeInputRule} from "@/components/extensions/figure-overwritten-input-rule";

export interface FigureOptions {
    HTMLAttributes: Record<string, any>,
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        figure: {
            /**
             * Add a figure element
             */
            setFigure: (options: {
                src: string,
                alt?: string,
                caption?: string,
                width?: string,
                height?: string,
            }) => ReturnType,

            /**
             * Converts an image to a figure
             */
            imageToFigure: () => ReturnType,

            /**
             * Converts a figure to an image
             */
            figureToImage: () => ReturnType,
        }
    }
}

// matches Markdown like syntax ![image alt](path/to/image (=[WIDTH]x[HEIGHT])?"){caption that can have spaces}
export const inputRegex = /!\[(.+|:?)]\((\S+)(?:(?:\s+)=(\d*)x(\d*))?\){(.+)}/

export const Figure = Node.create<FigureOptions>({
    name: 'figure',

    addOptions() {
        return {
            HTMLAttributes: {},
        }
    },

    group: 'block',

    content: 'block+',

    draggable: true,

    isolating: true,

    addAttributes() {
        return {
            src: {
                default: null,
                parseHTML: element => element.querySelector('img')?.getAttribute('src'),
            },
            alt: {
                default: null,
                parseHTML: element => element.querySelector('img')?.getAttribute('alt'),
            },
            height: {
                default: 'auto',
                // TODO: this might bug out on parsing proper sizes due to lack of units on img
                parseHTML: element => element.querySelector('img')?.style?.height,
                renderHTML: attributes => {
                    return {
                        style: `height: ${attributes.height}`
                    }
                }
            },
            width: {
                default: 'auto',
                // TODO: this might bug out on parsing proper sizes due to lack of units on img
                parseHTML: element => element.querySelector('img')?.style?.width,
                renderHTML: attributes => {
                    return {
                        style: `width: ${attributes.width}`,
                    }
                }
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'figure',
                contentElement: 'figcaption',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return [
            'figure', this.options.HTMLAttributes,
            ['img', mergeAttributes(HTMLAttributes, { draggable: false, contenteditable: false })],
            ['figcaption', { class: "caption-block" }, 0],
        ]
    },

    addCommands() {
        return {
            setFigure: ({ caption, ...attrs }) => ({ chain }) => {
                return chain()
                    .insertContent({
                        type: this.name,
                        attrs,
                        content: [
                            {
                                type: 'paragraph',
                                content: [
                                    {
                                        type: 'text',
                                        text: "Figure X"
                                    }
                                ]
                            },
                            {
                                type: 'paragraph',
                                content: [
                                    {
                                        type: 'text',
                                        text: caption,
                                    }
                                ]
                            }
                        ]
                    })
                    // set cursor at end of caption field
                    .command(({ tr, commands }) => {
                        const { doc, selection } = tr
                        const position = doc.resolve(selection.to - 2).end()

                        return commands.setTextSelection(position)
                    })
                    .run()
            },

            figureToImage: () => ({ tr, commands }) => {
                const { doc, selection } = tr
                const { from, to } = selection
                const figures = findChildrenInRange(doc, { from, to }, node => node.type.name === this.name)

                if (!figures.length) {
                    return false
                }

                const tracker = new Tracker(tr)

                return commands.forEach(figures, ({ node, pos }) => {
                    const mapResult = tracker.map(pos)

                    if (mapResult.deleted) {
                        return false
                    }

                    const range = {
                        from: mapResult.position,
                        to: mapResult.position + node.nodeSize,
                    }

                    return commands.insertContentAt(range, {
                        type: 'image',
                        attrs: {
                            src: node.attrs.src,
                            alt: node.attrs.alt,
                        },
                    })
                })
            },
        }
    },

    addInputRules() {
        return [
            customNodeInputRule({
                find: inputRegex,
                type: this.type,
                getAttributes: match => {
                    const [, alt, src, width, height, caption] = match

                    return { src: src, alt: alt, width: width ? `${width}px` : 'auto', height: height ? `${height}px` : 'auto'}
                },
            }),
        ]
    },
})