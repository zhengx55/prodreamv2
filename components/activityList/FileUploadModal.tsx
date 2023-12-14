'use client';
import React, { memo, useCallback, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader2, Trash2, X } from 'lucide-react';
import Image from 'next/image';
import { FileRejection, useDropzone } from 'react-dropzone';
import { useToast } from '../ui/use-toast';
import Tooltip from '../root/Tooltip';
import { Button } from '../ui/button';
import { useMutation } from '@tanstack/react-query';
import { getDecodedData, uploadActivityFile } from '@/query/api';
import { useActListContext } from '@/context/ActListProvider';
import { useAppSelector } from '@/store/storehooks';
import { selectUsage } from '@/store/reducers/usageSlice';

type Props = {
  isActive: boolean;
  toogleActive: () => void;
  toggleDecoding: () => void;
  appendDecodeData: (value: string[]) => void;
};

const FileUploadModal = ({
  isActive,
  toogleActive,
  toggleDecoding,
  appendDecodeData,
}: Props) => {
  const { toast } = useToast();
  const { setShowGenerateTut } = useActListContext();
  const usage = useAppSelector(selectUsage);
  const [files, setFiles] = useState<File[]>([]);
  const [parsedUrls, setParsedUrls] = useState<string[]>([]);
  const { mutateAsync: decodeFilesAction } = useMutation({
    mutationFn: (params: { file_urls: string[] }) => getDecodedData(params),
    onMutate: () => {
      toggleDecoding();
      toogleActive();
    },
    onSuccess: (data) => {
      toggleDecoding();
      if (
        (Object.keys(usage).length > 0 && usage.first_activity_list_generate) ||
        usage.first_activity_list_generate === undefined
      ) {
        setShowGenerateTut(true);
      }
      appendDecodeData(data.extracurricular_activities);
    },
    onError: (e) => {
      toggleDecoding();
      toast({
        description: 'Opps something went wrong please try again!',
        variant: 'destructive',
      });
    },
  });
  const { mutateAsync: handleFileUpload } = useMutation({
    mutationFn: (params: { file: File }) => uploadActivityFile(params),
    onSuccess(data, variables, _context) {
      setFiles((prev) => [...prev, variables.file]);
      setParsedUrls((prev) => [...prev, data]);
    },
    onError: (e) => {
      toast({
        description: e.message,
        variant: 'destructive',
      });
    },
    onMutate: () => {},
  });
  const handleFileRemove = (index: number) => {
    setFiles((prev) => prev.filter((_el, idx) => idx !== index));
  };
  const onDrop = useCallback(
    async (acceptedFile: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        const error_message = fileRejections[0].errors[0].message;
        toast({ description: error_message, variant: 'destructive' });
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
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        ['.docx'],
    },
  });
  const handleDecodeFiles = async () => {
    await decodeFilesAction({ file_urls: parsedUrls });
  };

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
        {files.length > 0 ? (
          <div className='my-6 flex max-h-[184px] flex-col space-y-2 overflow-y-auto'>
            {files.map((file, index) => {
              return (
                <div className='flex-between' key={`file-${index}`}>
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
                        handleFileRemove(index);
                      }}
                      className='cursor-pointer rounded-md border-2 border-shadow-200 bg-white p-1 hover:bg-nav-selected'
                    >
                      <Tooltip tooltipContent='Delete'>
                        <Trash2 size={18} />
                      </Tooltip>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
        {files.length > 0 ? (
          <Button onClick={handleDecodeFiles}>Submit</Button>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default memo(FileUploadModal);
