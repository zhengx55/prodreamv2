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
              const isEmpty = !node.isLeaf && !node.childCount;
              const hasText =
                node.textContent.length !== 0 &&
                node.textContent.trim() !== '/' &&
                node.textContent.trim();
              const hasAnchor = anchor === node.nodeSize + pos - 1;
              let classes;
              if (!isEmpty && hasText && hasAnchor)
                classes = [this.options.autocompleteClass];
              const decoration = Decoration.node(pos, pos + node.nodeSize, {
                class: classes?.join(''),
              });
              decorations.push(decoration);
            });
            return DecorationSet.create(doc, decorations);
          },
        },
      }),
    ];
  },
});
