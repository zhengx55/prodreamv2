import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { createDoc } from '@/query/api';
import { DocPageDicType } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { FileText, Loader2, XCircle } from 'lucide-react';
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
      className='md:w-[544px] md:gap-y-3 md:rounded-lg md:p-4'
    >
      <DialogHeader>
        <DialogTitle className='title-medium flex-between text-zinc-700'>
          Upload Essay
          <DialogClose>
            <XCircle size={20} className='text-neutral-400' />
          </DialogClose>
        </DialogTitle>
      </DialogHeader>
      <div className='text-base font-normal text-neutral-400'>
        Upload a file to receive intelligent summaries andanswers to your
        questions.
      </div>
      <div
        {...getRootProps({
          'aria-label': 'drag and drop area',
        })}
        className={`${isDragActive && 'bg-zinc-100'} ${
          isUploading && 'pointer-events-none'
        } flex-center relative flex h-[180px] cursor-pointer flex-col gap-y-2 rounded-lg border-2 border-dashed border-stone-300 p-4 hover:bg-zinc-100`}
      >
        {isUploading && (
          <div className='flex-center absolute inset-0 cursor-not-allowed backdrop-blur-sm'>
            <Loader2 className='animate-spin text-violet-500' />
          </div>
        )}
        <input {...getInputProps()} />
        <FileText className='text-neutral-400' size={70} />

        <p className='text-xs font-normal text-neutral-400'>
          Click or drag and drop here to upload
        </p>
      </div>
    </DialogContent>
  );
};

export default memo(FileUploadModal);
