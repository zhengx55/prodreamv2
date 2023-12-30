'use client';
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog';
import { updateUserInfo } from '@/query/api';
import { selectUserEmail } from '@/store/reducers/userSlice';
import { useAppSelector } from '@/store/storehooks';
import { IUsage } from '@/types';
import { useUsage } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import Spacer from '../root/Spacer';
import { Upload } from '../root/SvgComponents';
import { Button } from '../ui/button';

const OnboardModal = () => {
  const updateUsageItem = useUsage((state) => state.updateSingleUsage);
  const usage = useUsage((state) => state.usage);
  const email = useAppSelector(selectUserEmail);
  const { mutateAsync: updateUsage } = useMutation({
    mutationFn: (args: { email: string; params: IUsage }) =>
      updateUserInfo(args.email, args.params),
    onSuccess: () => {
      updateUsageItem('first_activity_list');
    },
  });
  const handleUpdateUsage = async () => {
    await updateUsage({
      email,
      params: { ...usage, first_activity_list: false },
    });
  };
  return (
    <Dialog defaultOpen>
      <DialogContent
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
        maskclass='backdrop-blur-none bg-black-400/50'
        className='md:w-[640px] md:gap-y-0 md:rounded-lg md:p-0'
      >
        <div className='relative flex h-96 w-full overflow-hidden rounded-t-lg bg-primary-600'>
          <DialogClose onClick={handleUpdateUsage}>
            <span className='absolute right-3 top-2 z-10 h-6 w-6 cursor-pointer bg-transparent' />
          </DialogClose>

          <Image
            alt='onboard-activity'
            src={'/onboards/activityList.png'}
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
              Start by uploading a file describing activities or fill in
              activity description drafts
            </h2>
            <p className='small-regular'>
              Upload your resume, personal statement or any document that
              details your experience. We will create a draft for you to
              generate your powered-up activity list, with one click! 🪄
            </p>
          </div>
        </div>
        <Spacer y='32' />
        <div className='flex justify-end px-8 py-4'>
          <DialogClose asChild>
            <Button onClick={handleUpdateUsage}>Got it!</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardModal;
