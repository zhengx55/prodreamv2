import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useDebouncedState } from '@/hooks/useDebounceState';
import { Plus, Search } from 'lucide-react';
import dynamic from 'next/dynamic';

const CitationDropdown = dynamic(() => import('./CitationDropdown'));

type Props = { createCustom: () => void };

const SearchBar = ({ createCustom }: Props) => {
  const [keyword, setKeyword] = useDebouncedState('', 1500);

  return (
    <div className='flex-between h-12 w-full gap-x-3'>
      <div className='flex-between h-full w-full rounded border border-shadow-border px-2.5'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={'secondary'}
              className='h-max rounded border-0 bg-doc-primary/20 text-doc-primary'
            >
              Website
            </Button>
          </DropdownMenuTrigger>
          <CitationDropdown />
        </DropdownMenu>

        <Input
          type='text'
          defaultValue={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Search online citation ...'
          className='rounded border-none px-2 focus-visible:ring-0'
        />
        <Search className='text-doc-shadow' />
      </div>
      <Button
        className='h-full rounded border-shadow-border px-2'
        variant={'outline'}
        onClick={createCustom}
      >
        <Plus className='text-doc-shadow' />
      </Button>
    </div>
  );
};
export default SearchBar;
