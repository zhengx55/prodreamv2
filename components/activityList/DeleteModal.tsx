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

type Props = {
  isActive: boolean;
  toogleActive: () => void;
  removeCallback: (id: string) => Promise<void>;
  deleteId: string;
};

const DeleteModal = ({
  isActive,
  toogleActive,
  removeCallback,
  deleteId,
}: Props) => {
  return (
    <Dialog open={isActive} onOpenChange={toogleActive}>
      <DialogContent
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
        className='md:w-[500px] md:gap-y-0 md:rounded-lg md:p-2 md:px-4'
      >
        <DialogHeader>
          <DialogTitle className='flex justify-end p-0'>
            <DialogClose>
              <X className='self-end text-shadow' />
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
        <div className='flex flex-col'>
          <h1 className='title-semibold mt-2 text-center'>
            Are you sure you want to delete?
          </h1>
          <p className='small-regular mt-2 text-center text-shadow-100'>
            This history will be deleted permanently from for account.
          </p>
          <div className='mb-8 mt-6 flex items-center justify-center gap-x-2'>
            <DialogClose asChild>
              <Button variant={'ghost'} className='w-1/2 text-primary-200'>
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={() => removeCallback(deleteId)} className='w-1/2'>
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
