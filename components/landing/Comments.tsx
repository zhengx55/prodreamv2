"use client"

import { CommentsInfo } from '@/constant';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Spacer from '../root/Spacer';
import useLocalization from '@/hooks/useLocalization';
const CaptureProvider = dynamic(() => import('./CaptureProvider'));
const Comments = () => {

  const {t , getCurrentLanguage} = useLocalization()

  return (
    <section className='relative flex flex-col items-center justify-center w-full px-4 py-10 sm:px-0 sm:py-20'>
      <CaptureProvider event='ScreenV'>
        {
          getCurrentLanguage() === 'en' ? 
          <h2 className='inline-flex font-baskerville text-[24px] leading-relaxed sm:text-[48px]'>
            <Image
              src='/landing/heros/Shape.svg'
              alt='qutes'
              width={50}
              height={50}
              className='h-8 w-8 self-start sm:h-[50px] sm:w-[50px]'
            />
          {t('ShowCaseInfo_theme_1')}
            <br className='hidden sm:block' /> {getCurrentLanguage()==='en'?t('ShowCaseInfo_theme_2'):''}
          </h2>
        :
          <h2 className=' inline-flex font-custom text-[24px] leading-relaxed sm:text-[48px]'>
            <Image
              src='/landing/heros/Shape.svg'
              alt='qutes'
              width={50}
              height={50}
              className='h-8 w-8 self-start sm:h-[50px] sm:w-[50px] mr-10'
            />
          {t('ShowCaseInfo_theme_1')}
            <br className='hidden sm:block' /> {getCurrentLanguage()==='en'?t('ShowCaseInfo_theme_2'):''}
          </h2>
        }
        
      </CaptureProvider>

      <Spacer y='20' />
      <ul className='flex w-full flex-col gap-y-8 rounded-xl bg-doc-primary/5 py-16 sm:h-[500px] sm:w-[1200px] sm:flex-row sm:gap-y-0'>
        {CommentsInfo.map((comment,index) => (
          <li
            key={comment.id}
            className='flex flex-col justify-between w-full h-full px-10 py-5 border-b gap-y-4 border-shadow-border sm:w-1/3 sm:gap-y-0 sm:border-b-0 sm:border-r sm:py-0 sm:last:border-r-0'
          >
            <p className='text-[18px] leading-relaxed'>
              {t(`ShowCase_title_${index + 1}`)}
            </p>
            <div className='flex items-center gap-x-4'>
              <Image
                src={comment.image}
                width={52}
                height={52}
                alt='student-comment'
              />
              <div className='flex flex-col'>
                <p className='base-medium'> {t(`ShowCase_name_${index + 1}`)}</p>
                <p className='subtle-regular text-shadow-100'> {t(`ShowCase_form_${index + 1}`)}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default Comments;
