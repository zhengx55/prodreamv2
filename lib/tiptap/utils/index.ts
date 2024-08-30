import { createRegex } from '@/lib/utils';
import { IGrammarResult } from '@/query/type';
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

export const findTitle = (editor: Editor) => {
  let title = {
    pos: 0,
    content: '',
    size: 0,
  };
  editor.state.doc.descendants((node, pos) => {
    if (node.type.name === 'title') {
      title = {
        pos,
        content: node.textContent,
        size: node.nodeSize,
      };
    }
  });
  return title;
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

export const findLastParagraph = (editor: Editor) => {
  let last_paragraph = {
    pos: 0,
    content: '',
    size: 0,
  };
  editor.state.doc.descendants((node, pos) => {
    if (node.type.name === 'paragraph' && node.textContent.trim() !== '') {
      last_paragraph = {
        pos,
        content: node.textContent,
        size: node.nodeSize,
      };
    }
  });
  return last_paragraph;
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

export function findTextInDoc(text: string, editor: Editor) {
  let from = 0,
    to = 0;
  editor?.state.doc.descendants((node, pos) => {
    if (node.type.name === 'paragraph' && node.textContent?.includes(text)) {
      const postion = node.textContent.indexOf(text);
      from = postion + pos + 1;
      to = from + text.length;
    }
  });
  return { from, to };
}

export function highLightGrammar(
  editor: Editor,
  current_suggestion: IGrammarResult,
  index: number
) {
  if (!editor) return;
  const blocks = editor.getJSON().content?.slice(1) ?? [];
  const found = findParagpraph(current_suggestion.index, blocks)?.text ?? '';
  if (!found) return;
  const { nodePos } = findNodePos(editor, found);
  const original_sentence =
    current_suggestion.diff.at(index)?.data.reduce((acc, current) => {
      if (current.status !== 1) {
        return acc + current.sub_str;
      } else {
        return acc + '';
      }
    }, '') ?? '';
  const sentence_position = found.indexOf(original_sentence.trimEnd());
  if (sentence_position === undefined) return;
  current_suggestion.diff.at(index)?.data.forEach((sentence) => {
    if (sentence.status === 3 || sentence.status === 2) {
      const substring_regex = createRegex(sentence.sub_str.trim());
      const modification_postion = original_sentence.search(substring_regex);
      const from = modification_postion + nodePos + sentence_position;
      const to =
        modification_postion +
        nodePos +
        sentence_position +
        sentence.sub_str.length -
        1;
      editor
        .chain()
        .setTextSelection({
          from,
          to,
        })
        .setHighlight({ color: 'rgba(236, 120, 113, 0.2)' })
        .setGrammarUnderline()
        .setTextSelection(0)
        .run();
    }
  });
}
