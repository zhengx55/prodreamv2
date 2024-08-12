import Icon from '@/components/root/Icon';
import { useTextmenuCommands } from '@/components/workbench/editor/hooks/useTextMenuCommand';
import { autoUpdate, flip, offset, useFloating } from '@floating-ui/react-dom';
import * as Popover from '@radix-ui/react-popover';
import { type Editor, isNodeSelection, posToDOMRect } from '@tiptap/react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

import ContentTypePicker from '@/components/workbench/editor/ContentPicker';
import { useTextmenuContentTypes } from '@/components/workbench/editor/hooks/useTextmenuContentType';
import { useTextmenuStates } from '@/components/workbench/editor/hooks/useTextmenuStates';
import { EditorView } from '@tiptap/pm/view';
import { motion } from 'framer-motion';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  MoreVertical,
  Strikethrough,
  Underline,
} from 'lucide-react';
import { Toolbar } from './Toolbar';
type Props = { editor: Editor };

const EditorBubbleMenu = ({ editor }: Props) => {
  const [open, setOpen] = useState(false);
  const transEditor = useTranslations('Editor');
  const commands = useTextmenuCommands(editor);
  const states = useTextmenuStates(editor);
  const blockOptions = useTextmenuContentTypes(editor);
  const { x, y, strategy, refs } = useFloating({
    open: open,
    strategy: 'absolute',
    whileElementsMounted: autoUpdate,
    placement: 'top-start',
    middleware: [
      offset({ mainAxis: 10 }),
      flip({
        padding: 8,
        boundary: editor.options.element,
        fallbackStrategy: 'bestFit',
        fallbackPlacements: ['bottom-start', 'bottom-end'],
      }),
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
      style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
      className='z-0'
    >
      <Toolbar.Wrapper className='rounded-lg border border-gray-200 shadow'>
        <Toolbar.Button>
          <Icon
            alt=''
            src='/editor/stars.svg'
            width={18}
            height={18}
            className='size-[18px]'
          />
          <span className='text-indigo-500'>AI Copilot</span>
        </Toolbar.Button>
        <Toolbar.Divider />
        <ContentTypePicker options={blockOptions} />
        <Toolbar.Button
          onMouseDown={(e) => e.preventDefault()}
          tooltip={transEditor('BubbleMenu.Undo')}
          tooltipShortcut={['Mod', 'Z']}
          onClick={commands.onUndo}
        >
          <Icon
            alt=''
            src='/editor/undo.svg'
            width={18}
            height={18}
            className='size-[18px]'
          />
        </Toolbar.Button>
        <Toolbar.Button
          onMouseDown={(e) => e.preventDefault()}
          tooltip={transEditor('BubbleMenu.Redo')}
          tooltipShortcut={['Mod', 'Y']}
          onClick={commands.onRedo}
        >
          <Icon
            alt=''
            src='/editor/redo.svg'
            width={18}
            height={18}
            className='size-[18px]'
          />
        </Toolbar.Button>
        <Toolbar.Divider />
        <Toolbar.Button
          onMouseDown={(e) => e.preventDefault()}
          tooltip={transEditor('BubbleMenu.Bold')}
          tooltipShortcut={['Mod', 'B']}
          onClick={commands.onBold}
          active={states.isBold}
        >
          <Bold size={16} />
        </Toolbar.Button>
        <Toolbar.Button
          onMouseDown={(e) => e.preventDefault()}
          tooltip={transEditor('BubbleMenu.Italic')}
          tooltipShortcut={['Mod', 'I']}
          onClick={commands.onItalic}
          active={states.isItalic}
        >
          <Italic size={16} />
        </Toolbar.Button>
        <Toolbar.Button
          onMouseDown={(e) => e.preventDefault()}
          tooltip={transEditor('BubbleMenu.Underline')}
          tooltipShortcut={['Mod', 'U']}
          onClick={commands.onUnderline}
          active={states.isUnderline}
        >
          <Underline size={16} />
        </Toolbar.Button>
        <Toolbar.Button
          onMouseDown={(e) => e.preventDefault()}
          tooltip={transEditor('BubbleMenu.Strikethrough')}
          tooltipShortcut={['Mod', 'X']}
          onClick={commands.onStrike}
          active={states.isStrike}
        >
          <Strikethrough size={16} />
        </Toolbar.Button>
        <Popover.Root>
          <Popover.Trigger asChild>
            <Toolbar.Button
              onMouseDown={(e) => e.preventDefault()}
              tooltip={transEditor('BubbleMenu.More_options')}
            >
              <MoreVertical size={16} />
            </Toolbar.Button>
          </Popover.Trigger>
          <Popover.Content
            onPointerDown={(e) => e.preventDefault()}
            side='top'
            asChild
            className='size-max p-1'
          >
            <Toolbar.Wrapper>
              <Toolbar.Button
                tooltip={transEditor('BubbleMenu.Align_Left')}
                tooltipShortcut={['Shift', 'Mod', 'L']}
                onClick={commands.onAlignLeft}
                active={states.isAlignLeft}
              >
                <AlignLeft size={16} />
              </Toolbar.Button>
              <Toolbar.Button
                tooltip={transEditor('BubbleMenu.Align_Center')}
                tooltipShortcut={['Shift', 'Mod', 'E']}
                onClick={commands.onAlignCenter}
                active={states.isAlignCenter}
              >
                <AlignCenter size={16} />
              </Toolbar.Button>
              <Toolbar.Button
                tooltip={transEditor('BubbleMenu.Align_Right')}
                tooltipShortcut={['Shift', 'Mod', 'R']}
                onClick={commands.onAlignRight}
                active={states.isAlignRight}
              >
                <AlignRight size={16} />
              </Toolbar.Button>
              <Toolbar.Button
                tooltip={transEditor('BubbleMenu.Justify')}
                tooltipShortcut={['Shift', 'Mod', 'J']}
                onClick={commands.onAlignJustify}
                active={states.isAlignJustify}
              >
                <AlignJustify size={16} />
              </Toolbar.Button>
            </Toolbar.Wrapper>
          </Popover.Content>
        </Popover.Root>
      </Toolbar.Wrapper>
    </motion.div>
  );
};

export default EditorBubbleMenu;
