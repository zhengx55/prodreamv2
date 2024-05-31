'use client';
import ReactTyped from 'react-typed';
import { useTranslations } from 'next-intl';
import Spacer from '../root/Spacer';

const TypeTitle = () => {
  const trans = useTranslations('Homepage');
  return (
    <>
      <h1 className='text-center font-baskerville text-[32px] font-[400] leading-normal sm:text-center sm:text-[48px]'>
        {'Say Goodbye to'} <br className='sm:hidden' />
        <span className='relative inline-block before:absolute before:-inset-1 before:top-[28px] before:z-[-1] before:block before:h-[40%] before:-skew-y-0 before:bg-[#D2DFFF] sm:before:top-[36px] sm:before:h-[40%]'>
          <ReactTyped
            typeSpeed={50}
            backSpeed={50}
            loop
            strings={[
              'Brain Fog',
              'Plagiarism Risks',
              'Grammar Issues',
              'AI Concerns',
              'Quality Worries',
            ]}
          />
          &nbsp;
          <span className='cursor' />
        </span>
        <br />
        {'in Academic Writing'}
      </h1>
      <Spacer y='30' />
      <p className='text-center text-[18px] leading-relaxed tracking-normal text-[#64626A] sm:text-center sm:text-[18px]'>
        {`ProDream's`} <span className='font-bold'>{trans('one_stop_solution')}</span>
        &nbsp;
        {trans('helps_you_write')} <span className='font-bold'>{trans('better')}</span>&nbsp;
        {trans('and')} <span className='font-bold'>{trans('faster')}</span>&nbsp;
        {trans('with_confidence')}
      </p>
    </>
  );
};
export default TypeTitle;
