import { isTextSelection } from '@tiptap/core';
import type { Editor, JSONContent } from '@tiptap/react';

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

export const getSelectedText = (editor: Editor) => {
  const { selection, doc } = editor.state;
  const { ranges } = selection;
  const from = Math.min(...ranges.map((range) => range.$from.pos));
  const to = Math.max(...ranges.map((range) => range.$to.pos));
  const selectedText = doc.textBetween(from, to);
  return selectedText;
};

export const findParagpraph = (
  indexes: number[],
  contents: JSONContent[]
): JSONContent | null => {
  if (indexes.length === 0) {
    return null;
  }
  const index = indexes[0];
  const element = contents[index];
  if (!element || typeof element !== 'object') {
    return null;
  }
  if (indexes.length === 1) {
    return element;
  }
  return findParagpraph(indexes.slice(1), element.content || []);
};

export const findNodePos = (editor: Editor, content: string) => {
  let nodePos = 0;
  let nodeSize = 0;
  editor.state.doc.descendants((node, pos) => {
    if (node.isText) {
      if (node.textContent === content) {
        nodePos = pos;
        nodeSize = node.nodeSize;
      }
    }
  });
  return { nodePos, nodeSize };
};
