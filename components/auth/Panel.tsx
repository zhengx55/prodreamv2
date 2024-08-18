import type { Locale } from '@/i18n-config';
import { ReactNode } from 'react';

const Panel = ({ children, lang }: { children: ReactNode; lang?: Locale }) => {
  return (
    <div className='relative flex min-h-screen w-full bg-white md:w-1/2 md:items-center md:justify-center md:px-0'>
      {children}
      {/* {lang !== 'cn' && <Privacy />} */}
    </div>
  );
};

export default Panel;
