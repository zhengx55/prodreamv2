import { TeamMembers } from '@/constant';
import Image from 'next/image';
import Spacer from '../root/Spacer';

const Team = () => {
  return (
    <section className='relative flex w-full justify-center px-4 pt-20 sm:py-[200px] sm:px-0'>
      <div className='flex-center w-full flex-col sm:max-w-[1450px]'>
        <div className='flex w-full items-center flex-col px-10 sm:flex-col sm:justify-between'>
          <p className='text-[#3B3A40] sm:text-[28px] text-[14px] text-center font-[400]'>Trusted by academic writers from top universities around the world</p>
          <Spacer y='14' className='block sm:hidden' />
          <div className='flex sm:w-[80%] w-full items-center justify-between'>
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
          <h1 className='font-baskerville text-center w-full text-[28px] font-[400] tracking-tighter sm:text-center sm:text-[72px]'>
            <span className="before:block before:absolute sm:before:top-[56px] before:top-[22px] before:-inset-1 before:-skew-y-0 before:h-[40%] before:bg-[#F2C8FB] relative inline-block before:z-[-1]">Seamless Excellence</span> in<br/> Every Word, Every Paper.
          </h1>
          <Spacer y='20' />
          <p className='small-regular text-[#64626A] text-center sm:text-[28px] sm:text-center'>
          ProDream&apos;s Ease-of-Use Features Assist You in<br className='hidden sm:block'/> Writing, Editing, and Citing.
          </p>
          <Spacer y='40' />
          <div className='relative flex w-full flex-col sm:rounded-[36px] rounded-[8px] sm:p-[67px] overflow-hidden w-[320px] sm:w-[1200px]'>
            <section className='relative flex w-full flex-col sm:rounded-[24px] rounded-[8px] bg-[#fff] overflow-hidden sm:w-full sm:h-[740px] h-[216px]'>
              <Image
                draggable='false'
                alt='gardient-bg'
                priority
                className='absolute sm:top-10 w-full w-auto sm:rounded-[36px] rounded-[8px] bg-[#F5F6F9] sm:p-[40px] p-[4px]'
                width={1070}
                height={720}
                sizes='(max-width: 768px) 100vw, (max-width: 180px) 50vw, 180px'
                src='/landing/heros/hero-1.gif'
              />
            </section>
            <Spacer y='40' />
            <h4 className='text-left text-[16px] font-[600] tracking-tighter sm:text-left sm:text-[36px]'>Never get stuck writing an essay again</h4>
            <Spacer y='20' />
            <p className='small-regular text-left text-[#64626A] sm:text-[28px]'>
            ProDream unblocks your writing by integrating insights from your style and topic. Simply write, and it continues the scholarly piece for you.
            </p>
            <Spacer y='40' />
            <section className='relative flex flex-col sm:flex-row justify-between w-full overflow-hidden sm:w-full'>
              <div className='relative flex flex-col w-full sm:w-[48%]'>
                <Image
                  draggable='false'
                  alt='gardient-bg'
                  priority
                  className='w-full w-auto sm:rounded-[36px] rounded-[8px] bg-[#F5F6F9] sm:p-[25px] p-[6px]'
                  width={605}
                  height={336}
                  sizes='(max-width: 768px) 100vw, (max-width: 180px) 50vw, 180px'
                  src='/landing/heros/herobg.png'
                />
                <Spacer y='20' />
                <h4 className='text-left text-[16px] font-[500] tracking-tighter sm:text-left sm:text-[30px]'>Get citation job done with just one click</h4>
                <Spacer y='20' />
                <p className='small-regular text-left text-[#64626A] sm:text-[28px] sm:text-left'>
                ProDream streamlines your citations with the latest research and your PDF uploads. Simply choose from MLA, IEEE, and APA styles.
                </p>
              </div>
              <div className='relative flex flex-col w-full mt-[20px] sm:mt-0 sm:w-[48%]'>
                <Image
                  draggable='false'
                  alt='gardient-bg'
                  priority
                  className='w-full w-auto sm:rounded-[36px] rounded-[8px] bg-[#F5F6F9] sm:p-[25px] p-[6px]'
                  width={605}
                  height={336}
                  sizes='(max-width: 768px) 100vw, (max-width: 180px) 50vw, 180px'
                  src='/landing/heros/herobg.png'
                />
                <Spacer y='20' />
                <h4 className='text-left text-[16px] font-[500] tracking-tighter sm:text-left sm:text-[30px]'>Real-time AI academic expert support</h4>
                <Spacer y='20' />
                <p className='small-regular text-left text-[#64626A] sm:text-[28px] sm:text-left'>
                Our tool offers extensive English language recommendations, accurate detection of complex grammar errors, and checks for structural and technical inconsistencies all in real-time
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
