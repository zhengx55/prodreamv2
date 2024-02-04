'use client';
import Spacer from '@/components/root/Spacer';
import { getDocs } from '@/query/api';
import { useQuery } from '@tanstack/react-query';
import useUpdateEffect from 'beautiful-react-hooks/useUpdateEffect';
import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';
import { v4 } from 'uuid';
const List = dynamic(() => import('./List'));
const Search = dynamic(() => import('@/components/polish/history/Search'));

const DocHistory = () => {
  const [keyword, setKeyword] = useState('');
  const memoSetKeyword = useCallback((value: string) => {
    setKeyword(value);
  }, []);
  const {
    data,
    isPending: isDataLoading,
    isError,
    isRefetching,
    refetch: refetchHistory,
  } = useQuery({
    queryKey: ['document_history_list', keyword],
    queryFn: () => getDocs(0, 15, keyword ?? undefined),
  });

  useUpdateEffect(() => {
    refetchHistory();
  }, [keyword]);

  return (
    <>
      <Search setKeyword={memoSetKeyword} />
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
    </>
  );
};
export default DocHistory;
