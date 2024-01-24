import Loading from '@/components/root/CustomLoading';
import Spacer from '@/components/root/Spacer';
import { Book } from '@/components/root/SvgComponents';
import { useDebouncedState } from '@/hooks/useDebounceState';
import { searchCitation } from '@/query/api';
import { useStatefulRef } from '@bedrock-layout/use-stateful-ref';
import { useQuery } from '@tanstack/react-query';
import { SearchCitationCard } from './CitationCard';
import Mine from './Mine';
import SearchBar from './SearchBar';

const SearchList = () => {
  const container = useStatefulRef(null);
  const [keyword, setKeyword] = useDebouncedState('', 500);
  const {
    data: citationResult,
    isPending,
    isError,
  } = useQuery({
    queryFn: ({ signal }) => {
      if (keyword) {
        return searchCitation(keyword, signal, 0);
      } else {
        return [];
      }
    },
    queryKey: ['search-citation', keyword],
  });

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
          citationResult &&
          citationResult?.map((item) => (
            <SearchCitationCard key={item.article_title} item={item} />
          ))
        )}
      </div>
      <div className='flex-center absolute bottom-0 h-10 w-full gap-x-2 border-t border-shadow-border bg-white'>
        <Book />
        <p className='text-doc-primary'>My Citation</p>
      </div>
      <Mine container={container} />
    </section>
  );
};
export default SearchList;
