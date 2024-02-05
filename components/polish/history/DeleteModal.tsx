'use client';
import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogContent } from '@/components/ui/dialog';
import { deleteDoc } from '@/query/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

type Props = {
  id: string;
  title: string;
};

const DeleteModal = ({ id, title }: Props) => {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteDocument } = useMutation({
    mutationFn: (doc_id: string) => deleteDoc(doc_id),
    onSuccess: () => {
      toast.success('Document deleted successfully');
      queryClient.invalidateQueries({
        queryKey: ['document_history_list'],
      });
    },
    onError: (error) => {
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
              variant={'ghost'}
              className='w-max border border-primary-200 text-primary-200'
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
