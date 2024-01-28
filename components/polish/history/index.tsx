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

const DocHistory = () => {
  const searchParam = useSearchParams();
  const {
    data,
    isPending: isDataLoading,
    isError,
    isRefetching,
    refetch: refetchHistory,
  } = useQuery({
    queryKey: ['document_history_list'],
    queryFn: () => getDocs(0, 15, searchParam.get('search') ?? undefined),
  });

  useUpdateEffect(() => {
    refetchHistory();
  }, [searchParam.get('search')]);

  return (
    <main className='relative flex h-full w-full flex-col items-center overflow-y-auto'>
      <Spacer y='75' />
      <SearchBar />
      <Spacer y='48' />
      <List
        key={v4()}
        isLoading={isDataLoading || isRefetching}
        history_list={
          isError || isDataLoading || isRefetching ? [] : data!.list
        }
        hasMorePage={
          isError || isDataLoading || isRefetching ? false : data!.hasMore
        }
      />
      <Spacer y='14' />
    </main>
  );
};
export default DocHistory;
