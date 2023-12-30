'use client';
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog';
import { updateUserInfo } from '@/query/api';
import { IUsage } from '@/types';
import { useUsage, useUserInfo } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import Spacer from '../root/Spacer';
import { Upload } from '../root/SvgComponents';
import { Button } from '../ui/button';

const OnboardModal = () => {
  const updateUsageItem = useUsage((state) => state.updateSingleUsage);
  const usage = useUsage((state) => state.usage);
  const email = useUserInfo((state) => state.user.email);
  const { mutateAsync: updateUsage } = useMutation({
    mutationFn: (args: { email: string; params: IUsage }) =>
      updateUserInfo(args.email, args.params),
    onSuccess: () => {
      updateUsageItem('first_brainstorm');
    },
  });
  const handleUpdateUsage = async () => {
    await updateUsage({
      email,
      params: { ...usage, first_brainstorm: false },
    });
  };
  return (
    <Dialog defaultOpen>
      <DialogContent
        maskclass='backdrop-blur-none bg-black-400/50'
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
        className='md:w-[640px] md:gap-y-0 md:rounded-lg md:p-0'
      >
        <div className='relative flex h-96 w-full overflow-hidden rounded-t-lg bg-primary-600'>
          <DialogClose onClick={handleUpdateUsage}>
            <span className='absolute right-3 top-2 z-10 h-6 w-6 cursor-pointer bg-transparent' />
          </DialogClose>

          <Image
            alt='onboard-brainstorm'
            src={'/onboards/brainstorm.png'}
            fill
            priority
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>
        <Spacer y='32' />
        <div className='flex gap-x-2 px-6'>
          <Upload />
          <div className='flex flex-col gap-y-4'>
            <h2 className='h3-semibold'>
              Introducing Brainstorm, your easiest way to turn ideas into essay
              drafts!
            </h2>
            <p className='small-regular'>
              Start with an idea, input draft bullet points, and we generate. We
              help you turn ideas into sample essays and gives you the
              opportunity to try different ideas, stories and writing styles
              without doing the tedious writing!
            </p>
          </div>
        </div>
        <Spacer y='32' />
        <div className='flex justify-end gap-x-2 px-8 py-4'>
          <DialogClose asChild>
            <Button
              onClick={handleUpdateUsage}
              className='text-shadow'
              variant={'ghost'}
            >
              Skip
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleUpdateUsage}>Show me</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardModal;
