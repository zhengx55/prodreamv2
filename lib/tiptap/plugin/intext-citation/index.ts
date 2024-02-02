import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import Component from './IntextWrapper';

export default Node.create({
  name: 'IntextCitation',
  inline: true,
  content: 'inline*',
  group: 'inline',
  atom: true,
  selectable: false,
  addAttributes() {
    return {
      citation_id: {
        default: '',
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'intext-citation',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['intext-citation', mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Component, { contentDOMElementTag: 'span' });
  },
});
