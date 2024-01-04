'use client';
import Spacer from '@/components/root/Spacer';
import { ListView as ListViewIcon } from '@/components/root/SvgComponents';
import { IDocDetail } from '@/query/type';
import { ArrowUpNarrowWide, LayoutGrid } from 'lucide-react';
import { memo, useCallback, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import CardView from './CardView';
import DeleteModal from './DeleteModal';
import ListView from './ListView';

type Props = { history_list: IDocDetail[] };

const List = ({ history_list }: Props) => {
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const { ref, inView } = useInView();
  const [list, setList] = useState(history_list);
  const [page, setPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentItem, setCurrentItem] = useState<IDocDetail>();

  const toggleDeleteModal = useCallback((value: boolean) => {
    setShowDeleteModal(value);
  }, []);

  const memoSetCurrentItem = useCallback((value: IDocDetail) => {
    setCurrentItem(value);
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
      <div className='flex-between w-full px-6'>
        <h1 className='title-semibold'>My documents</h1>
        <div className='flex-between w-1/3'>
          {viewType === 'list' ? (
            <p className='title-regular'>Last opened </p>
          ) : (
            <span />
          )}
          <div className='flex gap-x-4'>
            {viewType === 'grid' ? (
              <ListViewIcon
                onClick={() => setViewType('list')}
                className='cursor-pointer hover:opacity-50'
              />
            ) : (
              <LayoutGrid
                onClick={() => setViewType('grid')}
                className='cursor-pointer hover:opacity-50'
              />
            )}
            <ArrowUpNarrowWide className='cursor-pointer hover:opacity-50' />
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
    </>
  );
};
export default memo(List);
