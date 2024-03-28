import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getDictionary } from '@/lib/get-dictionary';
import type { Editor } from '@tiptap/react';
import { useState } from 'react';

type Props = {
  editor: Editor;
  t: Awaited<ReturnType<typeof getDictionary>>['Editor'];
};
const CountDropdown = ({ editor, t }: Props) => {
  const [type, setType] = useState('word');
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {type === 'word' ? (
          <span className='flex h-full cursor-pointer items-center px-2 hover:bg-gray-200'>
            <p className='small-regular text-shadow'>
              {editor.storage.characterCount.words()}
              &nbsp;{t.BubbleMenu.words}
            </p>
          </span>
        ) : (
          <span className='flex h-full cursor-pointer items-center px-2 hover:bg-gray-200'>
            <p className='small-regular text-shadow'>
              {editor.storage.characterCount.characters()}
              &nbsp;{t.BubbleMenu.characters}
            </p>
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        aria-label='words'
        className='border border-gray-200 bg-white'
      >
        <DropdownMenuItem
          className='flex cursor-pointer text-shadow hover:bg-gray-200'
          onClick={() => setType('word')}
        >
          <span className='small-regular text-shadow'>
            {editor.storage.characterCount.words()}
            &nbsp;Words
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem
          aria-label='character'
          className='flex cursor-pointer text-shadow hover:bg-gray-200'
          onClick={() => setType('character')}
        >
          <span className='small-regular text-shadow'>
            {editor.storage.characterCount.characters()}
            &nbsp;Characters
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default CountDropdown;
