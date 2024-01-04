import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { ChangeEvent, useState } from 'react';

type Props = {
  keyword: string;
  setKeyword: (value: string) => void;
};
const SearchBar = ({ keyword, setKeyword }: Props) => {
  const [isTyping, setIsTyping] = useState(false);

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    if (!e.target.value.trim()) {
      setIsTyping(false);
    } else {
      setIsTyping(true);
    }
  };
  return (
    <div className='relative flex h-12 w-1/3 shrink-0 items-center self-center rounded-lg border border-shadow-border shadow-lg'>
      <div
        className={`${
          isTyping
            ? 'bg-primary-200 text-white'
            : 'bg-shadow-border text-shadow'
        } flex-center absolute right-2 h-10 w-10 rounded-xl `}
      >
        <Search size={22} />
      </div>
      <Input
        defaultValue={keyword}
        onChange={handleKeywordChange}
        type='text'
        className='h-full w-11/12 border-none focus-visible:ring-0'
        name='search-essay'
        aria-label='Search'
        placeholder='Search essay history ...'
      />
    </div>
  );
};
export default SearchBar;
