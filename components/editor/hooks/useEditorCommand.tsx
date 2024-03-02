import { findFirstParagraph } from '@/lib/tiptap/utils';
import type { Editor, FocusPosition } from '@tiptap/react';
import { useCallback } from 'react';

export const useEditorCommand = (editor: Editor) => {
  const deleteRange = useCallback(
    (from: number, to: number) => {
      editor.chain().focus().deleteRange({ from, to }).run();
    },
    [editor]
  );
  const highLightAtPosition = useCallback(
    (from: number, to: number) => {
      if (!editor) return;
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
    },
    [editor]
  );

  const clearAllHightLight = useCallback(() => {
    if (!editor) return;
    editor
      .chain()
      .selectAll()
      .unsetHighlight()
      .unsetGrammarUnderline()
      .setTextSelection(0)
      .run();
  }, [editor]);

  const insertGenerated = useCallback(
    (pos: number, value: string, focus: FocusPosition) => {
      editor
        .chain()
        .focus(focus)
        .insertContentAt(pos, value, {
          updateSelection: true,
        })
        .run();
    },
    [editor]
  );

  const insertAtPostion = useCallback(
    (from: number, to: number, value: string) => {
      if (!editor) return;
      if (from === to) {
        editor
          .chain()
          .focus()
          .insertContentAt(from, value, {
            parseOptions: { preserveWhitespace: 'full' },
            updateSelection: true,
          })
          .setTextSelection({ from, to: from + value.length })
          .run();
      } else {
        editor
          .chain()
          .focus()
          .deleteRange({ from, to })
          .insertContentAt(from, value, {
            parseOptions: { preserveWhitespace: 'full' },
            updateSelection: true,
          })
          .setTextSelection({ from, to: from + value.length })
          .run();
      }
    },
    [editor]
  );

  const replaceText = useCallback(
    (from: number, to: number, value: string) => {
      if (!editor) return;
      editor
        .chain()
        .focus()
        .deleteRange({ from, to })
        .insertContentAt(from, value, {
          parseOptions: { preserveWhitespace: 'full' },
          updateSelection: true,
        })
        .setTextSelection({ from, to: value.length + from })
        .run();
    },
    [editor]
  );

  const insertNext = useCallback(
    (to: number, value: string) => {
      if (!editor) return;
      editor
        .chain()
        .focus()
        .insertContentAt(to, ` ${value}`, {
          parseOptions: { preserveWhitespace: 'full' },
          updateSelection: true,
        })
        .setTextSelection({
          from: to,
          to: `${value}`.length + to,
        })

        .run();
    },
    [editor]
  );

  const insertCitation = useCallback(
    (citation_id: string) => {
      if (!editor) return null;
      const { selection } = editor!.state;
      const { anchor, from, to } = selection;
      const { pos, size } = findFirstParagraph(editor);
      if (anchor === 1) {
        editor
          .chain()
          .focus()
          .insertContentAt(pos + size - 1, {
            type: 'IntextCitation',
            attrs: {
              citation_id,
            },
          })
          .run();
      } else if (from === to) {
        editor
          ?.chain()
          .focus()
          .insertContentAt(anchor, {
            type: 'IntextCitation',
            attrs: {
              citation_id,
            },
          })
          .run();
      } else {
        editor
          ?.chain()
          .focus()
          .insertContentAt(to, {
            type: 'IntextCitation',
            attrs: {
              citation_id,
            },
          })

          .run();
      }
    },
    [editor]
  );

  const grammarCheckReplace = useCallback(
    (content: string, from: number, to: number) => {
      editor
        .chain()
        .focus()
        .deleteRange({
          from,
          to,
        })
        .insertContentAt(from, `${content}`, {
          parseOptions: { preserveWhitespace: 'full' },
        })
        .run();
    },
    [editor]
  );

  return {
    deleteRange,
    insertGenerated,
    insertCitation,
    insertNext,
    replaceText,
    highLightAtPosition,
    clearAllHightLight,
    grammarCheckReplace,
    insertAtPostion,
  };
};
