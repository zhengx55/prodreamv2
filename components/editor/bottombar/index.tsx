import { Toolbar } from '@/components/editor/ui/Toolbar';
import Icon from '@/components/root/Icon';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getDictionary } from '@/lib/get-dictionary';
import useAIEditor, { useCitation } from '@/zustand/store';
import { Editor } from '@tiptap/react';
import { m } from 'framer-motion';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import { useTranslations } from 'next-intl';
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
    updateRightbarTab(3);
  };
  const trans = useTranslations('Editor');

  return (
    <m.footer
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className='flex-between absolute bottom-5 left-[35%] h-14 w-[600px] rounded-lg border border-gray-200 bg-white p-2 shadow 2xl:left-[37%]'
    >
      <MemoButton
        role='button'
        onClick={showCitation}
        className='text-violet-500'
      >
        <Icon
          alt=''
          src='/editor/book-half.svg'
          width={18}
          height={18}
          className='size-[18px]'
          priority
        />
        {trans('BubbleMenu.Citation')}
      </MemoButton>
      <Toolbar.Divider />
      <DropdownMenu>
        <div className='flex items-center'>
          <p className='small-medium'>{trans('BubbleMenu.citation_style')}:</p>
          <DropdownMenuTrigger asChild>
            <MemoButton
              role='button'
              className={`mx-0 font-medium ${citationStyle === 'chicago' ? 'capitalize' : 'uppercase'}`}
            >
              {citationStyle}
            </MemoButton>
          </DropdownMenuTrigger>
        </div>
        <CitationDropdown />
      </DropdownMenu>
      <Toolbar.Divider />
      <MemoButton
        role='button'
        tooltip={trans('BubbleMenu.Undo')}
        tooltipShortcut={['Mod', 'Z']}
        onClick={commands.onUndo}
      >
        <Icon
          alt=''
          src='/editor/undo.svg'
          width={18}
          height={18}
          className='size-[18px]'
          priority
        />
      </MemoButton>
      <MemoButton
        role='button'
        tooltip={trans('BubbleMenu.Redo')}
        tooltipShortcut={['Mod', 'Y']}
        onClick={commands.onRedo}
      >
        <Icon
          alt=''
          src='/editor/redo.svg'
          width={18}
          height={18}
          className='size-[18px]'
          priority
        />
      </MemoButton>
      <Toolbar.Divider />
      <CountDropdown t={t} editor={editor} />
    </m.footer>
  );
};
export default memo(BottomBar);
