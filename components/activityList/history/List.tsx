'use client';
import { Button } from '@/components/ui/button';
import { PencilLineIcon } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import Card from './Card';
import { IActHistoryData, IActListResData } from '@/query/type';
import { formatTimestampToDateString } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useMutation } from '@tanstack/react-query';
import { clonectivityListItem, deleteActivityList } from '@/query/api';
import { useToast } from '@/components/ui/use-toast';
import clearCachesByServerAction from '@/lib/revalidate';
import { useRouter } from 'next/navigation';
import { useActListContext } from '@/context/ActListProvider';
import dynamic from 'next/dynamic';
const DeleteModal = dynamic(() => import('../DeleteModal'), { ssr: false });

type Props = {
  item: IActHistoryData;
};

const List = ({ item }: Props) => {
  const { setHistoryData, setGeneratedData } = useActListContext();
  const { toast } = useToast();
  const router = useRouter();
  const { mutateAsync: removeItem } = useMutation({
    mutationFn: (id: string) => deleteActivityList(id),
    onSuccess() {
      toast({
        description: 'Delete activity list successfully',
        variant: 'default',
      });
      toogleDeleteModal();
      clearCachesByServerAction('/writtingpal/activityList/history');
    },
    onError(error) {
      toast({
        description: error.message,
        variant: 'destructive',
      });
    },
  });
  const [showDelete, setShowDelete] = useState(false);

  const toogleDeleteModal = useCallback(() => {
    setShowDelete((prev) => !prev);
  }, []);

  const { mutateAsync: cloneItem } = useMutation({
    mutationFn: (id: string) => clonectivityListItem(id),
    onSuccess() {
      toast({
        description: 'Duplicate activity successfully',
        variant: 'default',
      });
      setShowDelete(false);
      clearCachesByServerAction('/writtingpal/activityList/history');
    },
    onError(error) {
      toast({
        description: error.message,
        variant: 'destructive',
      });
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
    <div className='flex w-full shrink-0 flex-col gap-y-5 rounded-[10px] bg-white p-4'>
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
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='21'
                  viewBox='0 0 20 21'
                  fill='none'
                >
                  <path
                    d='M3.34632 8.84131C2.42551 8.84131 1.67969 9.58713 1.67969 10.5079C1.67969 11.4288 2.42551 12.1746 3.34632 12.1746C4.26714 12.1746 5.01295 11.4288 5.01295 10.5079C5.01295 9.58713 4.26714 8.84131 3.34632 8.84131ZM10.0129 8.84131C9.09204 8.84131 8.34622 9.58713 8.34622 10.5079C8.34622 11.4288 9.09204 12.1746 10.0129 12.1746C10.9337 12.1746 11.6795 11.4288 11.6795 10.5079C11.6795 9.58713 10.9337 8.84131 10.0129 8.84131ZM16.6794 8.84131C15.7586 8.84131 15.0128 9.58713 15.0128 10.5079C15.0128 11.4288 15.7586 12.1746 16.6794 12.1746C17.6002 12.1746 18.346 11.4288 18.346 10.5079C18.346 9.58713 17.6002 8.84131 16.6794 8.84131Z'
                    fill='#1D1B1E'
                  />
                </svg>
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
