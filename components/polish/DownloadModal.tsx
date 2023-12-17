'use client';
import React, { memo } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { toast } from 'sonner';
const DownloadModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className='tool'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='25'
            height='24'
            viewBox='0 0 25 24'
            fill='none'
          >
            <path
              d='M12.9138 2.01416C12.3618 2.01416 11.9138 2.46216 11.9138 3.01416V12.0142H8.91382L12.9138 16.0141L16.9138 12.0142H13.9138V3.01416C13.9138 2.46216 13.4658 2.01416 12.9138 2.01416ZM7.91382 5.01416C5.70482 5.01416 3.91382 6.80516 3.91382 9.01415V17.0141C3.91382 19.2231 5.70482 21.0141 7.91382 21.0141H17.9138C20.1228 21.0141 21.9138 19.2231 21.9138 17.0141V9.01415C21.9138 6.80516 20.1228 5.01416 17.9138 5.01416C17.3618 5.01416 16.9138 5.46216 16.9138 6.01416C16.9138 6.56616 17.3618 7.01416 17.9138 7.01416C19.0188 7.01416 19.9138 7.90916 19.9138 9.01415V17.0141C19.9138 18.1191 19.0188 19.0141 17.9138 19.0141H7.91382C6.80882 19.0141 5.91382 18.1191 5.91382 17.0141V9.01415C5.91382 7.90916 6.80882 7.01416 7.91382 7.01416C8.46582 7.01416 8.91382 6.56616 8.91382 6.01416C8.91382 5.46216 8.46582 5.01416 7.91382 5.01416Z'
              fill='#1D1B1E'
            />
          </svg>
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
