'use client';
import React, { memo, useCallback, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Trash2, X } from 'lucide-react';
import Image from 'next/image';
import { FileRejection, useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import Tooltip from '../root/Tooltip';
import { Button } from '../ui/button';
import { useMutation } from '@tanstack/react-query';
import { uploadEssay } from '@/query/api';
import useAIEditorStore from '@/zustand/store';
const UploadModal = () => {
  const [file, setFile] = useState<File>();
  const [decodeData, setDecodeData] = useState<string>('');
  const updateHtml = useAIEditorStore((state) => state.updateEditor_html);

  const { mutateAsync: handleFileUpload } = useMutation({
    mutationFn: (params: { file: File }) => uploadEssay(params),
    onSuccess(data, variables, _context) {
      setDecodeData(data);
      setFile(variables.file);
    },
    onError: (e) => {
      toast.error('e.message');
    },
  });

  const handleFileRemove = () => {
    setFile(undefined);
  };

  const handleDecodeFiles = async () => {
    updateHtml(decodeData);
  };

  const onDrop = useCallback(
    async (acceptedFile: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        const error_message = fileRejections[0].errors[0].message;
        toast.error(error_message);
        return;
      }
      await handleFileUpload({ file: acceptedFile[0] });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 1024 * 1024,
    maxFiles: 1,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        ['.docx'],
    },
  });
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
              d='M12.4517 21.9858C13.0037 21.9858 13.4517 21.5378 13.4517 20.9858L13.4517 11.9858L16.4517 11.9858L12.4517 7.98585L8.45166 11.9858L11.4517 11.9858L11.4517 20.9858C11.4517 21.5378 11.8997 21.9858 12.4517 21.9858ZM17.4517 18.9858C19.6607 18.9858 21.4517 17.1948 21.4517 14.9858L21.4517 6.98585C21.4517 4.77685 19.6607 2.98585 17.4517 2.98585L7.45166 2.98585C5.24266 2.98585 3.45166 4.77685 3.45166 6.98585L3.45166 14.9858C3.45166 17.1948 5.24266 18.9858 7.45166 18.9858C8.00366 18.9858 8.45166 18.5378 8.45166 17.9858C8.45166 17.4338 8.00366 16.9858 7.45166 16.9858C6.34666 16.9858 5.45166 16.0908 5.45166 14.9858L5.45166 6.98585C5.45166 5.88085 6.34666 4.98585 7.45166 4.98585L17.4517 4.98585C18.5567 4.98585 19.4517 5.88085 19.4517 6.98585L19.4517 14.9858C19.4517 16.0908 18.5567 16.9858 17.4517 16.9858C16.8997 16.9858 16.4517 17.4338 16.4517 17.9858C16.4517 18.5378 16.8997 18.9858 17.4517 18.9858Z'
              fill='#1D1B1E'
            />
          </svg>
          <p>Upload</p>
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
            Upload File
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
        {file ? (
          <div className='my-6 flex max-h-[184px] flex-col space-y-2 overflow-y-auto'>
            <div className='flex-between'>
              <div className='flex items-center gap-x-2'>
                <div className='flex-center relative h-10 w-10 rounded-[4px] bg-primary-200/30'>
                  <Image src='/file.svg' alt='file' fill />
                </div>
                <p className='subtle-regular'>{file.name}</p>
              </div>
              <div className='flex items-center gap-x-4'>
                <p className='subtle-regular text-shadow-100'>
                  {(file.size / 1024).toFixed(2)} kb
                </p>
                <div
                  onClick={() => {
                    handleFileRemove();
                  }}
                  className='cursor-pointer rounded-md border-2 border-shadow-200 bg-white p-1 hover:bg-nav-selected'
                >
                  <Tooltip tooltipContent='Delete'>
                    <Trash2 size={18} />
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {file ? (
          <DialogClose asChild>
            <Button onClick={handleDecodeFiles}>Submit</Button>
          </DialogClose>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default memo(UploadModal);
