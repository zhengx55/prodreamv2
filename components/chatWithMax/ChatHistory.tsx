import { Plus, X } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import { DialogClose } from '../ui/dialog';

type Props = {};

const ChatHistory = (props: Props) => {
  return (
    <div className='flex w-[30%] flex-col rounded-r-[20px] bg-shadow-200 p-3'>
      <div className='flex self-end'>
        <DialogClose asChild>
          <X className='cursor-pointer text-shadow-100 transition-transform hover:-translate-y-1' />
        </DialogClose>
      </div>

      <Button className='mt-auto'>
        <Plus /> New chat
      </Button>
    </div>
  );
};

export default ChatHistory;
