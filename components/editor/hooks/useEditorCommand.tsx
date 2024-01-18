import { Editor } from '@tiptap/react';
import { useCallback } from 'react';

export const useEditorCommand = (editor: Editor) => {
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
        .setTextSelection(0)
        .run();
    },
    [editor]
  );

  const clearAllUnderLine = useCallback(() => {
    if (!editor) return;
    editor.chain().selectAll().unsetPolishUnderline().setTextSelection(0).run();
  }, [editor]);

  const clearAllHightLight = useCallback(() => {
    if (!editor) return;
    editor.chain().selectAll().unsetHighlight().setTextSelection(0).run();
  }, [editor]);

  const insertAtPostion = useCallback(
    (from: number, to: number, value: string) => {
      if (!editor) return;
      if (from === to) {
        editor
          .chain()
          .insertContentAt(from, value, {
            parseOptions: { preserveWhitespace: 'full' },
          })
          .setTextSelection({ from, to: from + value.length })
          .run();
      } else {
        editor
          .chain()
          .deleteRange({ from, to })
          .insertContentAt(from, value, {
            parseOptions: { preserveWhitespace: 'full' },
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
        .deleteRange({ from, to })
        .insertContentAt(from, value, {
          parseOptions: { preserveWhitespace: 'full' },
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
        .blur()
        .insertContentAt(to, ` ${value}`, {
          parseOptions: { preserveWhitespace: 'full' },
        })
        .setTextSelection({
          from: to,
          to: ` ${value}`.length + to,
        })
        .run();
    },
    [editor]
  );

  return {
    insertNext,
    replaceText,
    highLightAtPosition,
    clearAllHightLight,
    clearAllUnderLine,
    insertAtPostion,
  };
};
