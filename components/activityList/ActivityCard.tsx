import { Copy, PenLine, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import Tooltip from '../root/Tooltip';
import { ActData } from '@/query/type';

type Props = { data: ActData; index: number };

const ActivityCard = ({ data, index }: Props) => {
  const [editMode, setEditMode] = useState(false);
  const handleEdit = async () => {};
  return (
    <div className='flex shrink-0 flex-col gap-y-2 rounded-[10px] border border-shadow-border px-4 py-3'>
      <h1 className='base-semibold'>
        Activity {index}: {data.title}
      </h1>
      <p className='base-regular line-clamp-3 text-black-50'>
        {data.result ? data.result : data.text}
      </p>
      <div className='flex-between'>
        <p className='subtle-regular self-end text-shadow'>
          ({data.result ? data.result?.length : data.text?.length} characters)
        </p>
        <div className='flex items-center gap-x-2'>
          <div className='cursor-pointer rounded-md border-2 border-shadow-200 bg-white p-2.5 hover:bg-nav-selected'>
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
  );
};

export default ActivityCard;
