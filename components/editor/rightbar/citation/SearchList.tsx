import Loading from '@/components/root/CustomLoading';
import Spacer from '@/components/root/Spacer';
import { Book } from '@/components/root/SvgComponents';
import { useDebouncedState } from '@/hooks/useDebounceState';
import { searchCitation } from '@/query/api';
import { ICitation } from '@/query/type';
import { useStatefulRef } from '@bedrock-layout/use-stateful-ref';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';
import { SearchCitationCard } from './CitationCard';
import SearchBar from './SearchBar';

const Mine = dynamic(() => import('./Mine'));
const SearchList = () => {
  const container = useStatefulRef(null);
  const [keyword, setKeyword] = useDebouncedState('', 500);
  const [searchResult, setSearchResult] = useState<ICitation[]>([]);
  const removeFromResultList = useCallback((index: number) => {
    setSearchResult((prev) => prev.splice(index, 1));
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
      <Spacer y='10' />
      <div className='flex h-[calc(100%_-115px)] w-full flex-col gap-y-8 overflow-y-auto'>
        {isError ? null : isPending ? (
          <Loading />
        ) : (
          searchResult &&
          searchResult?.map((item, index) => (
            <SearchCitationCard key={`citation-search${index}`} item={item} />
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
