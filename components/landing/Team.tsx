import { TeamMembers } from '@/constant';
import Image from 'next/image';
import Spacer from '../root/Spacer';

const Team = () => {
  return (
    <section className='relative flex w-full justify-center py-20'>
      <div className='flex-center w-full max-w-[1450px] flex-col'>
        <div className='flex w-full justify-between px-10'>
          <h1 className='h3-semibold'>
            Incubated by Harvard Innovation Lab and <br /> Microsoft Founders
            Hub
          </h1>
          <div className='flex items-center'>
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
          <h3 className='h2-bold text-white'>Meet our team members</h3>
          <Spacer y='24' />
          <div className='grid grid-cols-4 gap-6'>
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
