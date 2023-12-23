import { TeamMembers } from '@/constant';
import Image from 'next/image';
import Spacer from '../root/Spacer';

const Team = () => {
  return (
    <section className='relative flex w-full justify-center px-4 py-20 sm:px-0'>
      <div className='flex-center w-full flex-col sm:max-w-[1450px]'>
        <div className='flex w-full flex-col px-10 sm:flex-row sm:justify-between'>
          <h1 className='title-semibold sm:h3-semibold text-center sm:text-left'>
            Incubated by Harvard Innovation Lab and{' '}
            <br className='hidden sm:block' /> Microsoft Founders Hub
          </h1>
          <Spacer y='14' className='block sm:hidden' />
          <div className='flex items-center justify-center sm:justify-start'>
            <Image
              alt='Harvard'
              src='/landing/team/Harvard.png'
              width={1920}
              height={920}
              className='h-auto w-40'
            />
            <Image
              alt='Founders Hub'
              src='/landing/team/FHubs.png'
              width={1920}
              height={920}
              className='h-auto w-40'
            />
          </div>
        </div>
        <Spacer y='40' />
        <div className='flex-center w-full flex-col rounded-xl bg-[#383838] px-6 py-10'>
          <h3 className='h3-semibold sm:h2-bold text-center text-white sm:text-left'>
            Meet our team members
          </h3>
          <Spacer y='24' />
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-4'>
            {TeamMembers.map((item) => (
              <div className='flex flex-col gap-y-3' key={item.id}>
                <div
                  className='h-56 w-full overflow-hidden rounded-xl px-4 pt-6'
                  style={{ backgroundColor: item.background }}
                >
                  <Image
                    alt={item.name}
                    src={item.image}
                    width={1920}
                    height={950}
                    className='h-full w-full object-contain'
                  />
                </div>
                <div className='flex flex-col'>
                  <div className='flex items-center gap-x-1'>
                    <h2 className='base-semibold text-white'>{item.name}</h2>
                    <p className='small-regular text-shadow-50'>{item.role}</p>
                  </div>
                  <p className='small-regular text-shadow-50'>
                    {item.education}
                  </p>
                </div>

                <div className='rounded-lg bg-[#464646] p-2'>
                  <p className='small-regular text-shadow-50'>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Team;
