'use client';
import Image from 'next/image';
import Link from 'next/link';
import Spacer from '../root/Spacer';

const Options = ({ type }: { type?: 'onboard' }) => {
  const datalist = [
    { name: 'English native speaker', src: '/welcome/wel4.svg' },
    { name: 'International Student', src: '/welcome/wel5.svg' },
  ];
  return (
    <div className='h-max w-full'>
      <h1 className='text-center text-[48px] font-[600] text-[#17161B]'>
        Welcome to ProDream
      </h1>
      <p className='text-center text-[24px] font-[400] text-[#525252]'>
        Personalize your writing experience. Write faster and better than ever.
      </p>
      <div className='mt-[98px] flex w-full gap-x-[40px]'>
        {datalist.map((item, index) => (
          <Link href={'/writtingpal/polish'} className='w-full' key={item.name}>
            <div className='flex h-[500px] w-[500px] cursor-pointer flex-col items-center rounded-[22px] border-[2px] border-[#D4D3D8] px-[20px] py-[36px] hover:bg-[#F8F9FC]'>
              <h5 className='text-center text-[32px] font-[500] text-[#3B3A40]'>
                {item.name}
              </h5>
              <Spacer y='37' />
              <Image
                src={item.src}
                alt='welcome'
                width={334}
                height={334}
                className='h-auto w-[334px]'
                priority
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Options;
