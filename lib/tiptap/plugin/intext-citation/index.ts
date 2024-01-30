import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import Component from './IntextWrapper';

export default Node.create({
  name: 'IntextCitation',
  inline: true,
  content: 'inline*',
  group: 'inline',
  atom: true,
  addAttributes() {
    return {
      citation_id: {
        default: '',
      },
      author: {
        default: '',
      },
      publish_year: {
        default: '',
      },
      article_title: {
        default: '',
      },
      abstract: {
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
