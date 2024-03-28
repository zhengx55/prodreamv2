'use client';
import { unSubscripeMembership } from '@/query/api';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

const UnsubscribeModal = ({
  children,
  subscription_id,
}: {
  children: ReactNode;
  subscription_id: string;
}) => {
  const router = useRouter();
  const { mutateAsync: unsubscribe } = useMutation({
    mutationFn: (params: { subscription_id: string }) =>
      unSubscripeMembership(params),
    onSuccess: async () => {
      router.refresh();
      const { toast } = await import('sonner');
      toast.success('Successfully unsubscribed');
    },
  });

  const handleUnsubscribe = async () => {
    if (!subscription_id) return;
    await unsubscribe({ subscription_id: subscription_id });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='bg-white md:w-[600px] md:rounded-lg'>
        <DialogTitle className='h3-semibold'>
          Are you sure you want to leave?
        </DialogTitle>
        <DialogDescription className='base-regular text-neutral-400'>
          You will lose benefits to unlimited AI generations, grammar check and
          originality checks. Reconsider to keep enhancing your writing
          effortlessly.
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              role='button'
              variant={'ghost'}
              className='h-max border border-violet-500 py-1.5'
              onClick={handleUnsubscribe}
            >
              Unsubscribe
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button role='button' className='h-max py-1.5'>
              Stay Subscribed
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default UnsubscribeModal;
