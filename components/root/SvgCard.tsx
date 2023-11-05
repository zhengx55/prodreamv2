'use client';

import { ReactNode } from 'react';
import SvgBackground from './SvgBackground';

type Props = { children: ReactNode };

const SvgCard = ({ children }: Props) => {
  return (
    <div className='relative flex h-[93px] w-[215px] flex-col items-center'>
      <SvgBackground className='absolute inset-0 z-0' />
      {children}
    </div>
  );
};

export default SvgCard;
