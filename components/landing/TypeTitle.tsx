import { getDictionary } from '@/lib/get-dictionary';
import ReactTyped from 'react-typed';
import Spacer from '../root/Spacer';

const TypeTitle = ({
  t,
}: {
  t: Awaited<ReturnType<typeof getDictionary>>['Homepage'];
}) => {
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
        {`ProDream's`} <span className='font-bold'>{t.one_stop_solution}</span>
        &nbsp;
        {t.helps_you_write} <span className='font-bold'>{t.better}</span>&nbsp;
        {t.and} <span className='font-bold'>{t.faster}</span>&nbsp;
        {t.with_confidence}
      </p>
    </>
  );
};
export default TypeTitle;
