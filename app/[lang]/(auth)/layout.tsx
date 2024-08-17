import { Locale } from '@/i18n-config';
import Image from 'next/image';
import { ReactNode } from 'react';

export default async function AuthLayout({
  children,
  params: { lang },
}: {
  children: ReactNode;
  params: { lang: Locale };
}) {
  return (
    <div className='relative flex size-full overflow-auto sm:flex-row'>
      {children}
      <div className='relative flex h-screen w-1/2 flex-col gap-y-5'>
        <div className='flex h-[11%] w-full gap-5'>
          <div className='w-[18%] flex-none rounded-br-[28px] bg-gray-100'></div>
          <div className='flex-between flex w-[30%] rounded-b-[28px] bg-gray-100 p-0.5'>
            <span className='w-1/3'></span>
            <span className='h-full w-1/3 rounded-[28px] bg-white/50'></span>
            <span className='h-full w-1/3 rounded-[28px] bg-white'></span>
          </div>
          <div className='flex-between flex w-[30%] rounded-b-[28px] bg-gray-100 p-0.5'>
            <span className='h-full w-1/3 rounded-[28px] bg-white/20'></span>
            <span className='w-1/3'></span>
            <span className='h-full w-1/3 rounded-[28px] bg-white/70'></span>
          </div>
          <div className='w-[18%] flex-none rounded-bl-[28px] bg-gray-100'></div>
        </div>

        {/* 第二行 */}
        <div className='flex h-[26%] w-full gap-5'>
          <div className='w-[18%] flex-none rounded-br-[28px] rounded-tr-[28px] bg-gray-100'></div>
          <div className='flex w-[30%] overflow-hidden rounded-[28px] bg-gray-100'>
            <Image
              alt='auth'
              src='/auth/auth_grid_1.png'
              width={500}
              height={500}
              priority
              className='size-full rounded-[28px]'
            />
          </div>
          <div className='flex w-[30%] rounded-[28px] bg-gray-100'>
            <Image
              alt='auth'
              src='/auth/auth_grid_2.png'
              width={500}
              height={500}
              priority
              className='size-full rounded-[28px]'
            />
          </div>
          <div className='w-[18%] flex-none rounded-bl-[28px] rounded-tl-[28px] bg-gray-100'></div>
        </div>

        {/* 第三行 */}
        <div className='flex h-[26%] w-full gap-5'>
          <div className='w-[18%] flex-none rounded-br-[28px] rounded-tr-[28px] bg-gray-100'></div>
          <div className='flex w-[30%] rounded-[28px] bg-gray-100'>
            <Image
              alt='auth'
              src='/auth/grid_bg_left.png'
              width={500}
              height={500}
              priority
              className='size-full rounded-[28px]'
            />
          </div>
          <div className='flex w-[30%] rounded-[28px] bg-gray-100'>
            <Image
              alt='auth'
              src='/auth/grid_bg_right.png'
              width={500}
              height={500}
              priority
              className='size-full rounded-[28px]'
            />
          </div>
          <div className='w-[18%] flex-none rounded-bl-[28px] rounded-tl-[28px] bg-gray-100'></div>
        </div>

        {/* 第四行 */}
        <div className='flex h-[26%] w-full gap-5'>
          <div className='w-[18%] flex-none rounded-br-[28px] rounded-tr-[28px] bg-gray-100'></div>
          <div className='flex w-[30%] rounded-[28px] bg-gray-100'>
            <Image
              alt='auth'
              src='/auth/auth_grid_3.png'
              width={500}
              height={500}
              priority
              className='size-full rounded-[28px]'
            />
          </div>
          <div className='flex w-[30%] rounded-[28px] bg-gray-100'>
            <span className='flex-center size-full rounded-[28px] bg-indigo-500'>
              <Image
                alt='auth'
                src='/logo/logo_square.svg'
                width={100}
                height={100}
                priority
                className='size-20'
              />
            </span>
          </div>
          <div className='w-[18%] flex-none rounded-bl-[28px] rounded-tl-[28px] bg-gray-100'></div>
        </div>

        {/* 第五行 */}
        <div className='flex h-[11%] w-full gap-5'>
          <div className='w-[18%] flex-none rounded-tr-[28px] bg-gray-100'></div>
          <div className='flex w-[30%] rounded-t-[28px] bg-gray-100 p-0.5'>
            <span className='h-full w-1/3 rounded-[28px] bg-white/70'></span>
          </div>
          <div className='flex w-[30%] rounded-t-[28px] bg-gray-100 p-0.5'>
            <span className='h-full w-1/3 rounded-[28px] bg-white/20'></span>
            <span className='w-1/3'></span>
            <span className='h-full w-1/3 rounded-[28px] bg-white/70'></span>
          </div>
          <div className='flex w-[18%] rounded-tl-[28px] bg-gray-100 p-0.5'>
            <span className='h-full w-1/2 rounded-[28px] bg-white/70'></span>
          </div>
        </div>
      </div>
    </div>
  );
}
