'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { getCoupon } from '@/query/api';
import { useMutateTrackInfo } from '@/query/query';
import { useMutation } from '@tanstack/react-query';
import { ReactNode, useRef, useState } from 'react';
type Props = { children: ReactNode };
const PromoCode = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const couponRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: updateTrack } = useMutateTrackInfo();
  const { mutateAsync: setCoupon } = useMutation({
    mutationFn: (coupon: string) => getCoupon(coupon),
    onMutate: () => {
      setSubmitting(true);
    },
    onSuccess: async (_data, variables) => {
      await updateTrack({ field: 'current_coupon_code', data: variables });
      const { toast } = await import('sonner');
      toast.success('Coupon successfully applied');
    },
    onError: () => {
      setError('Invalid Coupon Code');
    },
    onSettled: () => {
      setSubmitting(false);
    },
  });

  const redeem = async () => {
    if (!couponRef.current?.value) {
      setError('Coupon Code required');
      return;
    }
    await setCoupon(couponRef.current.value);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
        className='rounded-md shadow-md md:w-[540px]'
      >
        <DialogHeader>
          <h2
            aria-label='promo code'
            className='text-xl font-medium leading-7 text-zinc-600'
          >
            Promo Code
          </h2>
        </DialogHeader>
        <div className='flex flex-col gap-y-0.5'>
          <Input
            placeholder='enter your code...'
            id='promo-code'
            onChange={() => setError('')}
            ref={couponRef}
            type='text'
            className={`${error ? 'border-red-400 bg-red-100' : ''}`}
            aria-label='promo-code'
          />
          {error && (
            <p className='subtle-regular self-end text-red-400'>{error}</p>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              role='button'
              variant={'ghost'}
              className='border border-neutral-400 text-zinc-400'
            >
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={submitting} role='button' onClick={redeem}>
            Redeem
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default PromoCode;
