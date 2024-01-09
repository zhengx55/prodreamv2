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

  return {
    highLightAtPosition,
    clearAllHightLight,
    clearAllUnderLine,
  };
};
