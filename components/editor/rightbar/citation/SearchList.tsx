import Loading from '@/components/root/CustomLoading';
import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { searchCitation } from '@/query/api';
import { ICitation } from '@/query/type';
import { EditorDictType } from '@/types';
import { useCitation } from '@/zustand/store';
import { useQuery } from '@tanstack/react-query';
import { memo, useCallback, useEffect, useState } from 'react';
import { SearchCitationCard } from './CitationCard';
import SearchBar from './SearchBar';

const SearchList = ({ t }: { t: EditorDictType }) => {
  const updateShowCreateCitation = useCitation(
    (state) => state.updateShowCreateCitation
  );

  const [keyword, setKeyword] = useState('');
  const [searchResult, setSearchResult] = useState<ICitation[]>([]);
  const memopSetSearchResult = useCallback(
    (value: ICitation[]) => setSearchResult(value),
    []
  );
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
    staleTime: Infinity,
  });

  useEffect(() => {
    if (citationResult) {
      setSearchResult(citationResult);
    }
  }, [citationResult]);

  return (
    <section className='relative flex flex-1 flex-col overflow-visible overflow-y-auto'>
      <Spacer y='10' />
      <SearchBar
        t={t}
        setResult={memopSetSearchResult}
        setKeyword={setKeyword}
      />
      <Button
        className='w-max bg-transparent px-2 text-violet-500 hover:underline'
        variant={'ghost'}
        onClick={() => {
          updateShowCreateCitation(true);
        }}
      >
        {t.Citation.customized}
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
              key={`citation-search${index}`}
              item={item}
            />
          ))
        )}
      </div>
    </section>
  );
};
export default memo(SearchList);
