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
    (
      citation_id: string,
      author: string,
      publish_year: string,
      article_title: string,
      abstract: string
    ) => {
      if (!editor) return null;
      const { selection } = editor!.state;
      const { anchor, from, to } = selection;
      if (from === to) {
        editor
          ?.chain()
          .insertContentAt(anchor, {
            type: 'IntextCitation',
            attrs: {
              citation_id,
              author,
              publish_year,
              article_title,
              abstract,
            },
          })
          .run();
      } else {
        editor
          ?.chain()
          .insertContentAt(to, {
            type: 'IntextCitation',
            attrs: {
              citation_id,
              author,
              publish_year,
              article_title,
              abstract,
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
