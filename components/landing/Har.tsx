import { TeamMembers } from '@/constant';
import Image from 'next/image';
import Spacer from '../root/Spacer';

const Team = () => {
  return (
    <section className='relative flex w-full justify-center sm:py-20 sm:px-0'>
      <div className='flex-center w-full flex-col bg-[#CDCDFF]/20 sm:h-[218px] h-[174px]'>
        <div className='flex w-full flex-col sm:flex-row sm:justify-between sm:max-w-[1200px]'>
          <h1 className='text-[16px] font-[500] sm:text-[20px] text-center sm:text-left'>
            Incubated by Harvard Innovation Lab and{' '}
            <br className='hidden sm:block' /> Microsoft Founders Hub
          </h1>
          <Spacer y='14' className='block sm:hidden' />
          <div className='flex items-center justify-center sm:justify-start'>
            <Image
              alt='Harvard'
              src='/landing/team/Harvard.png'
              width={200}
              height={60}
              className='h-auto w-40'
            />
            <Image
              alt='Founders Hub'
              src='/landing/team/FHubs.png'
              width={200}
              height={60}
              className='h-auto w-40'
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Team;
