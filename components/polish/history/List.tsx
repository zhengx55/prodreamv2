'use client';
import Spacer from '@/components/root/Spacer';
import { ListView as ListViewIcon } from '@/components/root/SvgComponents';
import { getDocs } from '@/query/api';
import { IDocDetail } from '@/query/type';
import { DocSortingMethods } from '@/types';
import useUpdateEffect from 'beautiful-react-hooks/useUpdateEffect';
import { LayoutGrid, Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { memo, useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import CardView from './CardView';

const ListView = dynamic(() => import('./ListView'));
const DeleteModal = dynamic(() => import('./DeleteModal'));
const FilterDropdown = dynamic(() => import('./FilterDropDown'));

type Props = { history_list: IDocDetail[]; hasMorePage: boolean };

const List = ({ history_list, hasMorePage }: Props) => {
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const { ref, inView } = useInView();
  const [list, setList] = useState<IDocDetail[]>(history_list);
  const [page, setPage] = useState(1);
  const [morePage, setMorePage] = useState(hasMorePage);
  const [loadingMore, toogleLoadingMore] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sortingMethod, setSortingMethod] =
    useState<DocSortingMethods>('lastOpenedTime');
  const [currentItem, setCurrentItem] = useState<IDocDetail>();

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

  useUpdateEffect(() => {
    if (sortingMethod === 'title') {
      setList((prev) => [
        ...(prev?.length
          ? prev.sort((a, b) => a.title.localeCompare(b.title))
          : []),
      ]);
    } else {
      setList((prev) => [
        ...(prev?.length
          ? prev.sort((a, b) => a.update_time - b.update_time)
          : []),
      ]);
    }
  }, [sortingMethod]);

  useEffect(() => {
    if (inView) {
      loadMoreDocs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, morePage]);

  const toggleDeleteModal = useCallback((value: boolean) => {
    setShowDeleteModal(value);
  }, []);

  const memoSetCurrentItem = useCallback((value: IDocDetail) => {
    setCurrentItem(value);
  }, []);

  const memoSetSortingMethod = useCallback((value: DocSortingMethods) => {
    setSortingMethod(value);
  }, []);

  const deleteListItem = useCallback((id: string) => {
    setList((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return (
    <>
      <DeleteModal
        isActive={showDeleteModal}
        toogleActive={setShowDeleteModal}
        currentItem={currentItem!}
        deleteListItem={deleteListItem}
      />
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
      {viewType === 'grid' ? (
        <CardView
          list={list}
          toggleDeleteModal={toggleDeleteModal}
          setCurrentItem={memoSetCurrentItem}
        />
      ) : (
        <ListView
          list={list}
          toggleDeleteModal={toggleDeleteModal}
          setCurrentItem={memoSetCurrentItem}
        />
      )}
      <Spacer y='10' />
      <div className='flex-center h-10 w-full' ref={ref}>
        {loadingMore ? (
          <Loader2 className='animate-spin text-primary-200' />
        ) : null}
      </div>
    </>
  );
};
export default memo(List);
