import { Copy, PenLine, Trash2 } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import Tooltip from '../root/Tooltip';
import { ActData } from '@/query/type';
import { useMutation } from '@tanstack/react-query';
import { deleteActivityListItem } from '@/query/api';
import { useToast } from '../ui/use-toast';
import clearCachesByServerAction from '@/lib/revalidate';
import EditCard from './EditCard';
import { useActListContext } from '@/context/ActListProvider';
import DeleteModal from './DeleteModal';

type Props = {
  dataType: 'generated' | 'history';
  type: string;
  data: ActData;
  index: number;
};

const ActivityCard = ({ dataType, type, data, index }: Props) => {
  const { toast } = useToast();
  const [editMode, setEditMode] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const toogleDeleteModal = useCallback(() => {
    setShowDelete((prev) => !prev);
  }, []);
  const { handleDelete } = useActListContext();
  const handleEdit = async () => {
    setEditMode(true);
  };

  const closeEditMode = useCallback(() => {
    setEditMode(false);
  }, []);

  const { mutateAsync: removeItem } = useMutation({
    mutationFn: (id: string) => deleteActivityListItem(id),
    onSuccess() {
      toast({
        description: 'Delete activity successfully',
        variant: 'default',
      });
      setShowDelete(false);
      handleDelete(data.id, type, dataType);
      clearCachesByServerAction('/writtingpal/activityList/history');
    },
    onError(error) {
      toast({
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const removeCallback = useCallback(async (id: string) => {
    await removeItem(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {!editMode ? (
        <div className='flex shrink-0 flex-col gap-y-2 rounded-[10px] border border-shadow-border px-4 py-3'>
          {showDelete && (
            <DeleteModal
              deleteId={data.id}
              isActive={showDelete}
              toogleActive={toogleDeleteModal}
              removeCallback={removeCallback}
            />
          )}
          <h1 className='base-semibold'>
            Activity {index}: {data.title}
          </h1>
          <p className='base-regular line-clamp-3 text-black-50'>
            {data.result ? data.result : data.text}
          </p>
          <div className='flex-between'>
            <p className='subtle-regular self-end text-shadow'>
              ({data.result ? data.result?.length : data.text?.length}&nbsp;
              characters)
            </p>
            <div className='flex items-center gap-x-2'>
              <div
                onClick={() => {
                  setShowDelete(true);
                }}
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
              <div
                onClick={() => {
                  navigator.clipboard.writeText(
                    data.result
                      ? (data.result as string)
                      : (data.text as string)
                  );
                  toast({
                    variant: 'default',
                    description: 'Copy to clipboard',
                  });
                }}
                className='cursor-pointer rounded-md border-2 border-shadow-200 bg-white p-2.5 hover:bg-nav-selected'
              >
                <Tooltip tooltipContent='Copy'>
                  <Copy size={20} />
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <EditCard
          dataType={dataType}
          close={closeEditMode}
          type={type}
          data={data}
          index={index}
        />
      )}
    </>
  );
};

export default ActivityCard;
