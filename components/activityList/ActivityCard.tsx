import { Copy, Pen, PenLine, Trash2 } from 'lucide-react';
import React from 'react';
import Tooltip from '../root/Tooltip';

type Props = {};

const ActivityCard = (props: Props) => {
  return (
    <div className='flex shrink-0 flex-col gap-y-2 rounded-[10px] border border-shadow-border px-4 py-3'>
      <h1 className='base-semibold'>
        Activity 1: Team Leader in Volunteer Trip
      </h1>
      <p className='base-regular text-black-50'>
        A comfortable dress made of yarn that has a cotton surface and an airy
        polyester core. Cotton provides a durable yet lightweight feel and is
        machine washable.
      </p>
      <div className='flex-between'>
        <p className='subtle-regular self-end text-shadow'>(82 characters)</p>
        <div className='flex items-center gap-x-2'>
          <div className='cursor-pointer rounded-md border-2 border-shadow-200 bg-white p-2.5 hover:bg-nav-selected'>
            <Tooltip tooltipContent='Delete'>
              <Trash2 size={20} />
            </Tooltip>
          </div>
          <div className='cursor-pointer rounded-md border-2 border-shadow-200 bg-white p-2.5 hover:bg-nav-selected '>
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
