import { Toolbar } from '@/components/editor/ui/Toolbar';
import { BookHalf } from '@/components/root/SvgComponents';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useAiEditor, { useCitation } from '@/zustand/store';
import { Editor } from '@tiptap/react';
import { CornerDownLeft, CornerDownRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import { useTextmenuCommands } from '../bubble-menu/hooks/useTextMenuCommand';
import CountDropdown from './CountDropdown';
const MemoButton = memo(Toolbar.Button);
const CitationDropdown = dynamic(() => import('./CitationDropdown'));

const BottomBar = ({ editor }: { editor: Editor }) => {
  const citationStyle = useCitation((state) => state.citationStyle);
  const commands = useTextmenuCommands(editor);
  const updateRightbarTab = useAiEditor((state) => state.updateRightbarTab);
  const showCitation = () => {
    updateRightbarTab(1);
  };
  return (
    <Toolbar.Wrapper className='w-max justify-between gap-x-3 !rounded-none border-none'>
      <MemoButton
        role='button'
        onClick={showCitation}
        className='text-doc-primary'
      >
        <BookHalf size={'18'} />
        Citation
      </MemoButton>
      <Toolbar.Divider />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MemoButton role='button' className='font-medium'>
            Citation Style: {citationStyle}
          </MemoButton>
        </DropdownMenuTrigger>
        <CitationDropdown />
      </DropdownMenu>
      <Toolbar.Divider />
      <MemoButton
        role='button'
        tooltip='Undo'
        tooltipShortcut={['Mod', 'Z']}
        onClick={commands.onUndo}
      >
        <CornerDownLeft size={18} />
      </MemoButton>
      <MemoButton
        role='button'
        tooltip='Redo'
        tooltipShortcut={['Mod', 'Y']}
        onClick={commands.onRedo}
      >
        <CornerDownRight size={18} />
      </MemoButton>
      <Toolbar.Divider />
      <CountDropdown editor={editor} />
    </Toolbar.Wrapper>
  );
};
export default BottomBar;
