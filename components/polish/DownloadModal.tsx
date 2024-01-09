'use client';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { memo } from 'react';
import { Download } from '../root/SvgComponents';
const DownloadModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className='tool'>
          <Download />
          <p>Download</p>
        </button>
      </DialogTrigger>
      <DialogContent
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
        className='md:w-[400px] md:gap-y-0 md:rounded-lg md:p-4'
      >
        <DialogHeader>
          <DialogTitle className='base-semibold flex-between'>
            Download File
            <DialogClose>
              <X className='text-shadow' />
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default memo(DownloadModal);
