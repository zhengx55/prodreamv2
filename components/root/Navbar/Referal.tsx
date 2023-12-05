import Link from 'next/link';
import React, { memo } from 'react';

const Referal = () => {
  return (
    <div className='rounded-lg bg-referal px-[1px] py-[1px]'>
      <Link
        href={'/profile/referrals'}
        className='block cursor-pointer rounded-lg bg-white px-3 py-1'
      >
        <div className='flex-between gap-x-2'>
          <p className='small-semibold'>
            Refer friends to redeem
            <span className='text-primary-200'>&nbsp;free&nbsp;</span>
            expert
            <br /> 1-on-1 advising session ✨
          </p>
          <div className='flex items-center'>
            <span className='relative z-0 -mr-2 h-4 w-[120px] rounded-lg bg-primary-50'>
              <span className='absolute inset-0 w-1/2 rounded-lg bg-gradient-to-r from-[#E3B8EE52] to-primary-200'></span>
            </span>
            <span className='flex-center z-10 h-7 w-7 rounded-full bg-primary-50'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
              >
                <path
                  d='M8.99805 2.99121C6.78905 2.99121 4.99805 4.78221 4.99805 6.99121H3.99805C3.44605 6.99121 2.99805 7.43921 2.99805 7.99121V10.9912H20.998V7.99121C20.998 7.43921 20.55 6.99121 19.998 6.99121H18.998C18.998 4.78221 17.207 2.99121 14.998 2.99121C13.787 2.99121 12.732 3.54722 11.998 4.39722C11.264 3.54722 10.209 2.99121 8.99805 2.99121ZM8.99805 4.99121C10.103 4.99121 10.998 5.88621 10.998 6.99121H6.99805C6.99805 5.88621 7.89305 4.99121 8.99805 4.99121ZM14.998 4.99121C16.103 4.99121 16.998 5.88621 16.998 6.99121H12.998C12.998 5.88621 13.893 4.99121 14.998 4.99121ZM3.99805 12.9912V16.9912C3.99805 19.2002 5.78905 20.9912 7.99805 20.9912H10.998V12.9912H3.99805ZM12.998 12.9912V20.9912H15.998C18.207 20.9912 19.998 19.2002 19.998 16.9912V12.9912H12.998Z'
                  fill='#9C2CF3'
                />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default memo(Referal);
