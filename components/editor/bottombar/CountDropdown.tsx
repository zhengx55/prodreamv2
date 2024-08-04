import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getDictionary } from '@/lib/get-dictionary';
import type { Editor } from '@tiptap/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

type Props = {
  editor: Editor;
};
const CountDropdown = ({ editor }: Props) => {
  const [type, setType] = useState('word');
  const trans = useTranslations('Editor');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {type === 'word' ? (
          <span className='flex h-full cursor-pointer items-center px-2 hover:bg-gray-200'>
            <p className='small-regular text-neutral-400'>
              {editor.storage.characterCount.words()}
              &nbsp;{trans('BubbleMenu.words')}
            </p>
          </span>
        ) : (
          <span className='flex h-full cursor-pointer items-center px-2 hover:bg-gray-200'>
            <p className='small-regular text-neutral-400'>
              {editor.storage.characterCount.characters()}
              &nbsp;{trans('BubbleMenu.characters')}
            </p>
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        aria-label='words'
        className='border border-gray-200 bg-white'
      >
        <DropdownMenuItem
          className='flex cursor-pointer text-neutral-400 hover:bg-gray-200'
          onClick={() => setType('word')}
        >
          <span className='small-regular text-neutral-400'>
            {editor.storage.characterCount.words()}
            &nbsp;{trans('BubbleMenu.words')}
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem
          aria-label='character'
          className='flex cursor-pointer text-neutral-400 hover:bg-gray-200'
          onClick={() => setType('character')}
        >
          <span className='small-regular text-neutral-400'>
            {editor.storage.characterCount.characters()}
            &nbsp;{trans('BubbleMenu.characters')}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default CountDropdown;
