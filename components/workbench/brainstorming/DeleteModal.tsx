import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Info } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { memo } from 'react';
import { deleteMaterial } from './server_actions/actions';

type Props = { id: string };

const DeleteModal = ({ id }: Props) => {
  const { execute } = useAction(deleteMaterial, {
    onError: async () => {
      const { toast } = await import('sonner');
      toast.error('Failed to delete material');
    },
    onSuccess: async ({ data }) => {
      const { toast } = await import('sonner');
      toast.success(data?.message);
    },
  });

  return (
    <AlertDialogContent className='bg-white md:w-[400px] md:p-4'>
      <AlertDialogHeader>
        <AlertDialogTitle className='inline-flex items-center gap-x-2 text-xl font-medium'>
          <Info size={20} className='text-red-500' /> Delete Material
        </AlertDialogTitle>
        <AlertDialogDescription className='base-regular text-neutral-400'>
          Are you sure to delete? This action cannot be undone
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={() => {
            execute({ material_id: id });
          }}
        >
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default memo(DeleteModal);
