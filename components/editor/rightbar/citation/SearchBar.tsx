import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useAiEditor from '@/zustand/store';
import { Search } from 'lucide-react';
import { useRef } from 'react';
type Props = {
  keyword: string;
  setKeyword: (value: string) => void;
};
const SearchBar = ({ keyword, setKeyword }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const updateShowCreateCitation = useAiEditor(
    (state) => state.updateShowCreateCitation
  );

  return (
    <div className='flex-between h-12 w-full rounded border border-shadow-border px-1.5'>
      <Input
        ref={ref}
        type='text'
        id='search-citation'
        placeholder='Search publications ...'
        className='rounded border-none px-2 shadow-none outline-none focus-visible:ring-0'
      />
      <Button
        onClick={() => ref.current?.value && setKeyword(ref.current.value)}
        className='h-max w-max rounded bg-doc-primary p-1.5'
      >
        <Search className='text-white' size={20} />
      </Button>
    </div>
    // {/* <Button
    //   className='h-full rounded border-shadow-border px-2'
    //   variant={'outline'}
    //   onClick={() => {
    //     updateShowCreateCitation(true);
    //   }}
    // >
    //   <Plus className='text-doc-shadow' />
    // </Button> */}
  );
};
export default SearchBar;
