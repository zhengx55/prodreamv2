'use client';
import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogContent } from '@/components/ui/dialog';
import { deleteDoc } from '@/query/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Props = {
  id: string;
  title: string;
};

const DeleteModal = ({ id, title }: Props) => {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteDocument } = useMutation({
    mutationFn: (doc_id: string) => deleteDoc(doc_id),
    onSuccess: async () => {
      const { toast } = await import('sonner');
      toast.success('Document deleted successfully');
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
        e.preventDefault();
      }}
      className='px-8 py-4 md:w-[640px] md:rounded-md'
    >
      <div className='flex flex-col gap-y-2'>
        <h1 className='h3-bold'>Move to trash?</h1>
        <p className='title-regular text-shadow-100'>
          Are you sure you want to delete &quot;
          {title !== 'Untitled' ? title : 'Untitled Document'}
          &quot;? Note: This action cannot be undone.
        </p>
        <Spacer y='20' />
        <div className='flex items-center justify-end gap-x-2'>
          <DialogClose asChild>
            <Button
              onClick={(e) => e.stopPropagation()}
              variant={'outline'}
              className='w-max'
            >
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleDelete} className='w-max'>
              Delete document
            </Button>
          </DialogClose>
        </div>
      </div>
    </DialogContent>
  );
};

export default DeleteModal;
