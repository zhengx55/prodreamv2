import { Extension } from '@tiptap/core';

export type PolishUnderlineOptions = {
  types: string[];
};

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    polish_underline: {
      /**
       * Set text polish_underline
       */
      setPolishUnderline: () => ReturnType;
      /**
       * Unset text polish_underline
       */
      unsetPolishUnderline: () => ReturnType;
    };
  }
}

export const PolishUnderline = Extension.create<PolishUnderlineOptions>({
  name: 'polish_underline',

  addOptions() {
    return {
      types: ['textStyle'],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          polish_underline: {
            default: {
              color: null,
              offset: null,
            },
            parseHTML: (element) => ({
              color: element.style.textDecorationColor,
              offset: element.style.textDecorationThickness,
            }),
            renderHTML: (attributes) => {
              if (
                !attributes.polish_underline ||
                (!attributes.polish_underline.color &&
                  !attributes.polish_underline.offset)
              ) {
                return {};
              }

              const style = [];
              style.push(`text-decoration: underline`);
              style.push(`text-underline-offset: 5px`);

              if (attributes.polish_underline.color) {
                style.push(
                  `text-decoration-color: ${attributes.polish_underline.color}`
                );
              }

              if (attributes.polish_underline.offset) {
                style.push(
                  `text-decoration-thickness: ${attributes.polish_underline.offset}`
                );
              }

              return {
                style: style.join('; '),
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setPolishUnderline:
        () =>
        ({ chain }) => {
          const markAttributes = {
            polish_underline: {
              color: 'red',
              offset: '2px',
            },
          };

          return chain().setMark('textStyle', markAttributes).run();
        },
      unsetPolishUnderline:
        () =>
        ({ chain }) => {
          return chain()
            .setMark('textStyle', { polish_underline: null })
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
});
