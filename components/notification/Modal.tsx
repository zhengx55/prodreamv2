import { XCircle } from 'lucide-react';
import { memo } from 'react';
import { useTranslations } from 'next-intl';
import Spacer from '../root/Spacer';
import { DialogClose, DialogContent, DialogHeader } from '../ui/dialog';

type Props = {};
const Modal = (props: Props) => {
  const t = useTranslations('Editor');

  return (
    <DialogContent className='flex flex-col items-center gap-y-0 rounded bg-white p-2 pb-4 md:w-[624px]'>
      <DialogHeader className='self-end'>
        <DialogClose>
          <XCircle className='text-stone-300' size={24} />
        </DialogClose>
      </DialogHeader>
      <Spacer y='8' />
      <h1 className='self-center text-xl font-semibold text-zinc-900'>
        {t.rich('Announcement.Title', {
          strong: () => <strong className='font-bold' />,
        })}
      </h1>
      <Spacer y='8' />
      <h2 className='self-center text-base font-medium text-zinc-900'>
        {t.rich('Announcement.Sub_title', {
          strong: (chunks) => <strong className='font-bold'>{chunks}</strong>,
        })}
      </h2>
      <Spacer y='32' />
      <ol className='small-regular flex w-[90%] list-decimal flex-col gap-y-2 text-zinc-500'>
        <li className=''>
          {t.rich('Announcement.Content_1', {
            strong: (chunks) => <strong className='font-bold'>{chunks}</strong>,
          })}
        </li>
        <li>
          {t.rich('Announcement.Content_2', {
            strong: (chunks) => <strong className='font-bold'>{chunks}</strong>,
          })}
        </li>
        <li>
          {t.rich('Announcement.Content_3', {
            strong: (chunks) => <strong className='font-bold'>{chunks}</strong>,
          })}
        </li>
        <li>
          {t.rich('Announcement.Content_4', {
            strong: (chunks) => <strong className='font-bold'>{chunks}</strong>,
          })}
        </li>
      </ol>
    </DialogContent>
  );
};
export default memo(Modal);
