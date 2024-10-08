import Icon from '@/components/root/Icon';
import { useTextmenuCommands } from '@/components/workbench/editor/hooks/useTextMenuCommand';
import {
  autoUpdate,
  detectOverflow,
  flip,
  MiddlewareReturn,
  MiddlewareState,
  offset,
  useFloating,
} from '@floating-ui/react-dom';
import { type Editor, isNodeSelection, posToDOMRect } from '@tiptap/react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

import ContentTypePicker from '@/components/workbench/editor/ContentPicker';
import { useTextmenuContentTypes } from '@/components/workbench/editor/hooks/useTextmenuContentType';
import { useTextmenuStates } from '@/components/workbench/editor/hooks/useTextmenuStates';
import { useEditor } from '@/zustand/store';
import { EditorView } from '@tiptap/pm/view';
import { motion } from 'framer-motion';
import FontsizePicker from './FontsizePicker';
import { Toolbar } from './Toolbar';
type Props = { editor: Editor };

const EditorBubbleMenu = ({ editor }: Props) => {
  const [open, setOpen] = useState(false);
  const setCopilotPos = useEditor((state) => state.setCopilotPos);
  const setShowCopilot = useEditor((state) => state.setShowCopilot);
  const transEditor = useTranslations('Editor');
  const commands = useTextmenuCommands(editor);
  const states = useTextmenuStates(editor);
  const blockOptions = useTextmenuContentTypes(editor);
  const detectOverflowMiddleware = {
    name: 'detectOverflowMiddleware',
    async fn(state: MiddlewareState): Promise<MiddlewareReturn> {
      const overflow = await detectOverflow(state);
      return {
        data: {
          shouldHide: overflow.top > -150,
        },
      };
    },
  };
  const { x, y, strategy, refs, middlewareData } = useFloating({
    open: open,
    strategy: 'fixed',
    whileElementsMounted: autoUpdate,
    placement: 'top-start',
    middleware: [
      offset({ mainAxis: 10 }),
      flip({
        boundary: editor.options.element,
        fallbackStrategy: 'initialPlacement',
        fallbackPlacements: ['bottom-start', 'bottom-end', 'top-end'],
      }),
      detectOverflowMiddleware,
    ],
  });
  const menuYOffside = useRef<number | null>(null);
  const menuXOffside = useRef<number | null>(null);

  const handleSelectionUpdate = () => {
    const { selection, doc } = editor.state;
    const { view, isFocused } = editor;
    const { empty, ranges } = selection;
    if (empty || !isFocused) {
      setOpen(false);
      return;
    }
    const from = Math.min(...ranges.map((range) => range.$from.pos));
    const to = Math.max(...ranges.map((range) => range.$to.pos));
    const text = doc.textBetween(from, to);
    const isTitleSelection = isTitleSelected(view, from);
    if (isTitleSelection || !text.trim()) {
      setOpen(false);
      return;
    }

    refs.setReference({
      getBoundingClientRect() {
        const coordinate = posToDOMRect(view, from, to);
        updateMenuPosition(coordinate, view);
        return coordinate;
      },
    });

    setOpen(true);
  };

  const isTitleSelected = (view: EditorView, from: number) => {
    const current_node = view.domAtPos(from || 0);
    return (
      current_node.node.nodeName === 'H1' ||
      current_node.node.parentNode?.nodeName === 'H1'
    );
  };

  const updateMenuPosition = (coordinate: DOMRect, view: EditorView) => {
    menuXOffside.current = coordinate.left;
    menuYOffside.current =
      coordinate.bottom +
      (view.dom.parentElement?.parentElement?.scrollTop ?? 0);
  };

  const handleNodeSelection = () => {
    const { selection, doc } = editor.state;
    const { view } = editor;
    if (isNodeSelection(selection)) {
      const from = Math.min(
        ...selection.ranges.map((range) => range.$from.pos)
      );
      const to = Math.max(...selection.ranges.map((range) => range.$to.pos));
      refs.setReference({
        getBoundingClientRect() {
          const node = view.nodeDOM(from) as HTMLElement;
          if (node) {
            const nodeRect = node.getBoundingClientRect();
            menuYOffside.current =
              nodeRect.bottom +
              (view.dom.parentElement?.parentElement?.scrollTop ?? 0);
            return nodeRect;
          }
          const coordinate = posToDOMRect(view, from, to);
          updateMenuPosition(coordinate, view);
          return coordinate;
        },
      });
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  useEffect(() => {
    editor.on('selectionUpdate', handleNodeSelection);
    document.addEventListener('mouseup', handleSelectionUpdate);

    return () => {
      editor.off('selectionUpdate', handleNodeSelection);
      document.removeEventListener('mouseup', handleSelectionUpdate);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, editor.view, refs]);

  if (!open) return null;
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      ref={refs.setFloating}
      style={{
        position: strategy,
        top: y ?? 0,
        left: x ?? 0,
        visibility: middlewareData.detectOverflowMiddleware?.shouldHide
          ? 'hidden'
          : 'visible',
      }}
    >
      <Toolbar.Wrapper className='h-10 rounded-lg border border-gray-200 shadow'>
        <Toolbar.Button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            setCopilotPos({
              top: menuYOffside.current ?? 0,
              left: menuXOffside.current ?? 0,
            });
            setShowCopilot(true);
            setOpen(false);
          }}
        >
          <Icon
            alt=''
            src='/editor/copilot.svg'
            width={18}
            height={18}
            className='size-4'
            priority
          />
          <span className='text-indigo-500'>AI Copilot</span>
        </Toolbar.Button>
        <Toolbar.Divider />
        <ContentTypePicker preventDefault options={blockOptions} />
        <FontsizePicker
          onChange={commands.onSetFontSize}
          value={states.currentSize}
        />

        <Toolbar.Divider />
        <Toolbar.Button
          onMouseDown={(e) => e.preventDefault()}
          tooltip={transEditor('BubbleMenu.Bold')}
          tooltipShortcut={['Mod', 'B']}
          onClick={commands.onBold}
          active={states.isBold}
        >
          <Icon
            alt='bold'
            src='/editor/bold.svg'
            width={20}
            height={20}
            priority
            className='size-4'
          />
        </Toolbar.Button>
        <Toolbar.Button
          onMouseDown={(e) => e.preventDefault()}
          tooltip={transEditor('BubbleMenu.Italic')}
          tooltipShortcut={['Mod', 'I']}
          onClick={commands.onItalic}
          active={states.isItalic}
        >
          <Icon
            alt='italic'
            src='/editor/italic.svg'
            width={20}
            height={20}
            priority
            className='size-4'
          />
        </Toolbar.Button>
        <Toolbar.Button
          onMouseDown={(e) => e.preventDefault()}
          tooltip={transEditor('BubbleMenu.Underline')}
          tooltipShortcut={['Mod', 'U']}
          onClick={commands.onUnderline}
          active={states.isUnderline}
        >
          <Icon
            alt='underline'
            src='/editor/underline.svg'
            width={20}
            height={20}
            priority
            className='size-4'
          />
        </Toolbar.Button>
        <Toolbar.Button
          onMouseDown={(e) => e.preventDefault()}
          tooltip={transEditor('BubbleMenu.Strikethrough')}
          tooltipShortcut={['Mod', 'X']}
          onClick={commands.onStrike}
          active={states.isStrike}
        >
          <Icon
            alt='strike'
            src='/editor/strike.svg'
            width={20}
            height={20}
            priority
            className='size-4'
          />
        </Toolbar.Button>
      </Toolbar.Wrapper>
    </motion.div>
  );
};

export default EditorBubbleMenu;
