'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog';
import { useMutateTrackInfo, useUserTrackInfo } from '@/query/query';
import useUpdateEffect from 'beautiful-react-hooks/useUpdateEffect';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DiscountModal = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { data: track } = useUserTrackInfo();
  const { mutateAsync: updateTrack } = useMutateTrackInfo();
  useUpdateEffect(() => {
    if (track?.has_referral_code && !track.show_referral_dialog) {
      setOpen(true);
    }
  }, [track]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
        className='rounded-md shadow-md md:w-[540px]'
      >
        <DialogHeader>
          <h2 className='text-xl font-medium leading-7 text-zinc-600'>
            Welcome to ProDream
          </h2>
          <p className='text-base font-normal leading-7 text-zinc-600'>
            Enjoy a 20% referral discount on your first purchase.
          </p>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={async () => {
                await updateTrack({
                  field: 'show_referral_dialog',
                  data: 'true',
                });
              }}
              role='button'
              variant={'ghost'}
              className='border border-neutral-400 text-zinc-400'
            >
              Cancle
            </Button>
          </DialogClose>

          <Button
            role='button'
            onClick={async () => {
              router.push('/pricing');
              await updateTrack({
                field: 'show_referral_dialog',
                data: 'true',
              });
              setOpen(false);
            }}
          >
            Upgrade Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DiscountModal;
