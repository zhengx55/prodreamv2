import { Toolbar } from '@/components/editor/ui/Toolbar';
import { autoUpdate, flip, offset, useFloating } from '@floating-ui/react-dom';
import * as Popover from '@radix-ui/react-popover';
import { Editor, isNodeSelection, posToDOMRect } from '@tiptap/react';
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
import { memo, useLayoutEffect, useRef, useState } from 'react';

import {
  BookHalf,
  Copilot,
  Redo,
  Synonym,
  Undo,
} from '@/components/root/SvgComponents';
import useAIEditor, { useUserTask } from '@/zustand/store';
import { ContentTypePicker } from '../picker/content';
import { useTextmenuCommands } from './hooks/useTextMenuCommand';
import { useTextmenuContentTypes } from './hooks/useTextmenuContentType';
import { useTextmenuStates } from './hooks/useTextmenuStates';

const MemoButton = memo(Toolbar.Button);
const MemoContentTypePicker = memo(ContentTypePicker);

export type TextMenuProps = {
  editor: Editor;
};

const BubbleMenu = ({ editor }: TextMenuProps) => {
  const menuYOffside = useRef<number | null>(null);
  const menuXOffside = useRef<number | null>(null);
  const [selectedLength, setSelectedLength] = useState(0);
  const [isWord, setIsWord] = useState(false);
  const states = useTextmenuStates(editor);
  const blockOptions = useTextmenuContentTypes(editor);
  const commands = useTextmenuCommands(editor);
  const {
    updateCopilotMenu,
    updateFloatingMenuPos,
    updateCitationMenu,
    updateSynonymMenu,
    showBubbleMenu,
    updateShowBubbleMenu,
  } = useAIEditor((state) => ({ ...state }));
  const task_step = useUserTask((state) => state.task_step);
  const updateTaskStep = useUserTask((state) => state.updateTaskStep);
  const prevSelection = useRef<{ from: number; to: number } | null>(null);

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

  useLayoutEffect(() => {
    const MouseUphandler = () => {
      const { doc, selection } = editor.state;
      const { from, empty, ranges, to } = selection;
      if (
        prevSelection.current &&
        prevSelection.current.from === from &&
        prevSelection.current.to === to
      ) {
        return;
      }
      if (empty) {
        prevSelection.current = null;
        updateShowBubbleMenu(false);
        return;
      }
      const { view } = editor;
      const current_node = view.domAtPos(from || 0);
      const isTitle =
        current_node.node.nodeName === 'H1' ||
        current_node.node.parentNode?.nodeName === 'H1';
      if (isTitle) {
        prevSelection.current = null;
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
        prevSelection.current = { from, to };
      }
    };

    const NodeSelectHandler = () => {
      const { view } = editor;
      const { selection, doc } = editor.state;
      const { empty, ranges } = selection;
      if (empty) {
        prevSelection.current = null;
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
        prevSelection.current = { from, to };
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

  if (!showBubbleMenu) return null;
  return (
    <div
      ref={refs.setFloating}
      style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
      className='z-[99]'
    >
      <Toolbar.Wrapper className='border-shadow-borde relative border shadow-lg'>
        <MemoButton
          id='copilot-button'
          onMouseDown={(e) => e.preventDefault()}
          onClick={async (e) => {
            task_step === 0 && updateTaskStep(-1);
            updateCopilotMenu(true);
            updateFloatingMenuPos({
              top: menuYOffside.current ?? 0,
              left: menuXOffside.current ?? 0,
            });
            updateShowBubbleMenu(false);
          }}
          className='text-doc-primary'
        >
          {task_step === 0 && (
            <span className='absolute h-7 w-7 animate-ping rounded-full bg-doc-primary/50' />
          )}
          <Copilot />
          AI Copilot
        </MemoButton>
        <Toolbar.Divider />
        {isWord ? (
          <MemoButton
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              updateSynonymMenu(true);
              updateFloatingMenuPos({
                top: menuYOffside.current ?? 0,
                left: menuXOffside.current ?? 0,
              });
              updateShowBubbleMenu(false);
            }}
            className='text-doc-primary'
          >
            <Synonym />
            Synonym
          </MemoButton>
        ) : (
          <MemoButton
            onMouseDown={(e) => e.preventDefault()}
            onClick={async () => {
              if (selectedLength >= 160) {
                const toast = (await import('sonner')).toast;
                toast.warning('Citation is limited to 160 words');
                return;
              }
              updateCitationMenu(true);
              updateFloatingMenuPos({
                top: menuYOffside.current ?? 0,
                left: menuXOffside.current ?? 0,
              });
              updateShowBubbleMenu(false);
            }}
            className='text-doc-primary'
          >
            <BookHalf size={'18'} />
            Citation
          </MemoButton>
        )}
        <Toolbar.Divider />
        <MemoContentTypePicker options={blockOptions} />
        <MemoButton
          tooltip='Undo'
          tooltipShortcut={['Mod', 'Z']}
          onClick={commands.onUndo}
        >
          <Undo />
        </MemoButton>
        <MemoButton
          tooltip='Redo'
          tooltipShortcut={['Mod', 'Y']}
          onClick={commands.onRedo}
        >
          <Redo />
        </MemoButton>
        <Toolbar.Divider />
        <MemoButton
          tooltip='Bold'
          tooltipShortcut={['Mod', 'B']}
          onClick={commands.onBold}
          active={states.isBold}
        >
          <Bold size={16} />
        </MemoButton>
        <MemoButton
          tooltip='Italic'
          tooltipShortcut={['Mod', 'I']}
          onClick={commands.onItalic}
          active={states.isItalic}
        >
          <Italic size={16} />
        </MemoButton>
        <MemoButton
          tooltip='Underline'
          tooltipShortcut={['Mod', 'U']}
          onClick={commands.onUnderline}
          active={states.isUnderline}
        >
          <Underline size={16} />
        </MemoButton>
        <MemoButton
          tooltip='Strikehrough'
          tooltipShortcut={['Mod', 'X']}
          onClick={commands.onStrike}
          active={states.isStrike}
        >
          <Strikethrough size={16} />
        </MemoButton>
        <Popover.Root>
          <Popover.Trigger asChild>
            <MemoButton tooltip='More options'>
              <MoreVertical size={16} />
            </MemoButton>
          </Popover.Trigger>
          <Popover.Content side='top' asChild>
            <Toolbar.Wrapper>
              <MemoButton
                tooltip='Align left'
                tooltipShortcut={['Shift', 'Mod', 'L']}
                onClick={commands.onAlignLeft}
                active={states.isAlignLeft}
              >
                <AlignLeft size={16} />
              </MemoButton>
              <MemoButton
                tooltip='Align center'
                tooltipShortcut={['Shift', 'Mod', 'E']}
                onClick={commands.onAlignCenter}
                active={states.isAlignCenter}
              >
                <AlignCenter size={16} />
              </MemoButton>
              <MemoButton
                tooltip='Align right'
                tooltipShortcut={['Shift', 'Mod', 'R']}
                onClick={commands.onAlignRight}
                active={states.isAlignRight}
              >
                <AlignRight size={16} />
              </MemoButton>
              <MemoButton
                tooltip='Justify'
                tooltipShortcut={['Shift', 'Mod', 'J']}
                onClick={commands.onAlignJustify}
                active={states.isAlignJustify}
              >
                <AlignJustify size={16} />
              </MemoButton>
            </Toolbar.Wrapper>
          </Popover.Content>
        </Popover.Root>
        <span className='flex h-full items-center px-2'>
          <p className='small-regular text-shadow'>
            {selectedLength}
            &nbsp;Words
          </p>
        </span>
      </Toolbar.Wrapper>
    </div>
  );
};

export default memo(BubbleMenu);
