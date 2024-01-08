import { Mark, mergeAttributes } from '@tiptap/core';

export interface PolishUnderlineOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    polishUnderline: {
      /**
       * Set an underline mark
       */
      setPolishUnderline: () => ReturnType;

      /**
       * Unset an underline mark
       */
      unsetPolishUnderline: () => ReturnType;
    };
  }
}

export const PolishUnderline = Mark.create<PolishUnderlineOptions>({
  name: 'polish-underline',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span',
      },
      {
        style: 'text-decoration',
        consuming: false,
        getAttrs: (style) =>
          (style as string).includes('underline') ? {} : false,
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'u',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      setPolishUnderline:
        () =>
        ({ commands }) => {
          return commands.setMark(this.name);
        },
      unsetPolishUnderline:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },
});
