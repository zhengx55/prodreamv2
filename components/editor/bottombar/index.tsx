'use client';
import { Toolbar } from '@/components/editor/Toolbar';
import { BookHalf, Copilot } from '@/components/root/SvgComponents';
import { Editor } from '@tiptap/react';
import { CornerDownLeft, CornerDownRight } from 'lucide-react';
import { memo } from 'react';
import { ContentTypePicker } from '../picker/content';
import { useTextmenuCommands } from '../text/hooks/useTextMenuCommand';
import { useTextmenuContentTypes } from '../text/hooks/useTextmenuContentType';
const MemoButton = memo(Toolbar.Button);
const MemoContentTypePicker = memo(ContentTypePicker);

const BottomBar = ({ editor }: { editor: Editor }) => {
  const commands = useTextmenuCommands(editor);
  const blockOptions = useTextmenuContentTypes(editor);
  return (
    <Toolbar.Wrapper className='justify-between gap-x-3 !rounded-none border-none'>
      <MemoButton className='text-doc-primary'>
        <Copilot />
        AI Copilot
      </MemoButton>
      <Toolbar.Divider />
      <MemoButton className='text-doc-primary'>
        <BookHalf size={18} />
        Citation
      </MemoButton>
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
