'use client';
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog';
import Spacer from '../root/Spacer';
import { Button } from '../ui/button';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/store/storehooks';
import { selectUsage, setSingleUsage } from '@/store/reducers/usageSlice';
import { updateUserInfo } from '@/query/api';
import { selectUserEmail } from '@/store/reducers/userSlice';
import { useMutation } from '@tanstack/react-query';
import { IUsage } from '@/types';

const OnboardModal = () => {
  const dispatch = useAppDispatch();
  const usage = useAppSelector(selectUsage);
  const email = useAppSelector(selectUserEmail);
  const { mutateAsync: updateUsage } = useMutation({
    mutationFn: (args: { email: string; params: IUsage }) =>
      updateUserInfo(args.email, args.params),
    onSuccess: () => {
      dispatch(setSingleUsage('first_activity_list'));
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
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='33'
            viewBox='0 0 32 33'
            fill='none'
            className='shrink-0'
          >
            <path
              d='M22.654 4.40625C22.1806 4.40625 21.6913 4.66492 21.446 5.15625C20.8633 6.31985 20.6847 6.70265 20.446 7.07292C20.058 7.67292 19.7393 7.91212 18.9046 8.23958C18.7153 8.31358 18.4926 8.40465 18.238 8.48958C17.11 8.86518 17.0086 10.4166 18.0713 10.9478C19.1966 11.5106 19.506 11.6962 19.8206 11.9062C20.1193 12.1049 20.2886 12.2749 20.4873 12.5729C20.698 12.8878 20.8833 13.1976 21.446 14.3236C21.9367 15.3063 23.3713 15.3063 23.862 14.3236C24.4246 13.1976 24.6113 12.888 24.8206 12.5729C25.0193 12.2749 25.19 12.1049 25.4873 11.9062C25.802 11.6962 26.1126 11.5105 27.238 10.9478C28.2206 10.4565 28.2206 9.02265 27.238 8.53132C26.1126 7.96852 25.802 7.78292 25.4873 7.57292C25.19 7.37425 25.0193 7.20425 24.8206 6.90625C24.6113 6.59132 24.4246 6.28158 23.862 5.15625C23.6166 4.66492 23.1273 4.40625 22.654 4.40625ZM9.32064 7.07292C8.84731 7.07292 8.35799 7.33158 8.11265 7.82292C7.73266 8.58158 7.63398 8.80399 7.48731 9.03132C7.28064 9.34999 7.12731 9.47065 6.65398 9.65625C6.53531 9.70252 6.40065 9.76852 6.23798 9.82292C5.10998 10.1985 5.00865 11.75 6.07131 12.2812C6.80065 12.6464 7.00732 12.7393 7.19532 12.8647C7.34598 12.9645 7.42865 13.0481 7.52865 13.198C7.65398 13.3859 7.74732 13.5927 8.11265 14.3236C8.60332 15.3063 10.038 15.3063 10.5286 14.3236C10.894 13.5927 10.9873 13.3859 11.1127 13.198C11.2127 13.0481 11.2953 12.9645 11.446 12.8647C11.634 12.7393 11.8406 12.6464 12.5713 12.2812C13.554 11.7898 13.554 10.356 12.5713 9.86465C11.8406 9.49945 11.634 9.40651 11.446 9.28118C11.2953 9.18131 11.2127 9.09771 11.1127 8.94784C10.9873 8.75998 10.894 8.55318 10.5286 7.82292C10.2833 7.33158 9.79398 7.07292 9.32064 7.07292ZM15.9873 15.0729C15.4566 15.0729 14.9406 15.3823 14.738 15.9903C13.8033 18.7916 13.0393 19.5556 10.238 20.4889C9.02198 20.8942 9.02198 22.5849 10.238 22.9903C13.0393 23.9236 13.8033 24.6876 14.738 27.4889C15.142 28.7049 16.8326 28.7049 17.238 27.4889C18.1713 24.6876 18.9353 23.9236 21.738 22.9903C22.9526 22.5849 22.9526 20.8942 21.738 20.4889C18.9353 19.5556 18.1713 18.7916 17.238 15.9903C17.0353 15.3823 16.518 15.0729 15.9873 15.0729Z'
              fill='#9C2CF3'
            />
          </svg>
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
