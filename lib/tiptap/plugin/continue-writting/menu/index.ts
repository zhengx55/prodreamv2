import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import ContinueMenu from './ContinueMenu';

export default Node.create({
  name: 'ContinueWrittingMenu',
  inline: true,
  content: 'inline*',
  group: 'inline',
  atom: true,
  selectable: false,
  addAttributes() {
    return {};
  },
  parseHTML() {
    return [
      {
        tag: 'continue-writting-menu',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['continue-writting-menug', mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ContinueMenu, { contentDOMElementTag: 'div' });
  },
});
