import { Toolbar } from '@/components/editor/ui/Toolbar';
import { BookHalf, Redo, Undo } from '@/components/root/SvgComponents';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getDictionary } from '@/lib/get-dictionary';
import useAIEditor, { useCitation } from '@/zustand/store';
import { Editor } from '@tiptap/react';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import { useTextmenuCommands } from '../bubble-menu/hooks/useTextMenuCommand';
import CountDropdown from './CountDropdown';
const MemoButton = memo(Toolbar.Button);
const CitationDropdown = dynamic(() => import('./CitationDropdown'));

const BottomBar = ({
  editor,
  t,
}: {
  editor: Editor;
  t: Awaited<ReturnType<typeof getDictionary>>['Editor'];
}) => {
  const citationStyle = useCitation((state) => state.citationStyle);
  const commands = useTextmenuCommands(editor);
  const updateRightbarTab = useAIEditor((state) => state.updateRightbarTab);
  const showCitation = () => {
    updateRightbarTab(1);
  };
  return (
    <Toolbar.Wrapper className='w-max justify-between gap-x-3 !rounded-none border-none'>
      <MemoButton
        role='button'
        onClick={showCitation}
        className='text-violet-500'
      >
        <BookHalf size={'18'} />
        {t.BubbleMenu.Citation}
      </MemoButton>
      <Toolbar.Divider />
      <DropdownMenu>
        <div className='flex items-center'>
          <p className='small-medium'>{t.BubbleMenu.citation_style}:</p>
          <DropdownMenuTrigger asChild>
            <MemoButton role='button' className='mx-0 font-medium'>
              {citationStyle}
            </MemoButton>
          </DropdownMenuTrigger>
        </div>
        <CitationDropdown />
      </DropdownMenu>
      <Toolbar.Divider />
      <MemoButton
        role='button'
        tooltip='Undo'
        tooltipShortcut={['Mod', 'Z']}
        onClick={commands.onUndo}
      >
        <Undo />
      </MemoButton>
      <MemoButton
        role='button'
        tooltip='Redo'
        tooltipShortcut={['Mod', 'Y']}
        onClick={commands.onRedo}
      >
        <Redo />
      </MemoButton>
      <Toolbar.Divider />
      <CountDropdown t={t} editor={editor} />
    </Toolbar.Wrapper>
  );
};
export default memo(BottomBar);
