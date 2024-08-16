import { ReactNode } from 'react';

export default function InfoLayout({ children }: { children: ReactNode }) {
  return (
    <div className='hidden size-full bg-gradient-to-b from-[#c9d7f7] to-[#f2f0ff] md:flex md:flex-col'>
      {children}
    </div>
  );
}
