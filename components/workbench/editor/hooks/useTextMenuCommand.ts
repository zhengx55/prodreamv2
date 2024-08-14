import { Editor } from '@tiptap/react';
import { useCallback } from 'react';

export const useTextmenuCommands = (editor: Editor) => {
  const onRedo = useCallback(
    () => editor.chain().focus().redo().run(),
    [editor]
  );
  const onUndo = useCallback(() => {
    editor.chain().focus().undo().run();
  }, [editor]);
  const onBold = useCallback(
    () => editor.chain().focus().toggleBold().run(),
    [editor]
  );
  const onItalic = useCallback(
    () => editor.chain().focus().toggleItalic().run(),
    [editor]
  );
  const onStrike = useCallback(
    () => editor.chain().focus().toggleStrike().run(),
    [editor]
  );
  const onUnderline = useCallback(
    () => editor.chain().focus().toggleUnderline().run(),
    [editor]
  );

  const onAlignLeft = useCallback(
    () => editor.chain().focus().setTextAlign('left').run(),
    [editor]
  );
  const onAlignCenter = useCallback(
    () => editor.chain().focus().setTextAlign('center').run(),
    [editor]
  );
  const onAlignRight = useCallback(
    () => editor.chain().focus().setTextAlign('right').run(),
    [editor]
  );
  const onAlignJustify = useCallback(
    () => editor.chain().focus().setTextAlign('justify').run(),
    [editor]
  );

  const onSetFontSize = useCallback(
    (fontSize: string) => {
      if (!fontSize || fontSize.length === 0) {
        return editor.chain().focus().unsetFontSize().run();
      }
      return editor.chain().focus().setFontSize(fontSize).run();
    },
    [editor]
  );

  return {
    onBold,
    onItalic,
    onStrike,
    onUnderline,
    onAlignLeft,
    onAlignCenter,
    onAlignRight,
    onAlignJustify,
    onRedo,
    onUndo,
    onSetFontSize,
  };
};
