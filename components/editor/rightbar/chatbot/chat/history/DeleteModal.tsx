import { Button } from '@/components/ui/button';
import { DialogHeader } from '@/components/ui/dialog';
import { EditorDictType } from '@/types';
import { useChatbot } from '@/zustand/store';
import * as Dialog from '@radix-ui/react-dialog';

import { memo } from 'react';
import { useDeleteSession } from '../../hooks/useHistory';

type Props = {
  container: any;
  t: EditorDictType;
};
const DeleteModal = ({ container }: Props) => {
  const { mutateAsync: deleteHistoryItem, isPending } = useDeleteSession();
  const show = useChatbot((state) => state.showDeleteModal);
  const setShow = useChatbot((state) => state.updateDeleteModal);
  const deleteSession = useChatbot((state) => state.deleteSession);
  const handleDelete = async () => {
    await deleteHistoryItem(deleteSession);
    setShow(false);
  };
  return (
    <Dialog.Root open={show} onOpenChange={setShow}>
      <Dialog.Portal container={container}>
        <Dialog.Overlay className='absolute inset-0 z-[999] bg-neutral-700/20' />
        <Dialog.Content className='absolute left-1/2 top-1/2 z-[999] flex w-[332px] -translate-x-1/2 -translate-y-1/2 flex-col gap-y-3 rounded-lg bg-white p-4 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] focus-visible:outline-none'>
          <DialogHeader>
            <Dialog.Title className='flex-between text-sm font-medium text-zinc-700'>
              Delete Conversation
            </Dialog.Title>
          </DialogHeader>
          <div className='text-xs font-normal text-neutral-400'>
            Are you sure you want to delete this conversation?
          </div>
          <div className=' flex justify-end gap-x-2'>
            <Dialog.Close asChild>
              <Button
                role='button'
                variant={'outline'}
                className='size-max px-2'
              >
                Cancel
              </Button>
            </Dialog.Close>
            <Button
              disabled={isPending}
              className='size-max bg-red-500 px-2 hover:bg-red-400 active:bg-red-400'
              role='button'
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export default memo(DeleteModal);
