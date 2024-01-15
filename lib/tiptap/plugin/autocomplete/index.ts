import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';

export interface AutoCompleteOptions {
  autocompleteClass: string;
  placeholder: string;
}

export const AutoComplete = Extension.create<AutoCompleteOptions>({
  name: 'ai-autocomplete',
  addOptions() {
    return {
      placeholder: "Press ' / ' for Continue Writing",
      autocompleteClass: 'ai-autocomplete',
    };
  },
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('ai-autocomplete'),
        props: {
          decorations: ({ doc, selection }) => {
            const active = this.editor.isEditable;
            const decorations: Decoration[] = [];
            const { anchor } = selection;
            if (!active) return null;
            doc.descendants((node, pos) => {
              if (node.isTextblock && node.textContent.trim().length > 0) {
                const isEmpty = !node.isLeaf && !node.childCount;
                const hasText =
                  node.textContent.trim() !== '/' && node.textContent.trim();
                const hasSlash =
                  node.textContent.charAt(node.textContent.length - 1) === '/';
                const hasAnchor = anchor === node.nodeSize + pos - 1;
                if (!isEmpty && hasText && hasAnchor && !hasSlash) {
                  const decoration = Decoration.node(pos, pos + node.nodeSize, {
                    class: this.options.autocompleteClass,
                  });
                  decorations.push(decoration);
                }
              }
            });
            return DecorationSet.create(doc, decorations);
          },
        },
      }),
    ];
  },
});
