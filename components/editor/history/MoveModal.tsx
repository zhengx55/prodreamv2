'use client';
import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog';
import { IDocDetail } from '@/query/type';
import { memo } from 'react';

type Props = {
  isActive: boolean;
  toogleActive: (value: boolean) => void;
  currentItem: IDocDetail;
};

const MoveModal = ({ currentItem, isActive, toogleActive }: Props) => {
  return (
    <Dialog open={isActive} onOpenChange={toogleActive}>
      <DialogContent
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
        className='px-8 py-4 md:w-[640px] md:rounded-md'
      >
        <div className='flex flex-col gap-y-2'>
          <h1 className='h3-bold'>Move“{currentItem?.title}”</h1>
          <p className='title-regular'>My documents</p>
          <Spacer y='20' />
          <div className='flex items-center justify-end gap-x-2'>
            <DialogClose asChild>
              <Button
                variant={'ghost'}
                className='w-max border border-violet-500 text-violet-500'
              >
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button className='w-max'>Move</Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default memo(MoveModal);
