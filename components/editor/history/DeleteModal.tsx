'use client';
import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogContent } from '@/components/ui/dialog';
import { deleteDoc } from '@/query/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { XCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { memo } from 'react';

type Props = {
  id: string;
  title: string;
};

const DeleteModal = ({ id, title }: Props) => {
  const queryClient = useQueryClient();
  const trans = useTranslations('Editor');
  const transSuccess = useTranslations('Success');

  const defaultTitle = trans('DeleteModal.Untitled_Document');

  const { mutateAsync: deleteDocument } = useMutation({
    mutationFn: (doc_id: string) => deleteDoc(doc_id),
    onSuccess: async () => {
      const { toast } = await import('sonner');
      const toastInfo = transSuccess('Document_deleted_successfully');
      toast.success(toastInfo);
      queryClient.invalidateQueries({
        queryKey: ['document_history_list'],
      });
      queryClient.invalidateQueries({
        queryKey: ['membership'],
      });
    },
    onError: async (error) => {
      const { toast } = await import('sonner');
      toast.error(error.message);
    },
  });
  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    await deleteDocument(id);
  };
  return (
    <DialogContent
      onPointerDownOutside={(e) => {
        e.stopPropagation();
      }}
      className='px-8 py-4 md:w-[640px] md:rounded-md'
    >
      <div className='flex flex-col gap-y-2'>
        <div className='flex-between'>
          <h1 className='h3-bold'>{trans('DeleteModal.Move_to_trash')}</h1>
          <DialogClose>
            <XCircle size={20} className=' text-neutral-400' />
          </DialogClose>
        </div>
        <p className='title-regular text-shadow-100'>
          {trans('DeleteModal.Are_you_sure_you_want_to_delete_this_document', {
            documentTitle: title !== 'Untitled' ? title : defaultTitle,
          })}
        </p>
        <Spacer y='20' />
        <div className='flex items-center justify-end gap-x-2'>
          <DialogClose asChild>
            <Button
              onClick={(e) => e.stopPropagation()}
              variant={'outline'}
              className='w-max'
            >
              {trans('DeleteModal.Cancel')}
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleDelete} className='w-max'>
              {trans('DeleteModal.Delete_document')}
            </Button>
          </DialogClose>
        </div>
      </div>
    </DialogContent>
  );
};

export default memo(DeleteModal);
