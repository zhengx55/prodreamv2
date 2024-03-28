import { useAIEditor } from '@/zustand/store';
import { autoUpdate, flip, offset, useFloating } from '@floating-ui/react-dom';
import { isNodeSelection, posToDOMRect, type Editor } from '@tiptap/react';
import { useEffect, useRef, useState } from 'react';

const useEventListener = (editor: Editor) => {
  const { showBubbleMenu, updateShowBubbleMenu } = useAIEditor((state) => ({
    ...state,
  }));
  const [selectedLength, setSelectedLength] = useState(0);
  const menuYOffside = useRef<number | null>(null);
  const menuXOffside = useRef<number | null>(null);
  const [isWord, setIsWord] = useState(false);
  const { x, y, strategy, refs } = useFloating({
    open: showBubbleMenu,
    strategy: 'fixed',
    whileElementsMounted: autoUpdate,
    placement: 'top-start',
    middleware: [
      offset({ mainAxis: 10 }),
      flip({
        padding: 8,
        boundary: editor.options.element,
        fallbackPlacements: ['bottom-start'],
      }),
    ],
  });
  useEffect(() => {
    const MouseUphandler = () => {
      const { isFocused } = editor;
      if (!isFocused) {
        updateShowBubbleMenu(false);
        return;
      }
      const { doc, selection } = editor.state;
      const { from, empty, ranges } = selection;
      if (empty) {
        updateShowBubbleMenu(false);
        return;
      }
      const { view } = editor;
      const current_node = view.domAtPos(from || 0);
      const isTitle =
        current_node.node.nodeName === 'H1' ||
        current_node.node.parentNode?.nodeName === 'H1';
      if (isTitle) {
        updateShowBubbleMenu(false);
      } else {
        const from = Math.min(...ranges.map((range) => range.$from.pos));
        const to = Math.max(...ranges.map((range) => range.$to.pos));
        const text = doc.textBetween(from, to);
        const words = text.match(/\b\w+\b/g);
        if (words && words.length === 1) {
          setIsWord(true);
        } else {
          setIsWord(false);
        }
        setSelectedLength(words ? words.length : 0);
        refs.setReference({
          getBoundingClientRect() {
            const coordinate = posToDOMRect(view, from, to);
            menuXOffside.current = coordinate.left;
            menuYOffside.current =
              coordinate.bottom +
              (view.dom.parentElement?.parentElement?.scrollTop ?? 0);
            return coordinate;
          },
        });
        updateShowBubbleMenu(true);
      }
    };

    const NodeSelectHandler = () => {
      const { view } = editor;
      const { selection, doc } = editor.state;
      const { empty, ranges } = selection;
      if (empty) {
        updateShowBubbleMenu(false);
        return;
      }
      if (isNodeSelection(selection)) {
        const from = Math.min(...ranges.map((range) => range.$from.pos));
        const to = Math.max(...ranges.map((range) => range.$to.pos));
        const text = doc.textBetween(from, to);
        const words = text.match(/\b\w+\b/g);
        if (words && words.length === 1) {
          setIsWord(true);
        } else {
          setIsWord(false);
        }
        setSelectedLength(words ? words.length : 0);
        refs.setReference({
          getBoundingClientRect() {
            const node = view.nodeDOM(from) as HTMLElement;
            if (node) {
              const nodeRect = node.getBoundingClientRect();
              menuXOffside.current = nodeRect.left;
              menuYOffside.current =
                nodeRect.bottom +
                (view.dom.parentElement?.parentElement?.scrollTop ?? 0);
              return nodeRect;
            }
            const coordinate = posToDOMRect(view, from, to);
            menuXOffside.current = coordinate.left;
            menuYOffside.current =
              coordinate.bottom +
              (view.dom.parentElement?.parentElement?.scrollTop ?? 0);
            return coordinate;
          },
        });
        updateShowBubbleMenu(true);
      }
    };
    editor.on('selectionUpdate', NodeSelectHandler);
    document.addEventListener('mouseup', MouseUphandler);
    return () => {
      editor.off('selectionUpdate', NodeSelectHandler);
      document.removeEventListener('mouseup', MouseUphandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, refs]);
  return {
    refs,
    x,
    y,
    strategy,
    isWord,
    selectedLength,
    menuXOffside,
    menuYOffside,
  };
};
export default useEventListener;
