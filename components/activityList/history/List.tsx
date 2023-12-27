'use client';
import { Button } from '@/components/ui/button';
import clearCachesByServerAction from '@/lib/revalidate';
import { formatTimestampToDateString } from '@/lib/utils';
import { deleteActivityList } from '@/query/api';
import { IActHistoryData, IActListResData } from '@/query/type';
import useRootStore from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { PencilLineIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import Card from './Card';
const DeleteModal = dynamic(() => import('../DeleteModal'), { ssr: false });
const HistoryDropDown = dynamic(() => import('./HistoryDropDown'), {
  ssr: false,
});
type Props = {
  item: IActHistoryData;
};

const List = ({ item }: Props) => {
  const setGeneratedData = useRootStore((state) => state.setalGeneratedData);
  const setHistoryData = useRootStore((state) => state.setalHistoryData);
  const router = useRouter();
  const { mutateAsync: removeItem } = useMutation({
    mutationFn: (id: string) => deleteActivityList(id),
    onSuccess() {
      toast.success('Delete activity list successfully');
      toogleDeleteModal();
      clearCachesByServerAction('/writtingpal/activityList/history');
    },
    onError(error) {
      toast.error(error.message);
    },
  });
  const [showDelete, setShowDelete] = useState(false);

  const toogleDeleteModal = useCallback(() => {
    setShowDelete((prev) => !prev);
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    await removeItem(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = () => {
    const { type, id, activities } = item;
    const actListData: IActListResData = {
      [type]: {
        activities,
        id,
      },
    };
    setGeneratedData({});
    setHistoryData(actListData);
    router.push('/writtingpal/activityList/');
  };

  return (
    <div className='flex w-full shrink-0 flex-col gap-y-2 rounded-[10px] bg-white p-3'>
      <DeleteModal
        deleteId={item.id}
        isActive={showDelete}
        toogleActive={toogleDeleteModal}
        removeCallback={handleDelete}
      />

      <div className='flex-between'>
        <div className='flex items-center gap-x-2'>
          <h1 className='title-semibold'>
            {item.type === 150
              ? 'UC'
              : item.type === 350
                ? 'Common App'
                : `${item.type} Characters Limit`}
          </h1>
          <p className='small-regular text-shadow'>
            {formatTimestampToDateString(item.create_time)}
          </p>
        </div>
        <div className='flex items-center gap-x-2'>
          <Button
            onClick={handleEdit}
            variant={'ghost'}
            className='border border-shadow-border'
          >
            <PencilLineIcon size={20} />
            View and Edit
          </Button>
          <HistoryDropDown toggleDelete={toogleDeleteModal} item={item} />
        </div>
      </div>
      <div className='flex flex-wrap gap-4'>
        {item.activities.map((item, index) => {
          return <Card item={item} index={index + 1} key={item.id} />;
        })}
      </div>
    </div>
  );
};

export default List;
