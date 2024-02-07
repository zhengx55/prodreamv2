import { Toolbar } from '@/components/editor/Toolbar';
import { BookHalf } from '@/components/root/SvgComponents';
import useAiEditor from '@/zustand/store';
import { Editor } from '@tiptap/react';
import { CornerDownLeft, CornerDownRight } from 'lucide-react';
import { memo } from 'react';
import { useTextmenuCommands } from '../bubble-menu/hooks/useTextMenuCommand';
import { useTextmenuContentTypes } from '../bubble-menu/hooks/useTextmenuContentType';
import { ContentTypePicker } from '../picker/content';
const MemoButton = memo(Toolbar.Button);
const MemoContentTypePicker = memo(ContentTypePicker);

const BottomBar = ({ editor }: { editor: Editor }) => {
  const commands = useTextmenuCommands(editor);
  const blockOptions = useTextmenuContentTypes(editor);
  const updateRightbarTab = useAiEditor((state) => state.updateRightbarTab);
  const showCitation = () => {
    updateRightbarTab(1);
  };
  return (
    <Toolbar.Wrapper className='w-max justify-between gap-x-3 !rounded-none border-none'>
      <MemoButton onClick={showCitation} className='text-doc-primary'>
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
