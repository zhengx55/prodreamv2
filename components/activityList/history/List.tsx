import { Button } from '@/components/ui/button';
import { Dot, PencilLineIcon } from 'lucide-react';
import React from 'react';

type Props = {};

const List = (props: Props) => {
  return (
    <div className='flex w-full shrink-0 flex-col rounded-[10px] bg-white p-4'>
      <div className='flex-between'>
        <div className='flex items-center gap-x-2'>
          <h1 className='title-semibold'>UC</h1>
          <p className='small-regular text-shadow'>Nov 1</p>
        </div>
        <div className='flex items-center gap-x-2'>
          <Button variant={'ghost'} className='border border-shadow-border'>
            <PencilLineIcon size={20} />
            View and Edit
          </Button>
          <Button variant={'ghost'} className='border border-shadow-border p-2'>
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
        </div>
      </div>
    </div>
  );
};

export default List;
