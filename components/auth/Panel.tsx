import type { Locale } from '@/i18n-config';
import Image from 'next/image';
import { ReactNode } from 'react';
import Privacy from './Privacy';

const Panel = ({ children, lang }: { children: ReactNode; lang?: Locale }) => {
  return (
    <div className='relative flex h-full min-h-screen w-full flex-col bg-white px-4 md:w-1/2 md:items-center md:justify-center md:px-0'>
      <div className='absolute top-4 flex w-full md:top-16 md:w-[500px]'>
        <Image
          src='/logo/Prodream.png'
          width={140}
          height={30}
          alt='logo'
          className='h-auto w-40'
          priority
        />
      </div>
      {children}
      {lang !== 'cn' && <Privacy />}
    </div>
  );
};

export default Panel;
