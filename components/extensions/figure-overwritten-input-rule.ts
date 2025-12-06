/**
 * Default input rule makes an assumption about matching such that it only removes the first element of the match, so we
 * need to reconfigure the input rule functor factory so that it instead deletes the entire match instead of only the
 * first given match from our regex.
 *
 * We then use it to construct the same type of figure construct by default as the attributes themselves are only
 * related to the image itself, and not the caption (which has to use two columns, by design). It's a bit hacky but it
 * does seem to work properly.
 */
import { NodeType } from '@tiptap/pm/model'

import { InputRule, InputRuleFinder } from "@tiptap/core";
import { ExtendedRegExpMatchArray } from "@tiptap/core";
import { callOrReturn } from "@tiptap/core";
import { Node } from "@tiptap/pm/model"

/**
 * Build an input rule that adds a node when the
 * matched text is typed into it.
 */
export function customNodeInputRule(config: {
    /**
     * The regex to match.
     */
    find: InputRuleFinder

    /**
     * The node type to add.
     */
    type: NodeType

    /**
     * A function that returns the attributes for the node
     * can also be an object of attributes
     */
    getAttributes?:
        | Record<string, any>
        | ((match: ExtendedRegExpMatchArray) => Record<string, any>)
        | false
        | null
}) {
    return new InputRule({
        find: config.find,
        handler: ({ state, range, match }) => {
            const attributes = callOrReturn(config.getAttributes, undefined, match) || {}
            const { tr } = state
            const start = range.from
            let end = range.to

            const newNode = config.type.create(attributes)
            if (match[0]) {
                tr.insert(start - 1, config.type.create(attributes, [
                    Node.fromJSON(state.schema, {
                        type: 'paragraph',
                        content: [
                            {
                                type: 'text',
                                text: 'Figure X',
                            }
                        ]
                    }),
                    Node.fromJSON(state.schema, {
                        type: 'paragraph',
                        content: [
                            {
                                type: 'text',
                                text: match[match.length-1] || "Example Text",
                            }
                        ]
                    })
                ])).delete(
                    tr.mapping.map(start),
                    tr.mapping.map(end),
                )
            }

            tr.scrollIntoView()
        },
    })
}
