import { useMutateTrackInfo, useUserTrackInfo } from '@/hooks/useTrackInfo';
import { formatTimestamphh_number } from '@/lib/utils';
import { memo } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Icon from '../root/Icon';
import Spacer from '../root/Spacer';
import { Button } from '../ui/button';
import { Dialog, DialogTrigger } from '../ui/dialog';
import { DropdownMenuContent } from '../ui/dropdown-menu';
import Modal from './Modal';


const Dropdown = () => {
  const { data: trackInfo } = useUserTrackInfo();
  const { mutateAsync: updateTrack } = useMutateTrackInfo();
  const t = useTranslations('Editor');
  const {lang} = useParams();


  return (
    <DropdownMenuContent
      className='flex flex-col rounded border border-gray-200 bg-white shadow-lg md:w-[435px]'
      side='bottom'
      align='start'
    >
      <div className='flex-between px-2 py-1.5'>
        <h2 className='base-semibold'>{t('SideBar.Notifications')}</h2>
        <Button
          role='button'
          className='size-max p-0 text-base text-indigo-500'
          variant={'text'}
          onClick={async () => {
            await updateTrack({ data: 'true', field: 'notification_read' });
          }}
        >
          {t('SideBar.Mark_all_as_read')}
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
                {t.rich('Announcement.Title', {
                  strong: () => <strong className='font-bold' />,
                })}
              </h3>
              {!trackInfo?.notification_read && (
                <span className='size-2 rounded-full bg-red-400' />
              )}
            </div>
            <Spacer y='6' />
            <article className='text-xs font-normal text-zinc-500'>
              {t.rich('Announcement.Sub_title', {
                strong: (chunks) => <strong className='font-bold'>{chunks}</strong>,
              })}
              <br />
              <br />
              {t.rich('Announcement.Content_1', {
                strong: (chunks) => <strong className='font-bold'>{chunks}</strong>,
              })}
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
              <p className='text-xs font-normal text-zinc-700'>
                {formatTimestamphh_number(1715312029790 / 1000, lang as string )}
              </p>
            </div>
          </div>
        </DialogTrigger>
        <Modal />
      </Dialog>
    </DropdownMenuContent>
  );
};

export async function getServerSideProps({ req }: { req: any }) {
  const lang = req.headers['x-next-intl-locale'];

  return {
    props: {
      lang
    },
  };
}
export default memo(Dropdown);
