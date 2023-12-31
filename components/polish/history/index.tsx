'use client';
import Spacer from '@/components/root/Spacer';
import { IEvaluationHistory } from '@/types';
import useUnmount from 'beautiful-react-hooks/useUnmount';
import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';
import { useDebounce } from 'use-debounce';

const SearchBar = dynamic(() => import('./Search'));
const List = dynamic(() => import('./List'));
const EvaluationHistory = ({
  history_list,
}: {
  history_list: IEvaluationHistory[];
}) => {
  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword, fn] = useDebounce(keyword, 700, { maxWait: 2000 });
  const memoSetKeyword = useCallback((value: string) => {
    setKeyword(value);
  }, []);
  useUnmount(() => {
    fn.cancel();
  });
  return (
    <main className='relative flex h-[calc(100%_-var(--top-nav-bar-height))] w-full flex-col overflow-y-auto'>
      <Spacer y='24' />
      <SearchBar keyword={keyword} setKeyword={memoSetKeyword} />
      <Spacer y='48' />
      <List history_list={history_list} />
      <Spacer y='24' />
    </main>
  );
};
export default EvaluationHistory;
