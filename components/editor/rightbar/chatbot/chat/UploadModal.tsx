import { DialogClose, DialogHeader } from '@/components/ui/dialog';
import { createPdfChat } from '@/query/api';
import { EditorDictType } from '@/types';
import { useChatbot } from '@/zustand/store';
import * as Dialog from '@radix-ui/react-dialog';
import { useMutation } from '@tanstack/react-query';

import { FileText, Loader2, XCircle } from 'lucide-react';
import { memo, useCallback } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';

type Props = { container: any; t: EditorDictType };
const UploadModal = ({ container }: Props) => {
  const showUploadModal = useChatbot((state) => state.showUploadModal);
  const currentSession = useChatbot((state) => state.currentSession);
  const updateCurrentFile = useChatbot((state) => state.updateCurrentFile);
  const updateFileUploading = useChatbot((state) => state.updateFileUploading);
  const updateChatType = useChatbot((state) => state.updateChatType);
  const updateUploadModal = useChatbot((state) => state.updateUploadModal);
  const resetCurrentFile = useChatbot((state) => state.resetCurrentFile);

  const { mutateAsync: createPdf } = useMutation({
    mutationFn: (params: { file: File }) => createPdfChat(params),
    onMutate: () => {
      updateFileUploading(true);
      updateUploadModal(false);
    },
    onSettled: () => {
      updateFileUploading(false);
    },
    onSuccess: (data) => {
      updateCurrentFile(data);
    },
    onError: async (error) => {
      const { toast } = await import('sonner');
      toast.error('Failed to create PDF chat, please try again later.');
      resetCurrentFile();
    },
  });

  const onDrop = useCallback(
    async (acceptedFile: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        const { toast } = await import('sonner');
        const error_message = fileRejections[0].errors[0].message;
        toast.error(error_message);
        return;
      }
      await createPdf({ file: acceptedFile[0] });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 100 * 1024 * 1024, // 100MB
    accept: {
      'application/pdf': ['.pdf'],
      // 'application/msword': ['.doc'],
      // 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      //   ['.docx'],
    },
  });
  return (
    <Dialog.Root open={showUploadModal} onOpenChange={updateUploadModal}>
      <Dialog.Portal container={container}>
        <Dialog.Overlay className='absolute inset-0 bg-neutral-700/20' />
        <Dialog.Content className='absolute left-1/2 top-1/2 flex w-[332px] -translate-x-1/2 -translate-y-1/2 flex-col gap-y-3 rounded-lg bg-white p-4 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] focus-visible:outline-none'>
          <DialogHeader>
            <Dialog.Title className='flex-between text-sm font-medium text-zinc-700'>
              Upload Essay
              <DialogClose
                onClick={() => {
                  if (!currentSession) updateChatType(null);
                }}
              >
                <XCircle size={20} className='text-neutral-400' />
              </DialogClose>
            </Dialog.Title>
          </DialogHeader>
          <div className='text-xs font-normal text-neutral-400'>
            Upload a file to receive intelligent summaries and answers to your
            questions.
          </div>
          <div
            {...getRootProps({
              'aria-label': 'drag and drop area',
            })}
            className={`${isDragActive && 'bg-zinc-100'} ${
              0 && 'pointer-events-none'
            } flex-center relative flex h-[180px] cursor-pointer flex-col gap-y-2 rounded-lg border-2 border-dashed border-stone-300 p-4 hover:bg-zinc-100`}
          >
            {false && (
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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export default memo(UploadModal);
