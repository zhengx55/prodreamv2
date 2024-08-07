import Icon from '@/components/root/Icon';
import { useTextmenuCommands } from '@/components/workbench/editor/hooks/useTextMenuCommand';
import * as Popover from '@radix-ui/react-popover';
import { BubbleMenu, Editor } from '@tiptap/react';
import { useTranslations } from 'next-intl';
import { memo } from 'react';

import ContentTypePicker from '@/components/workbench/editor/ContentPicker';
import { useTextmenuContentTypes } from '@/components/workbench/editor/hooks/useTextmenuContentType';
import { useTextmenuStates } from '@/components/workbench/editor/hooks/useTextmenuStates';
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

const MemoButton = memo(Toolbar.Button);

const EditorBubbleMenu = ({ editor }: Props) => {
  const transEditor = useTranslations('Editor');
  const commands = useTextmenuCommands(editor);
  const states = useTextmenuStates(editor);
  const blockOptions = useTextmenuContentTypes(editor);

  return (
    <BubbleMenu
      editor={editor}
      className='flex size-max items-center gap-x-2 rounded-lg border border-gray-300 bg-white p-1 shadow'
      tippyOptions={{
        appendTo: () => document.body,
        duration: 100,
        placement: 'top-start',
      }}
    >
      <MemoButton>
        <Icon
          alt=''
          src='/editor/stars.svg'
          width={18}
          height={18}
          className='size-[18px]'
        />
        <span className='text-indigo-500'>AI Copilot</span>
      </MemoButton>
      <Toolbar.Divider />
      <ContentTypePicker options={blockOptions} />
      <MemoButton
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
      </MemoButton>
      <MemoButton
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
      </MemoButton>
      <Toolbar.Divider />
      <MemoButton
        onMouseDown={(e) => e.preventDefault()}
        tooltip={transEditor('BubbleMenu.Bold')}
        tooltipShortcut={['Mod', 'B']}
        onClick={commands.onBold}
        active={states.isBold}
      >
        <Bold size={16} />
      </MemoButton>
      <MemoButton
        onMouseDown={(e) => e.preventDefault()}
        tooltip={transEditor('BubbleMenu.Italic')}
        tooltipShortcut={['Mod', 'I']}
        onClick={commands.onItalic}
        active={states.isItalic}
      >
        <Italic size={16} />
      </MemoButton>
      <MemoButton
        onMouseDown={(e) => e.preventDefault()}
        tooltip={transEditor('BubbleMenu.Underline')}
        tooltipShortcut={['Mod', 'U']}
        onClick={commands.onUnderline}
        active={states.isUnderline}
      >
        <Underline size={16} />
      </MemoButton>
      <MemoButton
        onMouseDown={(e) => e.preventDefault()}
        tooltip={transEditor('BubbleMenu.Strikethrough')}
        tooltipShortcut={['Mod', 'X']}
        onClick={commands.onStrike}
        active={states.isStrike}
      >
        <Strikethrough size={16} />
      </MemoButton>
      <Popover.Root>
        <Popover.Trigger asChild>
          <MemoButton
            onMouseDown={(e) => e.preventDefault()}
            tooltip={transEditor('BubbleMenu.More_options')}
          >
            <MoreVertical size={16} />
          </MemoButton>
        </Popover.Trigger>
        <Popover.Content
          onPointerDown={(e) => e.preventDefault()}
          side='top'
          asChild
          className='size-max p-1'
        >
          <Toolbar.Wrapper>
            <MemoButton
              tooltip={transEditor('BubbleMenu.Align_Left')}
              tooltipShortcut={['Shift', 'Mod', 'L']}
              onClick={commands.onAlignLeft}
              active={states.isAlignLeft}
            >
              <AlignLeft size={16} />
            </MemoButton>
            <MemoButton
              tooltip={transEditor('BubbleMenu.Align_Center')}
              tooltipShortcut={['Shift', 'Mod', 'E']}
              onClick={commands.onAlignCenter}
              active={states.isAlignCenter}
            >
              <AlignCenter size={16} />
            </MemoButton>
            <MemoButton
              tooltip={transEditor('BubbleMenu.Align_Right')}
              tooltipShortcut={['Shift', 'Mod', 'R']}
              onClick={commands.onAlignRight}
              active={states.isAlignRight}
            >
              <AlignRight size={16} />
            </MemoButton>
            <MemoButton
              tooltip={transEditor('BubbleMenu.Justify')}
              tooltipShortcut={['Shift', 'Mod', 'J']}
              onClick={commands.onAlignJustify}
              active={states.isAlignJustify}
            >
              <AlignJustify size={16} />
            </MemoButton>
          </Toolbar.Wrapper>
        </Popover.Content>
      </Popover.Root>
    </BubbleMenu>
  );
};

export default EditorBubbleMenu;
