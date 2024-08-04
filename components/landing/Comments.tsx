import { CommentsInfo } from '@/constant';
import { HomePageDicType } from '@/types';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Spacer from '../root/Spacer';
const CaptureProvider = dynamic(() => import('./CaptureProvider'));
const Comments = ({ t, lang }: HomePageDicType) => {
  const trans = useTranslations('Homepage');

  return (
    <section className='relative flex w-full flex-col items-center justify-center px-4 py-10 sm:px-0 sm:py-20'>
      <CaptureProvider event='ScreenV'>
        {lang === 'en' ? (
          <h2 className='inline-flex font-baskerville text-[24px] leading-relaxed sm:text-[48px]'>
            <Image
              src='/landing/heros/Shape.svg'
              alt='qutes'
              width={50}
              height={50}
              className='h-8 w-8 self-start sm:h-[50px] sm:w-[50px]'
            />
            {trans('ShowCaseInfo_theme_1')}
            <br className='hidden sm:block' />
            {trans('ShowCaseInfo_theme_2')}
          </h2>
        ) : (
          <h2 className=' inline-flex font-custom text-[24px] leading-relaxed sm:text-[48px]'>
            <Image
              src='/landing/heros/Shape.svg'
              alt='qutes'
              width={50}
              height={50}
              className='mr-10 h-8 w-8 self-start sm:h-[50px] sm:w-[50px]'
            />
            {trans('ShowCaseInfo_theme_1')}
            <br className='hidden sm:block' />{' '}
          </h2>
        )}
      </CaptureProvider>

      <Spacer y='20' />
      <ul className='flex w-full flex-col gap-y-8 rounded-xl bg-violet-500/5 py-16 sm:h-[500px] sm:w-[1200px] sm:flex-row sm:gap-y-0'>
        {CommentsInfo.map((comment, index) => (
          <li
            key={comment.id}
            className='flex h-full w-full flex-col justify-between gap-y-4 border-b border-gray-200 px-10 py-5 sm:w-1/3 sm:gap-y-0 sm:border-b-0 sm:border-r sm:py-0 sm:last:border-r-0'
          >
            <p className='text-[18px] leading-relaxed'>
              {trans(`ShowCase_title_${index + 1}`)}
            </p>
            <div className='flex items-center gap-x-4'>
              <Image
                src={comment.image}
                width={52}
                height={52}
                alt='student-comment'
              />
              <div className='flex flex-col'>
                <p className='base-medium'>
                  {trans(`ShowCase_name_${index + 1}`)}
                </p>
                <p className='subtle-regular text-neutral-400-100'>
                  {trans(`ShowCase_form_${index + 1}`)}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default Comments;
