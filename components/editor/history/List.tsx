import Loading from '@/components/root/CustomLoading';
import Spacer from '@/components/root/Spacer';
import { ListView as ListViewIcon } from '@/components/root/SvgComponents';
import { getDocs } from '@/query/api';
import { useDocumentList } from '@/query/query';
import { IDocDetail } from '@/query/type';
import { DocSortingMethods } from '@/types';
import { LayoutGrid, Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import MembershipBar from './MembershipBar';

const CardView = dynamic(() => import('./CardView'));
const ListView = dynamic(() => import('./ListView'));
const FilterDropdown = dynamic(() => import('./FilterDropDown'));

const DocumentList = () => {
  const { ref, inView } = useInView();
  const searchParams = useSearchParams();
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [list, setList] = useState<IDocDetail[]>([]);
  const [page, setPage] = useState(1);
  const [morePage, setMorePage] = useState(false);
  const [loadingMore, toogleLoadingMore] = useState(false);
  const [sortingMethod, setSortingMethod] =
    useState<DocSortingMethods>('lastOpenedTime');
  const { data, isPending, isError } = useDocumentList(
    searchParams.get('query') as string,
    sortingMethod
  );

  useEffect(() => {
    setList(data?.list || []);
  }, [data]);

  const loadMoreDocs = async () => {
    if (!morePage) return;
    try {
      toogleLoadingMore(true);
      const next = page + 1;
      const more_data = await getDocs(next, 15);
      if (more_data.list.length > 0) {
        if (more_data.hasMore) {
          setMorePage(true);
        } else {
          setMorePage(false);
        }
        setPage(next);
        setList((prev) => [...(prev?.length ? prev : []), ...more_data.list]);
      }
    } catch (error) {
    } finally {
      toogleLoadingMore(false);
    }
  };

  useEffect(() => {
    if (inView) {
      loadMoreDocs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, morePage]);

  const memoSetSortingMethod = useCallback((value: DocSortingMethods) => {
    setSortingMethod(value);
  }, []);

  if (isError) return null;
  return (
    <>
      <div className='flex-between w-[1100px]'>
        <h1 className='title-semibold'>My documents</h1>
        <div className='flex-between w-1/3'>
          {viewType === 'list' ? (
            <p className='title-regular'>Last opened </p>
          ) : (
            <span />
          )}
          <div className='flex gap-x-4'>
            {viewType === 'grid' ? (
              <span
                onClick={() => setViewType('list')}
                className='cursor-pointer rounded-md bg-transparent p-1 hover:bg-shadow-border'
              >
                <ListViewIcon />
              </span>
            ) : (
              <span
                onClick={() => setViewType('grid')}
                className='cursor-pointer rounded-md bg-transparent p-1 hover:bg-shadow-border'
              >
                <LayoutGrid />
              </span>
            )}
            <FilterDropdown
              setSortingMethod={memoSetSortingMethod}
              sortingMethod={sortingMethod}
            />
          </div>
        </div>
      </div>
      <Spacer y='24' />
      {isPending ? (
        <Loading />
      ) : viewType === 'grid' ? (
        <CardView list={list} />
      ) : (
        <ListView list={list} />
      )}
      <Spacer y='10' />
      <div className='flex-center h-10 w-full' ref={ref}>
        {loadingMore ? (
          <Loader2 className='animate-spin text-primary-200' />
        ) : null}
      </div>
      <Spacer y='10' />
      <MembershipBar />
    </>
  );
};
export default DocumentList;
