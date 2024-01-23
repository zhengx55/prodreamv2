import Loading from '@/components/root/CustomLoading';
import Spacer from '@/components/root/Spacer';
import { Book } from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import { useDebouncedState } from '@/hooks/useDebounceState';
import { searchCitation } from '@/query/api';
import { useStatefulRef } from '@bedrock-layout/use-stateful-ref';
import { useQuery } from '@tanstack/react-query';
import { Plus, ReplyAll } from 'lucide-react';
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
        return searchCitation(keyword, signal);
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
            <div
              key={item.article_title}
              className='group flex flex-col gap-y-2 px-2'
            >
              <h1
                onClick={() => {
                  if (item.pdf_url) window.open(item.pdf_url, '_blank');
                }}
                className='base-semibold cursor-pointer hover:text-doc-primary'
              >
                {item.article_title}
              </h1>
              <p className='small-regular line-clamp-3'>
                {item.abstract ?? 'No content available'}
              </p>
              <div className='flex-between'>
                <Button
                  className='h-max w-[48%] rounded bg-doc-primary'
                  role='button'
                >
                  <ReplyAll size={18} />
                  Cite
                </Button>
                <Button
                  className='h-max w-[48%] rounded border border-doc-primary text-doc-primary'
                  variant={'ghost'}
                  role='button'
                >
                  <Plus size={18} className='text-doc-primary' /> Add to mine
                </Button>
              </div>
            </div>
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
