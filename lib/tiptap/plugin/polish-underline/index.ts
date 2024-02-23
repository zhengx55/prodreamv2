import '@tiptap/extension-text-style';
import { Mark, mergeAttributes } from '@tiptap/react';

export type UnderLineOptions = {
  HTMLAttributes: Record<string, any>;
};

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    GrammarUnderline: {
      setGrammarUnderline: () => ReturnType;
      unsetGrammarUnderline: () => ReturnType;
    };
  }
}

export const GrammarUnderline = Mark.create<UnderLineOptions>({
  name: 'GrammarUnderline',

  addOptions() {
    return {
      HTMLAttributes: {
        class: 'underline-offset-4 underline decoration-red-400 decoration-2',
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      setGrammarUnderline:
        () =>
        ({ commands }) => {
          return commands.setMark(this.name);
        },
      unsetGrammarUnderline:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },
});
