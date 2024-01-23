import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDebouncedState } from '@/hooks/useDebounceState';
import useAiEditor from '@/zustand/store';
import { Plus, Search } from 'lucide-react';

const SearchBar = () => {
  const [keyword, setKeyword] = useDebouncedState('', 1500);
  const updateShowCreateCitation = useAiEditor(
    (state) => state.updateShowCreateCitation
  );

  return (
    <div className='flex-between h-12 w-full gap-x-3'>
      <div className='flex-between h-full w-full rounded border border-shadow-border px-2.5'>
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
        onClick={() => {
          updateShowCreateCitation(true);
        }}
      >
        <Plus className='text-doc-shadow' />
      </Button>
    </div>
  );
};
export default SearchBar;
