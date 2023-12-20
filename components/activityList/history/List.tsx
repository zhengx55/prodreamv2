'use client';
import { ThreeDots } from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useActListContext } from '@/context/ActListProvider';
import clearCachesByServerAction from '@/lib/revalidate';
import { formatTimestampToDateString } from '@/lib/utils';
import { clonectivityListItem, deleteActivityList } from '@/query/api';
import { IActHistoryData, IActListResData } from '@/query/type';
import { useMutation } from '@tanstack/react-query';
import { PencilLineIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import Card from './Card';
const DeleteModal = dynamic(() => import('../DeleteModal'), { ssr: false });

type Props = {
  item: IActHistoryData;
};

const List = ({ item }: Props) => {
  const { setHistoryData, setGeneratedData } = useActListContext();

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

  const { mutateAsync: cloneItem } = useMutation({
    mutationFn: (id: string) => clonectivityListItem(id),
    onSuccess() {
      toast.success('Duplicate activity successfully');
      setShowDelete(false);
      clearCachesByServerAction('/writtingpal/activityList/history');
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const handleDelete = useCallback(async (id: string) => {
    await removeItem(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClone = async (id: string) => {
    await cloneItem(id);
  };

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={'ghost'}
                className='border border-shadow-border p-2'
              >
                <ThreeDots />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side='bottom'
              align='end'
              sideOffset={5}
              className='bg-white'
            >
              <DropdownMenuItem
                onClick={() => {
                  handleClone(item.id);
                }}
                className='cursor-pointer hover:bg-shadow-50'
              >
                Duplicate list
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setShowDelete(true);
                }}
                className='cursor-pointer hover:bg-shadow-50'
              >
                Delete list
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
