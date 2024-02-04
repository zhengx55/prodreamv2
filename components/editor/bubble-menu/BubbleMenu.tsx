import { Toolbar } from '@/components/editor/Toolbar';
import { autoUpdate, flip, offset, useFloating } from '@floating-ui/react-dom';
import * as Popover from '@radix-ui/react-popover';
import { Editor, isNodeSelection, posToDOMRect } from '@tiptap/react';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  CornerDownLeft,
  CornerDownRight,
  Italic,
  MoreVertical,
  Strikethrough,
  Underline,
} from 'lucide-react';
import { memo, useLayoutEffect, useRef, useState } from 'react';

import { BookHalf, Copilot, Synonym } from '@/components/root/SvgComponents';
import useAiEditor, { useUserTask } from '@/zustand/store';
import { ContentTypePicker } from '../picker/content';
import { useTextmenuCommands } from './hooks/useTextMenuCommand';
import { useTextmenuContentTypes } from './hooks/useTextmenuContentType';
import { useTextmenuStates } from './hooks/useTextmenuStates';

const MemoButton = memo(Toolbar.Button);
const MemoContentTypePicker = memo(ContentTypePicker);

export type TextMenuProps = {
  editor: Editor;
};

export const BubbleMenu = memo(({ editor }: TextMenuProps) => {
  const [open, setOpen] = useState(false);
  const menuYOffside = useRef<number | null>(null);
  const menuXOffside = useRef<number | null>(null);
  const [selectedLength, setSelectedLength] = useState(0);
  const [isWord, setIsWord] = useState(false);
  const states = useTextmenuStates(editor);
  const blockOptions = useTextmenuContentTypes(editor);
  const commands = useTextmenuCommands(editor);
  const updateCopilotMenu = useAiEditor((state) => state.updateCopilotMenu);
  const updateCopilotRect = useAiEditor((state) => state.updateCopilotRect);
  const updateCitationMenu = useAiEditor((state) => state.updateCitationMenu);
  const updateSynonymMenu = useAiEditor((state) => state.updateSynonymMenu);
  const updateSelectedText = useAiEditor((state) => state.updateSelectedText);
  const updateCopilotRectX = useAiEditor((state) => state.updateCopilotRectX);
  const task_step = useUserTask((state) => state.task_step);
  const updateTaskStep = useUserTask((state) => state.updateTaskStep);

  const { x, y, strategy, refs } = useFloating({
    open: open,
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
    const handler = () => {
      const { from, empty } = editor.state.selection;
      const { view } = editor;
      const current_node = view.domAtPos(from || 0);
      const isTitle =
        current_node.node.nodeName === 'H1' ||
        current_node.node.parentNode?.nodeName === 'H1';
      if (isTitle) {
        setOpen(false);
        return;
      }
      if (empty) {
        setOpen(false);
      } else {
        const { doc, selection } = editor.state;
        const { ranges } = selection;
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
        updateSelectedText(text);
        refs.setReference({
          getBoundingClientRect() {
            if (isNodeSelection(editor.state.selection)) {
              const node = editor.view.nodeDOM(from) as HTMLElement;
              if (node) {
                menuXOffside.current = node.getBoundingClientRect().left;
                const el_srcoll_top =
                  editor.view.dom.parentElement?.parentElement?.scrollTop;
                menuYOffside.current =
                  node.getBoundingClientRect().bottom + (el_srcoll_top ?? 0);
                return node.getBoundingClientRect();
              }
            }
            menuXOffside.current = posToDOMRect(editor.view, from, to).left;
            const el_srcoll_top =
              editor.view.dom.parentElement?.parentElement?.scrollTop;
            menuYOffside.current =
              posToDOMRect(editor.view, from, to).bottom + (el_srcoll_top ?? 0);
            return posToDOMRect(editor.view, from, to);
          },
        });
        setOpen(true);
      }
    };
    editor.on('selectionUpdate', handler);
    return () => {
      editor.off('selectionUpdate', handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, refs]);

  if (!open) return null;
  return (
    <div
      ref={refs.setFloating}
      style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
      className='z-[9999]'
    >
      <Toolbar.Wrapper className='border-shadow-borde relative border shadow-lg'>
        <MemoButton
          id='copilot-button'
          onClick={() => {
            updateCopilotMenu(true);
            updateCopilotRect(menuYOffside.current);
            setOpen(false);
            updateTaskStep(-1);
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
            onClick={() => {
              updateSynonymMenu(true);
              updateCopilotRectX(menuXOffside.current);
              updateCopilotRect(menuYOffside.current);
              setOpen(false);
            }}
            className='text-doc-primary'
          >
            <Synonym />
            Synonym
          </MemoButton>
        ) : (
          <MemoButton
            onClick={async () => {
              if (selectedLength >= 160) {
                const toast = (await import('sonner')).toast;
                toast.warning('Citation is limited to 160 words');
                return;
              }
              updateCitationMenu(true);
              updateCopilotRect(menuYOffside.current);
              setOpen(false);
            }}
            className='text-doc-primary'
          >
            <BookHalf size={18} />
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
          <CornerDownLeft size={18} />
        </MemoButton>
        <MemoButton
          tooltip='Redo'
          tooltipShortcut={['Mod', 'Y']}
          onClick={commands.onRedo}
        >
          <CornerDownRight size={18} />
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
});

BubbleMenu.displayName = 'BubbleMenu';
