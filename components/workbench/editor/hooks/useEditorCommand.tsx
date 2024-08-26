import type { Editor } from '@tiptap/react';
import { useCallback } from 'react';

export const useEditorCommand = (editor: Editor) => {
  const setSelection = useCallback(
    (from: number, to: number) => {
      editor.chain().focus().setTextSelection({ from, to }).run();
    },
    [editor]
  );

  const replaceSelection = useCallback(
    (from: number, to: number, value: string) => {
      editor
        ?.chain()
        .focus()
        .setTextSelection({ from, to })
        .insertContent(value)
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

  const deleteRange = useCallback(
    (from: number, to: number) => {
      editor.chain().focus().deleteRange({ from, to }).run();
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
        .unsetHighlight()
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
    insertNext,
    replaceText,
    grammarCheckReplace,
    setSelection,
    replaceSelection,
    clearAllHightLight,
  };
};
