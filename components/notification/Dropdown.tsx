import { memo } from 'react';
import Spacer from '../root/Spacer';
import { Button } from '../ui/button';
import { DropdownMenuContent } from '../ui/dropdown-menu';

type Props = {};
const Dropdown = (props: Props) => {
  return (
    <DropdownMenuContent
      className='flex flex-col rounded border border-gray-200 bg-white shadow-lg md:w-[435px]'
      side='bottom'
      align='start'
    >
      <div className='flex-between px-2 py-1.5'>
        <h2 className='base-semibold'>Notifications</h2>
        <Button
          role='button'
          className='size-max p-0 text-base text-indigo-500'
          variant={'text'}
        >
          Mark all as read
        </Button>
      </div>
      <div className='flex flex-col border-t border-gray-200 px-3 py-4'>
        <h3 className='base-regular text-zinc-700'>
          Your dream is now professionally supported
        </h3>
        <Spacer y='6' />
        <article className='text-xs font-normal text-zinc-500'>
          Exciting news, we met a fortune teller who said changing our name
          could help our users get into their dream schools. So, we switched
          from &quot;QuickApply&quot; to &quot;ProDream&quot;! Just kidding
        </article>
        <Spacer y='24' />
        <div className='flex-between'>
          <div className='flex items-center gap-x-2'>
            <span className='h-5 w-5 rounded-full bg-zinc-300' />
            <p className='text-xs font-normal text-zinc-700'>ProDream</p>
          </div>
          <p className='text-xs font-normal text-zinc-700'>7 hr.ago</p>
        </div>
      </div>
    </DropdownMenuContent>
  );
};
export default memo(Dropdown);
