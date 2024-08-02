import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Info, Loader2, X } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { memo } from 'react';
import { deleteMaterial } from '../brainstorming/server_actions/actions';

type Props = { id: string; setShow: () => void };

const DeleteModal = ({ id, setShow }: Props) => {
  const { execute, isExecuting } = useAction(deleteMaterial, {
    onError: async () => {
      const { toast } = await import('sonner');
      toast.error('Failed to delete material');
    },
    onSuccess: async ({ data }) => {
      setShow();
      const { toast } = await import('sonner');
      toast.success(data?.message);
    },
  });

  return (
    <AlertDialogContent className='gap-y-6 bg-white md:w-[600px] md:p-8'>
      <AlertDialogHeader>
        <div className='flex-between'>
          <AlertDialogTitle className='inline-flex items-center gap-x-2 text-xl font-medium'>
            <Info size={20} className='text-red-500' /> Delete Outline
          </AlertDialogTitle>
          <AlertDialogCancel asChild>
            <Button
              variant={'icon'}
              className='size-max border-gray-200 p-1'
              role='button'
            >
              <X size={16} className='text-zinc-500' />
            </Button>
          </AlertDialogCancel>
        </div>
        <AlertDialogDescription className='text-base text-neutral-400'>
          The Outline cannot be retrieved after deletion. Are you sure you want
          to delete it
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className='px-8' disabled={isExecuting}>
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction
          className='bg-rose-500 px-8 hover:bg-rose-600 active:bg-rose-500'
          disabled={isExecuting}
          onClick={(e) => {
            e.preventDefault();
            execute({ material_id: id });
          }}
        >
          {isExecuting ? (
            <span className='inline-flex items-center gap-x-2'>
              <Loader2 className='animate-spin text-white' size={20} />
              Deleting...
            </span>
          ) : (
            'Confirm'
          )}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default memo(DeleteModal);
