import {Node as TipTapNode} from "@tiptap/core";
import {mergeAttributes} from "@tiptap/core";

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        sectionBlock: {
            /**
             * Set a blockquote node
             */
            setSectionBlock: () => ReturnType,
            /**
             * Toggle a blockquote node
             */
            toggleSectionBlock: () => ReturnType,
            /**
             * Unset a blockquote node
             */
            unsetSectionBlock: () => ReturnType,
        }
    }
}

export const SectionBlock = TipTapNode.create({
    name: "sectionBlock",
    group: "block",
    content: "block+",
    defining: true,

    parseHTML() {
        return [{
            tag: "section"
        }];
    },

    renderHTML({ HTMLAttributes }) {
        return ["section", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
    },

    addCommands() {
        return {
            setSectionBlock: () => ({ commands }) => {
                return commands.wrapIn(this.name)
            },
            toggleSectionBlock: () => ({ commands }) => {
                return commands.toggleWrap(this.name)
            },
            unsetSectionBlock: () => ({ commands }) => {
                return commands.lift(this.name)
            },
        }
    },
});