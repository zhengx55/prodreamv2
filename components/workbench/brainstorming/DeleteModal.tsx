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

type Props = {};

const DeleteModal = (props: Props) => {
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
        <AlertDialogAction>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteModal;
