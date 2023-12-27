'use client';
import Spacer from '@/components/root/Spacer';
import { IEvaluationHistory } from '@/types';
import useUnmount from 'beautiful-react-hooks/useUnmount';
import { Plus, Upload } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { v4 } from 'uuid';

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
      <div className='grid w-full grid-flow-row grid-cols-6 gap-x-4 gap-y-8 px-4 2xl:grid-cols-8'>
        <div className='flex h-[250px] w-full flex-col gap-y-4'>
          <span className='flex-center h-1/2 w-full cursor-pointer gap-x-2 rounded-lg bg-card hover:opacity-50'>
            <Upload className='text-white' size={20} />
            <p className='base-semibold text-white'>Upload Essay</p>
          </span>
          <Link
            className='flex-center h-1/2 w-full cursor-pointer gap-x-2 rounded-lg border border-shadow-border bg-transparent hover:opacity-50'
            href={`/writtingpal/polish/${v4()}`}
          >
            <Plus className='text-primary-200' size={20} />
            <p className='base-semibold'>New Essay</p>
          </Link>
        </div>
        <List history_list={history_list} />
      </div>
      <Spacer y='24' />
    </main>
  );
};
export default EvaluationHistory;
