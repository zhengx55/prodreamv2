import { useMutateTrackInfo, useUserTrackInfo } from '@/hooks/useTrackInfo';
import { memo } from 'react';
import Icon from '../root/Icon';
import Spacer from '../root/Spacer';
import { Button } from '../ui/button';
import { Dialog, DialogTrigger } from '../ui/dialog';
import { DropdownMenuContent } from '../ui/dropdown-menu';
import Modal from './Modal';

type Props = {};
const Dropdown = (props: Props) => {
  const { data: trackInfo } = useUserTrackInfo();
  const { mutateAsync: updateTrack } = useMutateTrackInfo();
  return (
    <DropdownMenuContent
      className='flex flex-col rounded border border-gray-200 bg-white shadow-lg md:w-[435px]'
      side='bottom'
      align='start'
    >
      <div className='flex-between px-2 py-1.5'>
        <h2 className='base-semibold'>Notifications</h2>
        <Button
          role='button'
          className='size-max p-0 text-base text-indigo-500'
          variant={'text'}
          onClick={async () => {
            await updateTrack({ data: 'true', field: 'notification_read' });
          }}
        >
          Mark all as read
        </Button>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <div
            role='dialog'
            className='flex cursor-pointer flex-col border-t border-gray-200 px-3 py-4 hover:bg-slate-50'
          >
            <div className='flex-between'>
              <h3 className='base-regular text-zinc-700'>
                📢 New Features Announcement! 📢
              </h3>
              {!trackInfo?.notification_read && (
                <span className='size-2 rounded-full bg-red-400' />
              )}
            </div>
            <Spacer y='6' />
            <article className='text-xs font-normal text-zinc-500'>
              We&apos;re pleased to inform you about the latest updates to our
              platform:
              <br />
              <br />
              <strong>1.Introducing Jessica,</strong> Your AI Research
              Companion: We&apos;ve added a new AI Chatbot named Jessica to
              assist with research and writing tasks. Jessica can provide
              guidance on essay improvement strategies and offer explanations to
              your readings...
            </article>
            <Spacer y='24' />
            <div className='flex-between'>
              <div className='flex items-center gap-x-2'>
                <span className='flex-center h-5 w-5 rounded-full bg-purple-600'>
                  <Icon
                    className='size-4'
                    alt='logo'
                    width={15}
                    height={15}
                    src='/logo/Logo.svg'
                  />
                </span>
                <p className='text-xs font-normal text-zinc-700'>ProDream</p>
              </div>
              <p className='text-xs font-normal text-zinc-700'>7 hr.ago</p>
            </div>
          </div>
        </DialogTrigger>
        <Modal />
      </Dialog>
    </DropdownMenuContent>
  );
};
export default memo(Dropdown);
