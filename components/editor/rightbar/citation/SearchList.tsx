import Loading from '@/components/root/CustomLoading';
import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { searchCitation } from '@/query/api';
import { ICitation } from '@/query/type';
import useAiEditor from '@/zustand/store';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';
import { SearchCitationCard } from './CitationCard';
import SearchBar from './SearchBar';

const Mine = dynamic(() => import('./Mine'), { ssr: false });

const SearchList = () => {
  const updateShowCreateCitation = useAiEditor(
    (state) => state.updateShowCreateCitation
  );
  const [keyword, setKeyword] = useState('');
  const [searchResult, setSearchResult] = useState<ICitation[]>([]);

  const memopSetSearchResult = useCallback(
    (value: ICitation[]) => setSearchResult(value),
    []
  );
  const removeFromResultList = useCallback((index: number) => {
    setSearchResult((prev) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1),
    ]);
  }, []);
  const {
    data: citationResult,
    isPending,
    isError,
  } = useQuery({
    queryFn: ({ signal }) => {
      if (keyword) {
        return searchCitation(keyword, signal, 0);
      } else {
        setSearchResult([]);
        return [];
      }
    },
    queryKey: ['search-citation', keyword],
  });
  useEffect(() => {
    if (citationResult) setSearchResult(citationResult);
  }, [citationResult]);
  return (
    <section className='relative flex flex-1 flex-col overflow-visible overflow-y-auto'>
      <Spacer y='10' />
      <SearchBar setResult={memopSetSearchResult} setKeyword={setKeyword} />
      <Button
        className='w-max px-2 text-doc-primary'
        variant={'link'}
        onClick={() => {
          updateShowCreateCitation(true);
        }}
      >
        Or add customzied citaitons
      </Button>
      <Spacer y='10' />
      <div className='flex h-[calc(100%_-115px)] w-full flex-col gap-y-8 overflow-y-auto'>
        {isError ? null : isPending ? (
          <Loading />
        ) : (
          searchResult &&
          searchResult?.map((item, index) => (
            <SearchCitationCard
              index={index}
              remove={removeFromResultList}
              key={`citation-search${index}`}
              item={item}
            />
          ))
        )}
      </div>
      <Mine />
    </section>
  );
};
export default SearchList;
