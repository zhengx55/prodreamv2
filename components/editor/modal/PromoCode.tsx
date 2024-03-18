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
import { ReactNode, useState } from 'react';
type Props = { children: ReactNode };
const PromoCode = ({ children }: Props) => {
  const [open, setOpen] = useState(false);

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
          <h2 className='text-xl font-medium leading-7 text-zinc-600'>
            Promo Code
          </h2>
        </DialogHeader>
        <Input
          placeholder='enter your code...'
          id='promo-code'
          aria-label='promo-code'
        />
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
          <Button role='button'>Redeem</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default PromoCode;
