import { Toolbar } from '@/components/editor/Toolbar';
import * as Popover from '@radix-ui/react-popover';
import { BubbleMenu, Editor } from '@tiptap/react';
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
import { memo, useEffect, useState } from 'react';

import { BookHalf, Copilot, Synonym } from '@/components/root/SvgComponents';
import { ContentTypePicker } from '../picker/content';
import { useTextmenuCommands } from './hooks/useTextMenuCommand';
import { useTextmenuContentTypes } from './hooks/useTextmenuContentType';
import { useTextmenuStates } from './hooks/useTextmenuStates';

const MemoButton = memo(Toolbar.Button);
const MemoContentTypePicker = memo(ContentTypePicker);

export type TextMenuProps = {
  editor: Editor;
};

const TextMenu = ({ editor }: TextMenuProps) => {
  const commands = useTextmenuCommands(editor);
  const states = useTextmenuStates(editor);
  const blockOptions = useTextmenuContentTypes(editor);
  const [selectedLength, setSelectedLength] = useState(0);
  const [isWord, setIsWord] = useState(false);
  useEffect(() => {
    const handler = ({ editor }: { editor: Editor }) => {
      const {
        state: {
          doc,
          selection: { empty, from, to },
        },
      } = editor;
      const text = doc.textBetween(from, to);
      if (!text || empty) return;
      const words = text.match(/\b\w+\b/g);
      if (words && words.length === 1) {
        setIsWord(true);
      } else {
        setIsWord(false);
      }
      setSelectedLength(words ? words.length : 0);
    };
    editor.on('selectionUpdate', () => handler({ editor }));
    return () => {
      editor.off('selectionUpdate', () => handler({ editor }));
    };
  }, [editor]);

  return (
    <BubbleMenu
      tippyOptions={{
        popperOptions: { placement: 'top-end' },
        appendTo: 'parent',
      }}
      editor={editor}
      pluginKey='textMenu'
      shouldShow={states.shouldShow}
      updateDelay={200}
    >
      <Toolbar.Wrapper className='border-shadow-borde border shadow-lg'>
        <MemoButton onClick={commands.onAiMenu} className='text-doc-primary'>
          <Copilot />
          AI Copilot
        </MemoButton>
        <Toolbar.Divider />
        {isWord ? (
          <MemoButton className='text-doc-primary'>
            <Synonym />
            Synonym
          </MemoButton>
        ) : (
          <MemoButton className='text-doc-primary'>
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
    </BubbleMenu>
  );
};

export default TextMenu;
