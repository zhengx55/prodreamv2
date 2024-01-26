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
        .setPolishUnderline()
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
    editor
      .chain()
      .selectAll()
      .unsetHighlight()
      .unsetPolishUnderline()
      .setTextSelection(0)
      .run();
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

  const insertCitation = useCallback(
    (content: string) => {
      if (!editor) return null;
      const { selection } = editor!.state;
      const { anchor } = selection;

      editor
        ?.chain()
        .insertContentAt(anchor, `(${content})`)
        .setTextSelection({
          from: anchor,
          to: anchor + (content.length + 2),
        })
        .setColor('#8652DB')
        .setTextSelection(0)
        .run();
    },
    [editor]
  );

  const grammarCheckReplace = useCallback(
    (content: string, from: number, to: number) => {
      editor
        .chain()
        .setTextSelection({ from, to })
        .unsetHighlight()
        .unsetPolishUnderline()
        .run();
      editor
        .chain()
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
    insertCitation,
    insertNext,
    replaceText,
    highLightAtPosition,
    clearAllHightLight,
    clearAllUnderLine,
    grammarCheckReplace,
    insertAtPostion,
  };
};
