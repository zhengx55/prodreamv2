import { DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';
import { memo } from 'react';
import { MAX_AVATAR } from '../root/SvgComponents';
import { Button } from '../ui/button';

const ChatTrigger = () => {
  return (
    <div className='ml-[2.5%] mt-8 flex w-[95%] flex-col justify-between gap-y-4'>
      <div className='flex items-center gap-x-2'>
        <div className='flex-center h-11 w-11 cursor-pointer rounded-[47px] rounded-bl-none bg-chat'>
          <Image
            alt='max'
            src='/max.png'
            className='h-auto w-5'
            width={0}
            height={0}
          />
        </div>
        <h2 className='text-regular font-semibold'>Hi! I&apos;m Max</h2>
      </div>

      <DialogTrigger asChild>
        <Button
          variant={'outline'}
          size={'sm'}
          className='subtle-medium h-7 gap-x-1 rounded-[5px] border-primary-200 text-primary-200 hover:-translate-y-1 hover:transition-transform'
        >
          <MAX_AVATAR />
          Let&apos;s Chat
        </Button>
      </DialogTrigger>
    </div>
  );
};

export default memo(ChatTrigger);
