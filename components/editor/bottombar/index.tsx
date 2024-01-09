'use client';
import { Toolbar } from '@/components/editor/Toolbar';
import * as Popover from '@radix-ui/react-popover';
import { Editor } from '@tiptap/react';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  MoreVertical,
  PenLine,
  Redo,
  Strikethrough,
  Underline,
  Undo,
} from 'lucide-react';
import { memo } from 'react';
import { ContentTypePicker } from '../picker/content';
import { useTextmenuCommands } from '../text/hooks/useTextMenuCommand';
import { useTextmenuContentTypes } from '../text/hooks/useTextmenuContentType';
import { useTextmenuStates } from '../text/hooks/useTextmenuStates';
const MemoButton = memo(Toolbar.Button);
const MemoContentTypePicker = memo(ContentTypePicker);

const BottomBar = ({ editor }: { editor: Editor }) => {
  const commands = useTextmenuCommands(editor);
  const states = useTextmenuStates(editor);
  const blockOptions = useTextmenuContentTypes(editor);
  return (
    <Toolbar.Wrapper className='border-shadow-borde w-full gap-x-2 !rounded-none border !border-l-0 !border-r-0'>
      <MemoButton>
        <PenLine size={16} />
        Chat Edit
      </MemoButton>
      <Toolbar.Divider />
      <MemoContentTypePicker options={blockOptions} />
      <MemoButton
        tooltip='Undo'
        tooltipShortcut={['Mod', 'Z']}
        onClick={commands.onUndo}
      >
        <Undo size={16} />
      </MemoButton>
      <MemoButton
        tooltip='Redo'
        tooltipShortcut={['Mod', 'Y']}
        onClick={commands.onRedo}
      >
        <Redo size={16} />
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
          {editor.storage.characterCount.words()}
          &nbsp;Words
        </p>
      </span>
    </Toolbar.Wrapper>
  );
};
export default BottomBar;
