import dynamic from 'next/dynamic';

const QA = dynamic(() => import('./QA'));

const Question = () => {
  return (
    <section className='relative flex w-full justify-center px-4 pb-[80px] sm:px-0 sm:py-20'>
      <div className='flex-between w-full sm:max-w-[1200px]'>
        <div className='flex w-full flex-col gap-x-4 gap-y-4 sm:flex-row sm:justify-between sm:gap-y-0'>
          <div className='flex w-full flex-col gap-y-2 sm:w-[40%]'>
            <h1 className='text-center font-baskerville text-[28px] font-[400] leading-snug sm:text-left sm:text-[40px]'>
              Frequently Asked <br />
              Question&apos;s
            </h1>
            <p className='text-center leading-relaxed text-[#64626A] sm:w-full sm:text-left sm:text-[18px]'>
              Have questions or need support? Shoot us an email at{' '}
              <span className='text-doc-primary'>support@prodream.ai</span>
            </p>
          </div>
          <QA />
        </div>
      </div>
    </section>
  );
};
export default Question;
