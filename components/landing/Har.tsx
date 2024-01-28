import { TeamMembers } from '@/constant';
import Image from 'next/image';
import Spacer from '../root/Spacer';

const Team = () => {
  return (
    <section className='relative flex w-full justify-center sm:px-0 sm:py-20'>
      <div className='flex-center h-[174px] w-full flex-col bg-[#CDCDFF]/20 sm:h-[218px]'>
        <div className='flex w-full flex-col sm:max-w-[1200px] sm:flex-row sm:justify-between'>
          <h1 className='text-center text-[16px] font-[500] sm:text-left sm:text-[20px]'>
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
