import Icon from '@/components/root/Icon';
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
import { useCreateOutline } from '@/query/outline/query';
import { Loader2, X } from 'lucide-react';
import { memo } from 'react';
type Props = {
  close: () => void;
  prompt: string;
  materials: string[];
};

const RegenerateModal = ({ close, prompt, materials }: Props) => {
  const { mutateAsync: create, isSubmitting } = useCreateOutline(close);
  const handleSubmit = async () => {
    await create({
      prompt_id: prompt,
      title: 'Untitled',
      material_ids: materials,
    });
    close();
  };
  return (
    <AlertDialogContent className='gap-y-6 bg-white md:w-[600px] md:p-8'>
      <AlertDialogHeader>
        <div className='flex-between'>
          <AlertDialogTitle className='inline-flex items-center gap-x-2 text-xl font-medium'>
            <Icon
              alt='regenerate_outline'
              src='/workbench/regenerate_outline_active.svg'
              width={20}
              height={20}
              className='size-5'
              priority
            />
            Regenerate Outline
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
          Regenerating will generate a newoutline,and historical drafts willbe
          saved by default
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className='px-8'>Cancel</AlertDialogCancel>
        <AlertDialogAction
          disabled={isSubmitting}
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {isSubmitting ? (
            <span className='inline-flex items-center gap-x-2'>
              <Loader2 className='animate-spin text-white' size={20} />
              Generating...
            </span>
          ) : (
            'Regenerate'
          )}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default memo(RegenerateModal);
