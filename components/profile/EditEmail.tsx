'use client';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { memo } from 'react';
import { Input } from '../ui/input';

type Props = {
  isActive: boolean;
  toogleActive: () => void;
};

const EditEmailModal = ({ isActive, toogleActive }: Props) => {
  return (
    <Dialog open={isActive} onOpenChange={toogleActive}>
      <DialogContent
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
        className='md:w-[500px] md:gap-y-0 md:rounded-lg md:p-2 md:px-4'
      >
        <DialogHeader>
          <DialogTitle className='flex-between p-0'>
            <h1 className='h2-bold mt-2 text-center'>Change Email </h1>
            <DialogClose>
              <X className='self-end text-shadow' />
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
        <div className='flex flex-col'>
          <Input
            type='email'
            name='firstname'
            placeholder='Enter your new email'
            className='mt-6 py-6'
          />
          <Input
            type='password'
            placeholder='Enter your password'
            name='lastname'
            className='mt-4 py-6'
          />
          <div className='mb-8 mt-6 flex items-center justify-end gap-x-2'>
            <DialogClose asChild>
              <Button variant={'ghost'} className=' text-primary-200'>
                Cancel
              </Button>
            </DialogClose>
            <Button>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default memo(EditEmailModal);
