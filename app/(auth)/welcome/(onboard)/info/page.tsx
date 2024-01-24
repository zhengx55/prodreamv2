import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

const AnimatedLayout = dynamic(
  () => import('@/components/welcome/AnimatedLayout'),
  { ssr: false }
);

export default async function Page() {
  const datalist = [
    {
      name: 'Undergrad',
      desc: `Bachelor degree, Diplomas or highschool`,
      src: '/welcome/wel1.png',
    },
    {
      name: 'Masters or MBA',
      desc: `Graduate studying a Masters or MBAprogram`,
      src: '/welcome/wel2.png',
    },
    {
      name: 'PhD & Beyond',
      desc: `Doctorate student or researcher`,
      src: '/welcome/wel3.png',
    },
  ];
  return (
    <AnimatedLayout>
      <div className='relative h-max w-full rounded-[20px] bg-[#fff] px-[100px] py-[100px]'>
        <div className='absolute right-[37px] top-[-100px] flex items-center gap-x-1'>
          <Image
            src='/welcome/Frame01.svg'
            alt='welcome'
            width={60}
            height={60}
            className='h-auto w-[60px]'
            priority
          />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='64'
            height='3'
            viewBox='0 0 64 3'
            fill='none'
          >
            <path
              d='M62.5 2.5C63.0523 2.5 63.5 2.05228 63.5 1.5C63.5 0.947715 63.0523 0.5 62.5 0.5V2.5ZM1.95312 2.5C2.50541 2.5 2.95312 2.05228 2.95312 1.5C2.95312 0.947715 2.50541 0.5 1.95312 0.5V2.5ZM5.85938 0.5C5.30709 0.5 4.85938 0.947715 4.85938 1.5C4.85938 2.05228 5.30709 2.5 5.85938 2.5V0.5ZM9.76562 2.5C10.3179 2.5 10.7656 2.05228 10.7656 1.5C10.7656 0.947715 10.3179 0.5 9.76562 0.5V2.5ZM13.6719 0.5C13.1196 0.5 12.6719 0.947715 12.6719 1.5C12.6719 2.05228 13.1196 2.5 13.6719 2.5V0.5ZM17.5781 2.5C18.1304 2.5 18.5781 2.05228 18.5781 1.5C18.5781 0.947715 18.1304 0.5 17.5781 0.5V2.5ZM21.4844 0.5C20.9321 0.5 20.4844 0.947715 20.4844 1.5C20.4844 2.05228 20.9321 2.5 21.4844 2.5V0.5ZM25.3906 2.5C25.9429 2.5 26.3906 2.05228 26.3906 1.5C26.3906 0.947715 25.9429 0.5 25.3906 0.5V2.5ZM29.2969 0.5C28.7446 0.5 28.2969 0.947715 28.2969 1.5C28.2969 2.05228 28.7446 2.5 29.2969 2.5V0.5ZM33.2031 2.5C33.7554 2.5 34.2031 2.05228 34.2031 1.5C34.2031 0.947715 33.7554 0.5 33.2031 0.5V2.5ZM37.1094 0.5C36.5571 0.5 36.1094 0.947715 36.1094 1.5C36.1094 2.05228 36.5571 2.5 37.1094 2.5V0.5ZM41.0156 2.5C41.5679 2.5 42.0156 2.05228 42.0156 1.5C42.0156 0.947715 41.5679 0.5 41.0156 0.5V2.5ZM44.9219 0.5C44.3696 0.5 43.9219 0.947715 43.9219 1.5C43.9219 2.05228 44.3696 2.5 44.9219 2.5V0.5ZM48.8281 2.5C49.3804 2.5 49.8281 2.05228 49.8281 1.5C49.8281 0.947715 49.3804 0.5 48.8281 0.5V2.5ZM52.7344 0.5C52.1821 0.5 51.7344 0.947715 51.7344 1.5C51.7344 2.05228 52.1821 2.5 52.7344 2.5V0.5ZM56.6406 2.5C57.1929 2.5 57.6406 2.05228 57.6406 1.5C57.6406 0.947715 57.1929 0.5 56.6406 0.5V2.5ZM60.5469 0.5C59.9946 0.5 59.5469 0.947715 59.5469 1.5C59.5469 2.05228 59.9946 2.5 60.5469 2.5V0.5ZM0 2.5H1.95312V0.5H0V2.5ZM5.85938 2.5H9.76562V0.5H5.85938V2.5ZM13.6719 2.5H17.5781V0.5H13.6719V2.5ZM21.4844 2.5H25.3906V0.5H21.4844V2.5ZM29.2969 2.5H33.2031V0.5H29.2969V2.5ZM37.1094 2.5H41.0156V0.5H37.1094V2.5ZM44.9219 2.5H48.8281V0.5H44.9219V2.5ZM52.7344 2.5H56.6406V0.5H52.7344V2.5ZM60.5469 2.5H62.5V0.5H60.5469V2.5Z'
              fill='#8551F3'
            />
          </svg>
          <Image
            src='/welcome/Framenull2.svg'
            alt='welcome'
            width={60}
            height={60}
            className='h-auto w-[60px]'
            priority
          />
        </div>
        <h1 className='text-center text-[48px] font-[600] text-[#17161B]'>
          Welcome to ProDream
        </h1>
        <p className='text-center text-[24px] font-[400] text-[#525252]'>
          Personalize your writing experience. Write faster and better than
          ever.
        </p>
        <div className='mt-[98px] flex w-full justify-center gap-x-[40px]'>
          {datalist.map((item, index) => (
            <Link href={'/welcome/features'} key={item.name}>
              <div className='h-[500px] w-[360px] cursor-pointer rounded-[22px] border-[2px] border-[#D4D3D8] px-[20px] py-[36px]'>
                <h5 className='text-center text-[32px] font-[500] text-[#3B3A40]'>
                  {item.name}
                </h5>
                <Spacer y='37' />
                <Image
                  src={item.src}
                  alt='welcome'
                  width={301}
                  height={211}
                  className='h-auto w-[301px]'
                  priority
                />
                <Spacer y='37' />
                <p className='w-full text-center text-[24px] font-[300] text-[#525252]'>
                  {item.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AnimatedLayout>
  );
}
