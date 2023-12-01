'use client';
import React, { useCallback } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { X } from 'lucide-react';
import Image from 'next/image';
import { FileRejection, useDropzone } from 'react-dropzone';
import { useToast } from '../ui/use-toast';

type Props = {
  isActive: boolean;
  toogleActive: () => void;
};

const FileUploadModal = ({ isActive, toogleActive }: Props) => {
  const { toast } = useToast();
  const onDrop = useCallback(
    (acceptedFile: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        const error_message = fileRejections[0].errors[0].message;
        toast({ description: error_message, variant: 'destructive' });
        return;
      }
      console.log(acceptedFile);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 1024 * 1024,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        ['.docx'],
    },
  });

  return (
    <Dialog open={isActive} onOpenChange={toogleActive}>
      <DialogContent
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
        className='md:w-[400px] md:gap-y-0 md:rounded-lg md:p-4'
      >
        <DialogHeader>
          <DialogTitle className='base-semibold flex-between'>
            Upload Essay
            <DialogClose>
              <X className='text-shadow' />
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
        <div
          {...getRootProps({
            'aria-label': 'drag and drop area',
          })}
          className={`${
            isDragActive && 'bg-primary-50'
          } mt-6 flex cursor-pointer flex-col items-center gap-y-2 rounded-lg border-2 border-dashed border-primary-200 p-4 hover:bg-primary-50`}
        >
          <input {...getInputProps()} />
          <Image alt='file-upload' src='/Essay.png' width={80} height={80} />
          <p className='small-semibold text-primary-200'>
            Click here to upload
          </p>
          <p className='subtle-regular text-shadow-100'>
            Or drag and drop here
          </p>
          <p className='small-regular'>Maximum file size: 1M</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FileUploadModal;
