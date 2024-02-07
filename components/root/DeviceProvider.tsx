'use client';
import useWindowResize from 'beautiful-react-hooks/useWindowResize';
import Image from 'next/image';
import { useParams, usePathname } from 'next/navigation';
import { ReactNode, useState } from 'react';
import NavBar from '../landing/NavBar';
import Sidebar from './Sidebar';
import Spacer from './Spacer';
// const TutorialSheet = dynamic(() => import('@/components/tutorial'));

const DeviceProvider = ({ children }: { children: ReactNode }) => {
  const path = usePathname();
  const param = useParams();
  const isEssayDetail =
    Object.keys(param).length > 0 && path.includes('/editor');
  const [width, setWidth] = useState(window.innerWidth);
  const onWindowResize = useWindowResize();
  onWindowResize(() => {
    setWidth(window.innerWidth);
  });

  if (width <= 640) {
    return (
      <div className='flex flex-1 flex-col items-center bg-[#F6F4FF]'>
        <NavBar />
        <div className='relative h-[70%] w-full overflow-hidden'>
          <Image alt='mobile-banner' src='/Mobile.png' fill sizes='' />
        </div>
        <h1 className='px-2 text-center text-[28px] font-[600]'>
          Welcome to <span className='text-doc-primary'>Prodream!</span>
        </h1>
        <Spacer y='10' />
        <p className='px-2 text-center'>
          Mobile features are under development. Please log into your account on
          your computer to access full features
        </p>
      </div>
    );
  }
  return (
    <>
      {!isEssayDetail && <Sidebar />}
      <div className='relative flex h-full w-full flex-col overflow-x-auto overflow-y-hidden'>
        {children}
      </div>
    </>
  );
};
export default DeviceProvider;
