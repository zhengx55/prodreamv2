'use client';
import Spacer from '@/components/root/Spacer';
import { IDocDetail } from '@/query/type';
import { ArrowUpNarrowWide, LayoutGrid } from 'lucide-react';
import { memo, useCallback, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Card from './Card';
import DeleteModal from './DeleteModal';

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
        <div className='flex gap-x-4'>
          <LayoutGrid className='cursor-pointer hover:opacity-50' />
          <ArrowUpNarrowWide className='cursor-pointer hover:opacity-50' />
        </div>
      </div>
      <Spacer y='24' />
      <ul
        role='list'
        className='grid w-full grid-flow-row grid-cols-6 gap-4 px-6 2xl:grid-cols-7'
      >
        {list.map((item) => (
          <Card
            toggleDeleteModal={toggleDeleteModal}
            item={item}
            key={item.id}
            setCurrentItem={memoSetCurrentItem}
          />
        ))}
      </ul>
    </>
  );
};
export default memo(List);
