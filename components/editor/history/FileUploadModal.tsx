import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { createDoc } from '@/query/api';
import { DocPageDicType } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { Loader2, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { memo, useCallback } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
type Props = DocPageDicType;

const FileUploadModal = ({ lang, t }: Props) => {
  const router = useRouter();

  const { mutateAsync: createNew, isPending: isUploading } = useMutation({
    mutationFn: (params: { file?: File }) =>
      createDoc(undefined, undefined, params.file),
    onSuccess: (data) => {
      router.push(`/${lang}/editor/${data}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onDrop = useCallback(
    async (acceptedFile: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        const error_message = fileRejections[0].errors[0].message;
        toast.error(error_message);
        return;
      }
      await createNew({ file: acceptedFile[0] });
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
        className={`${isDragActive && 'bg-violet-500'} ${
          isUploading && 'pointer-events-none'
        } relative mt-6 flex cursor-pointer flex-col items-center gap-y-2 rounded-lg border-2 border-dashed border-violet-500 p-4 hover:bg-violet-500`}
      >
        {isUploading && (
          <div className='flex-center absolute inset-0 cursor-not-allowed backdrop-blur-sm'>
            <Loader2 className='animate-spin text-violet-500' />
          </div>
        )}
        <input {...getInputProps()} />
        <Image
          alt='file-upload'
          src='/editor/Essay.png'
          width={80}
          height={80}
        />
        <p className='small-semibold text-violet-500'>Click here to upload</p>
        <p className='subtle-regular text-shadow-100'>Or drag and drop here</p>
        <p className='small-regular'>Maximum file size: 1M</p>
      </div>
    </DialogContent>
  );
};

export default memo(FileUploadModal);
