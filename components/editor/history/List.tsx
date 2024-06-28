'use client';
import Loading from '@/components/root/CustomLoading';
import Icon from '@/components/root/Icon';
import Spacer from '@/components/root/Spacer';
import Tooltip from '@/components/root/Tooltip';
import { Button } from '@/components/ui/button';
import { useMembershipInfo } from '@/hooks/useMemberShip';
import { getDocs } from '@/query/api';
import { IDocDetail } from '@/query/type';
import { DocPageDicType, DocSortingMethods } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { LayoutGrid, Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import MembershipBar from './MembershipBar';

const CardView = dynamic(() => import('./CardView'));
const ListView = dynamic(() => import('./ListView'));
const FilterDropdown = dynamic(() => import('./FilterDropDown'));

type Props = DocPageDicType;
const DocumentList = (props: Props) => {
  const { ref, inView } = useInView();
  const searchParams = useSearchParams();
  const {
    data: membership,
    isPending: isMebershipPending,
    isError: isMembershipError,
  } = useMembershipInfo();
  const transEditor = useTranslations('Editor');
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [list, setList] = useState<IDocDetail[]>([]);
  const [page, setPage] = useState(1);
  const [morePage, setMorePage] = useState(false);
  const [loadingMore, toogleLoadingMore] = useState(false);
  const [sortingMethod, setSortingMethod] =
    useState<DocSortingMethods>('lastOpenedTime');

  const { data, isPending, isError } = useQuery({
    queryKey: ['document_history_list', searchParams.get('query')],
    queryFn: () => getDocs(0, 15, searchParams.get('query') ?? undefined),
    refetchOnMount: true,
    select: (data) =>
      sortingMethod === 'title'
        ? {
            ...data,
            list: data.list.sort((a, b) => a.title.localeCompare(b.title)),
          }
        : {
            ...data,
            list: data.list.sort((a, b) => b.update_time - a.update_time),
          },
  });

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
  if (isError || isMembershipError) return null;
  return (
    <>
      <div className='flex-between w-[1100px]'>
        <h1 className='title-semibold'>
          {transEditor('DocumentList.My_documents')}
        </h1>
        <div className='flex-between w-1/3'>
          {viewType === 'list' ? (
            <p className='title-regular'>
              {transEditor('DocumentList.Last_opened')}
            </p>
          ) : (
            <span />
          )}
          <div className='flex gap-x-2'>
            {viewType === 'grid' ? (
              <Tooltip
                side='bottom'
                tooltipContent={transEditor('DocumentList.List_View')}
              >
                <Button
                  role='button'
                  variant={'icon'}
                  onClick={() => setViewType('list')}
                  className='size-max p-1'
                >
                  <Icon
                    alt='list'
                    src='/editor/listview.svg'
                    width={20}
                    height={20}
                    className='size-6'
                  />
                </Button>
              </Tooltip>
            ) : (
              <Tooltip
                side='bottom'
                tooltipContent={transEditor('DocumentList.Grid_View')}
              >
                <Button
                  role='button'
                  variant={'icon'}
                  onClick={() => setViewType('grid')}
                  className='size-max p-1'
                >
                  <LayoutGrid />
                </Button>
              </Tooltip>
            )}
            <FilterDropdown
              setSortingMethod={memoSetSortingMethod}
              sortingMethod={sortingMethod}
            />
          </div>
        </div>
      </div>
      <Spacer y='24' />
      {isPending || isMebershipPending ? (
        <Loading />
      ) : viewType === 'grid' ? (
        <CardView {...props} list={list} />
      ) : (
        <ListView {...props} list={list} />
      )}
      <Spacer y='10' />
      <div className='flex-center h-10 w-full' ref={ref}>
        {loadingMore ? (
          <Loader2 className='animate-spin text-violet-500' />
        ) : null}
      </div>
      <Spacer y='10' />
      {(membership?.subscription === 'basic' ||
        membership?.subscription === 'free_trail') && (
        <MembershipBar membership={membership} />
      )}
    </>
  );
};
export default DocumentList;
