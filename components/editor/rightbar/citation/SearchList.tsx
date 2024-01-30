import Loading from '@/components/root/CustomLoading';
import Spacer from '@/components/root/Spacer';
import { Book } from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import { searchCitation } from '@/query/api';
import { ICitation } from '@/query/type';
import useAiEditor from '@/zustand/store';
import { useStatefulRef } from '@bedrock-layout/use-stateful-ref';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';
import { SearchCitationCard } from './CitationCard';
import SearchBar from './SearchBar';

const Mine = dynamic(() => import('./Mine'));
const SearchList = () => {
  const updateShowCreateCitation = useAiEditor(
    (state) => state.updateShowCreateCitation
  );
  const container = useStatefulRef(null);
  const [keyword, setKeyword] = useState('');
  const [searchResult, setSearchResult] = useState<ICitation[]>([]);
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
    <section
      ref={container}
      className='relative flex flex-1 flex-col overflow-visible overflow-y-auto'
    >
      <Spacer y='10' />
      <SearchBar keyword={keyword} setKeyword={setKeyword} />
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
      <div className='flex-between absolute bottom-0 h-10 w-full gap-x-2 border-t border-shadow-border bg-white'>
        <div className='flex items-center gap-x-2'>
          <Book />
          <p className='text-doc-primary'>My Citation</p>
        </div>
      </div>
      <Mine container={container} />
    </section>
  );
};
export default SearchList;
