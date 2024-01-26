import { TeamMembers } from '@/constant';
import Image from 'next/image';
import Spacer from '../root/Spacer';

const Team = () => {
  return (
    <section className='relative flex w-full justify-center px-4 pt-20 sm:px-0 sm:py-[170px]'>
      <div className='flex-center w-full flex-col sm:max-w-[1200px]'>
        <div className='flex w-full flex-col items-center px-10 sm:flex-col sm:justify-between'>
          <p className='text-center text-[14px] font-[400] text-[#3B3A40] sm:text-[18px]'>
            Trusted by academic writers from top universities around the world
          </p>
          <Spacer y='14' className='block sm:hidden' />
          <div className='flex w-full items-center justify-between sm:w-[80%]'>
            <Image
              alt='Harvard'
              src='/landing/team/harvardLogo1.png'
              width={256}
              height={144}
              className='h-auto w-[58px] sm:w-40'
            />
            <Image
              alt='Founders Hub'
              src='/landing/team/stanfordLogo1.png'
              width={328}
              height={144}
              className='h-auto w-[58px] sm:w-40'
            />
            <Image
              alt='Founders Hub'
              src='/landing/team/Brand.png'
              width={282}
              height={144}
              className='h-auto w-[58px] sm:w-40'
            />
            <Image
              alt='Founders Hub'
              src='/landing/team/Brand2.png'
              width={282}
              height={144}
              className='h-auto w-[58px] sm:w-40'
            />
            <Image
              alt='Founders Hub'
              src='/landing/team/brand3.png'
              width={367}
              height={144}
              className='h-auto w-[58px] sm:w-40'
            />
          </div>
        </div>
        <Spacer y='40' />
        <div className='flex-center w-full flex-col rounded-xl px-6 py-10'>
          <h1 className='w-full text-center font-baskerville text-[28px] font-[400] leading-[32px] tracking-tighter sm:text-center sm:text-[48px] sm:leading-[58px]'>
            <span className='relative inline-block before:absolute before:-inset-1 before:top-[18px] before:z-[-1] before:block before:h-[40%] before:-skew-y-0 before:bg-[#F2C8FB] sm:before:top-[36px]'>
              Seamless Excellence
            </span>{' '}
            in
            <br /> Every Word, Every Paper.
          </h1>
          <Spacer y='28' />
          <p className='small-regular text-center text-[#64626A] sm:text-center sm:text-[18px]'>
            ProDream&apos;s Ease-of-Use Features Assist You in
            <br className='hidden sm:block' /> Writing, Editing, and Citing.
          </p>
          <Spacer y='40' />
          <div className='relative flex w-[320px] w-full flex-col overflow-hidden rounded-[8px] sm:w-[1200px] sm:rounded-[36px] sm:p-[10px]'>
            <section className='relative flex h-[216px] w-full flex-col overflow-hidden rounded-[8px] bg-[#fff] sm:h-[740px] sm:w-full sm:rounded-[24px]'>
              <Image
                draggable='false'
                alt='gardient-bg'
                priority
                className='absolute w-auto w-full rounded-[8px] bg-[#F5F6F9] sm:top-10 sm:rounded-[36px]'
                width={1200}
                height={720}
                sizes='(max-width: 768px) 100vw, (max-width: 180px) 50vw, 180px'
                src='/landing/team/Group0.svg'
              />
            </section>
            <Spacer y='40' />
            <h4 className='text-left text-[16px] font-[600] tracking-tighter sm:text-left sm:text-[20px]'>
              Never get stuck writing an essay again
            </h4>
            <Spacer y='20' />
            <p className='small-regular text-left text-[#64626A] sm:text-[18px]'>
              ProDream unblocks your writing by integrating insights from your
              style and topic. Simply write, and it continues the scholarly
              piece for you.
            </p>
            <Spacer y='40' />
            <section className='relative flex w-full flex-col justify-between overflow-hidden sm:w-full sm:flex-row'>
              <div className='relative flex w-full flex-col sm:w-[48%]'>
                <Image
                  draggable='false'
                  alt='gardient-bg'
                  priority
                  className='w-auto w-full rounded-[8px] bg-[#F5F6F9] sm:rounded-[36px]'
                  width={580}
                  height={420}
                  sizes='(max-width: 768px) 100vw, (max-width: 180px) 50vw, 180px'
                  src='/landing/team/Group1.svg'
                />
                <Spacer y='20' />
                <h4 className='text-left text-[16px] font-[500] tracking-tighter sm:text-left sm:text-[20px]'>
                  Get citation job done with just one click
                </h4>
                <Spacer y='20' />
                <p className='small-regular text-left text-[#64626A] sm:text-left sm:text-[18px]'>
                  ProDream streamlines your citations with the latest research
                  and your PDF uploads. Simply choose from MLA, IEEE, and APA
                  styles.
                </p>
              </div>
              <div className='relative mt-[20px] flex w-full flex-col sm:mt-0 sm:w-[48%]'>
                <Image
                  draggable='false'
                  alt='gardient-bg'
                  priority
                  className='w-auto w-full rounded-[8px] bg-[#F5F6F9] sm:rounded-[36px]'
                  width={580}
                  height={420}
                  sizes='(max-width: 768px) 100vw, (max-width: 180px) 50vw, 180px'
                  src='/landing/team/Group2.svg'
                />
                <Spacer y='20' />
                <h4 className='text-left text-[16px] font-[500] tracking-tighter sm:text-left sm:text-[20px]'>
                  Real-time AI academic expert support
                </h4>
                <Spacer y='20' />
                <p className='small-regular text-left text-[#64626A] sm:text-left sm:text-[18px]'>
                  Our tool offers extensive English language recommendations,
                  accurate detection of complex grammar errors, and checks for
                  structural and technical inconsistencies all in real-time
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Team;
