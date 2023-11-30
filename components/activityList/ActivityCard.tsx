import { Copy, PenLine, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import Tooltip from '../root/Tooltip';
import { ActData } from '@/query/type';
import { useMutation } from '@tanstack/react-query';
import { deleteActivityListItem } from '@/query/api';
import { useToast } from '../ui/use-toast';
import clearCachesByServerAction from '@/lib/revalidate';
import { useAppDispatch } from '@/store/storehooks';
import { removeActListItem } from '@/store/reducers/activityListSlice';

type Props = { type: string; data: ActData; index: number };

const ActivityCard = ({ type, data, index }: Props) => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState(false);
  const handleEdit = async () => {
    setEditMode(true);
  };

  const { mutateAsync: removeItem } = useMutation({
    mutationFn: (id: string) => deleteActivityListItem(id),
    onSuccess() {
      toast({
        description: 'Delete activity successfully',
        variant: 'default',
      });
      dispatch(removeActListItem({ dataType: type, dataId: data.id }));
      clearCachesByServerAction('/writtingpal/activityList/history');
    },
    onError(error) {
      toast({
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleDelete = async (id: string) => {
    await removeItem(id);
  };
  return (
    <>
      {!editMode ? (
        <div className='flex shrink-0 flex-col gap-y-2 rounded-[10px] border border-shadow-border px-4 py-3'>
          <h1 className='base-semibold'>
            Activity {index}: {data.title}
          </h1>
          <p className='base-regular line-clamp-3 text-black-50'>
            {data.result ? data.result : data.text}
          </p>
          <div className='flex-between'>
            <p className='subtle-regular self-end text-shadow'>
              ({data.result ? data.result?.length : data.text?.length}{' '}
              characters)
            </p>
            <div className='flex items-center gap-x-2'>
              <div
                onClick={() => handleDelete(data.id)}
                className='cursor-pointer rounded-md border-2 border-shadow-200 bg-white p-2.5 hover:bg-nav-selected'
              >
                <Tooltip tooltipContent='Delete'>
                  <Trash2 size={20} />
                </Tooltip>
              </div>
              <div
                onClick={handleEdit}
                className='cursor-pointer rounded-md border-2 border-shadow-200 bg-white p-2.5 hover:bg-nav-selected '
              >
                <Tooltip tooltipContent='Edit'>
                  <PenLine size={20} />
                </Tooltip>
              </div>
              <div className='cursor-pointer rounded-md border-2 border-shadow-200 bg-white p-2.5 hover:bg-nav-selected'>
                <Tooltip tooltipContent='Copy'>
                  <Copy size={20} />
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ActivityCard;
