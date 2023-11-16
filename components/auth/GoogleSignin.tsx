import Image from 'next/image';
import React from 'react';

const GoogleSignin = () => {
  return (
    <div className='flex-center w-64 cursor-pointer gap-x-2 self-center rounded-2xl border border-shadow-border py-2 transition-transform hover:-translate-y-1'>
      <Image
        src='/google.svg'
        alt='google'
        width={23}
        height={23}
        priority
        className='h-auto w-auto'
      />
      <h1 className='small-semibold text-black-200'>Google</h1>
    </div>
  );
};

export default GoogleSignin;
