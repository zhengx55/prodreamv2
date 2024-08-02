import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Info, Loader2 } from 'lucide-react';
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
    <AlertDialogContent className='bg-white md:w-[400px] md:p-4'>
      <AlertDialogHeader>
        <AlertDialogTitle className='inline-flex items-center gap-x-2 text-xl font-medium'>
          <Info size={20} className='text-red-500' /> Delete Outline
        </AlertDialogTitle>
        <AlertDialogDescription className='base-regular text-neutral-400'>
          Are you sure to delete? This action cannot be undone
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel disabled={isExecuting}>Cancel</AlertDialogCancel>
        <AlertDialogAction
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
