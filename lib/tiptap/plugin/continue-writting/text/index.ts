import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import ContinueResult from './ContinueResult';

export default Node.create({
  name: 'ContinueResult',
  inline: true,
  content: 'inline*',
  group: 'inline',
  atom: true,
  selectable: false,

  parseHTML() {
    return [
      {
        tag: 'continue-result',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['continue-result', mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ContinueResult, {
      contentDOMElementTag: 'span',
    });
  },
});
