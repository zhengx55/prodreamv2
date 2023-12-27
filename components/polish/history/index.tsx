'use client';
import Spacer from '@/components/root/Spacer';
import { Input } from '@/components/ui/input';
import useUnmount from 'beautiful-react-hooks/useUnmount';
import { Search } from 'lucide-react';
import { ChangeEvent, useState } from 'react';
import { useDebounce } from 'use-debounce';

const EvaluationHistory = () => {
  const [keyword, setKeyword] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    if (!e.target.value.trim()) {
      setIsTyping(false);
    } else {
      setIsTyping(true);
    }
  };

  const [debouncedKeyword, fn] = useDebounce(keyword, 700, { maxWait: 2000 });

  useUnmount(() => {
    fn.cancel();
  });
  return (
    <main className='relative flex h-[calc(100%_-var(--top-nav-bar-height))] w-full flex-col overflow-y-auto'>
      <Spacer y='24' />
      <div className='relative flex h-12 w-1/3 items-center self-center rounded-lg border border-shadow-border shadow-lg'>
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
          value={keyword}
          onChange={handleKeywordChange}
          type='text'
          className='h-full w-11/12 border-none focus-visible:ring-0'
          name='search-essay'
          aria-label='Search'
          placeholder='Search essay history ...'
        />
      </div>
    </main>
  );
};
export default EvaluationHistory;
