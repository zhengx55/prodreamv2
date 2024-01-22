import { Mark, mergeAttributes } from '@tiptap/react';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    citation: {
      /**
       * Set a citation
       */
      setCitation: (citation: string) => ReturnType;
      /**
       * Toggle a citation
       */
      toggleCitation: () => ReturnType;
      /**
       * Unset a citation
       */
      unsetCitation: () => ReturnType;
    };
  }
}

export const Citation = Mark.create<{
  HTMLAttributes: Record<string, any>;
}>({
  name: 'citation',
  priority: 1000,
  keepOnSplit: true,
  addAttributes() {
    return {
      id: { default: null },
      class: { default: this.options.HTMLAttributes.class },
    };
  },
  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },
//   addCommands() {},
});
