import { isTextSelection } from '@tiptap/core';
import type { Editor } from '@tiptap/react';

export const isTextSelected = ({ editor }: { editor: Editor }) => {
  const {
    state: {
      doc,
      selection,
      selection: { empty, from, to },
    },
  } = editor;

  const isEmptyTextBlock =
    !doc.textBetween(from, to).length && isTextSelection(selection);
  if (empty || isEmptyTextBlock || !editor.isEditable) {
    return false;
  }

  return true;
};

export const findFirstParagraph = (editor: Editor) => {
  let first_paragraph = {
    hasContent: false,
    pos: 0,
    content: '',
    size: 0,
  };
  editor.state.doc.descendants((node, pos) => {
    if (
      node.type.name === 'paragraph' &&
      node.textContent.trim() !== '' &&
      first_paragraph.hasContent === false
    ) {
      first_paragraph = {
        pos,
        hasContent: true,
        content: node.textContent,
        size: node.nodeSize,
      };
    }
  });
  return first_paragraph;
};
