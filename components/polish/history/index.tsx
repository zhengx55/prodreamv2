'use client';
import Spacer from '@/components/root/Spacer';
import { getDocs } from '@/query/api';
import { useQuery } from '@tanstack/react-query';
import useUpdateEffect from 'beautiful-react-hooks/useUpdateEffect';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { v4 } from 'uuid';

const SearchBar = dynamic(() => import('./Search'));
const List = dynamic(() => import('./List'));

const EvaluationHistory = () => {
  const searchParam = useSearchParams();
  const {
    data,
    isPending: isDataLoading,
    isError,
    isRefetching,
    refetch: refetchHistory,
  } = useQuery({
    queryKey: ['document_history_list'],
    queryFn: () => getDocs(1, 15, searchParam.get('search') ?? undefined),
  });

  useUpdateEffect(() => {
    refetchHistory();
  }, [searchParam.get('search')]);

  return (
    <main className='relative flex h-[calc(100%_-var(--top-nav-bar-height))] w-full flex-col items-center overflow-y-auto'>
      <Spacer y='24' />
      <SearchBar />
      <Spacer y='48' />
      <List
        key={v4()}
        isLoading={isDataLoading || isRefetching}
        history_list={isError ? [] : data!.list}
        hasMorePage={isError ? false : data!.hasMore}
      />

      <Spacer y='14' />
    </main>
  );
};
export default EvaluationHistory;
