import { ReactNode } from 'react';

const Panel = ({ children }: { children: ReactNode }) => {
  return (
    <div className='relative flex h-full w-full flex-col rounded-[0] bg-white px-[36px] py-[36px] md:w-1/2 md:items-center md:justify-center'>
      {children}
    </div>
  );
};

export default Panel;
