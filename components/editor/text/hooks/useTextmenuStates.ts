import { ShouldShowProps } from '@/lib/tiptap/type';
import { isTextSelected } from '@/lib/tiptap/utils';
import { Editor, posToDOMRect } from '@tiptap/react';
import { useCallback } from 'react';

export const useTextmenuStates = (editor: Editor) => {
  const shouldShow = useCallback(
    ({ view }: ShouldShowProps) => {
      if (!view) {
        return false;
      }
      const { from, to } = editor.state.selection;
      console.log(posToDOMRect(view, from, to));
      return isTextSelected({ editor }) && !view.dragging?.move;
    },
    [editor]
  );

  return {
    isBold: editor.isActive('bold'),
    isItalic: editor.isActive('italic'),
    isStrike: editor.isActive('strike'),
    isUnderline: editor.isActive('underline'),
    isAlignLeft: editor.isActive({ textAlign: 'left' }),
    isAlignCenter: editor.isActive({ textAlign: 'center' }),
    isAlignRight: editor.isActive({ textAlign: 'right' }),
    isAlignJustify: editor.isActive({ textAlign: 'justify' }),
    currentFont: editor.getAttributes('textStyle')?.fontFamily || undefined,
    currentSize: editor.getAttributes('textStyle')?.fontSize || undefined,
    shouldShow,
  };
};
