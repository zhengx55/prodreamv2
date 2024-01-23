import { MenuProps } from '@/lib/tiptap/type';
import { BubbleMenu } from '@tiptap/react';
import { memo, useCallback } from 'react';

const CitationViewMenu = memo(({ editor, appendTo }: MenuProps) => {
  const shouldShow = useCallback(() => {
    const isActive = editor.isActive('link');
    return isActive;
  }, [editor]);
  return (
    <BubbleMenu
      editor={editor}
      pluginKey='textMenu'
      shouldShow={shouldShow}
      updateDelay={0}
      tippyOptions={{
        popperOptions: {
          modifiers: [{ name: 'flip', enabled: false }],
        },
        appendTo: () => {
          return appendTo?.current;
        },
        onHidden: () => {},
      }}
    >
      <p></p>
    </BubbleMenu>
  );
});
CitationViewMenu.displayName = 'CitationViewMenu';
