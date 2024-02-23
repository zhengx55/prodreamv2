"use client"

import useLocalization from '@/hooks/useLocalization';
import dynamic from 'next/dynamic';

const QA = dynamic(() => import('./QA'));

const Question = () => {

  const { t } = useLocalization();

  return (
    <section className='relative flex w-full justify-center px-4 pb-[80px] sm:px-0 sm:py-20'>
      <div className='flex-between w-full sm:max-w-[1200px]'>
        <div className='flex flex-col w-full gap-x-4 gap-y-4 sm:flex-row sm:justify-between sm:gap-y-0'>
          <div className='flex w-full flex-col gap-y-2 sm:w-[40%]'>
            <h1 className='text-center font-baskerville text-[28px] font-[400] leading-snug sm:text-left sm:text-[40px]'>
              {t('QuestionInfo_theme_1')} <br />
              {t('QuestionInfo_theme_2')}
            </h1>
            <p className='text-center leading-relaxed text-[#64626A] sm:w-full sm:text-left sm:text-[18px]'>
              {t('QuestionInfo_theme_3')}{' '}
              <span className='text-doc-primary'>{t('QuestionInfo_theme_4')}</span>
            </p>
          </div>
          <QA />
        </div>
      </div>
    </section>
  );
};
export default Question;
