'use client';
import { unSubscripeMembership } from '@/query/api';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
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
  const trans = useTranslations('Profile');
  const { mutateAsync: unsubscribe } = useMutation({
    mutationFn: (params: { subscription_id: string }) =>
      unSubscripeMembership(params),
    onSuccess: async () => {
      router.refresh();
      const { toast } = await import('sonner');
      const toastInfo = tSuccess('UnsubscribeModal.Successfully_unsubscribed');
      toast.success(toastInfo);
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
          {trans('UnsubscribeModal.Are_you_sure_you_want_to_leave')}
        </DialogTitle>
        <DialogDescription className='base-regular text-neutral-400'>
          {trans(
            'UnsubscribeModal.You_will_lose_benefits_to_unlimited_AI_generations_grammar_check_and_originality_checks_Reconsider_to_keep_enhancing_your_writing_effortlessly'
          )}
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              role='button'
              variant={'ghost'}
              className='h-max border border-violet-500 py-1.5'
              onClick={handleUnsubscribe}
            >
              {trans('UnsubscribeModal.Unsubscribe')}
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button role='button' className='h-max py-1.5'>
              {trans('UnsubscribeModal.Stay_Subscribed')}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default UnsubscribeModal;
