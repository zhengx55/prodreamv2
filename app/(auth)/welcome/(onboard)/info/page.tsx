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
      src: '/welcome/wel1.svg',
    },
    {
      name: 'Masters or MBA',
      desc: `Graduate studying a Masters or MBAprogram`,
      src: '/welcome/wel2.svg',
    },
    {
      name: 'PhD & Beyond',
      desc: `Doctorate student or researcher`,
      src: '/welcome/wel3.svg',
    },
  ];
  return (
    <AnimatedLayout>
      <div className='relative h-max w-full bg-[#fff] py-[100px]'>
        <div className='absolute right-[137px] top-[-100px] flex items-center gap-x-1 text-[18px] font-[500] text-[#8551F3]'>
          <Link href={'/welcome/features'}>Skip for now</Link>
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
              <div className='flex h-[500px] w-[360px] cursor-pointer flex-col items-center rounded-[22px] border-[2px] border-[#D4D3D8] px-[20px] py-[36px] hover:bg-[#F8F9FC]'>
                <h5 className='text-center text-[32px] font-[500] text-[#3B3A40]'>
                  {item.name}
                </h5>
                <Spacer y='37' />
                <Image
                  src={item.src}
                  alt='welcome'
                  width={194}
                  height={205}
                  className='h-auto w-[194px]'
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
