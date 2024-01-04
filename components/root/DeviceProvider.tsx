'use client';
import useWindowResize from 'beautiful-react-hooks/useWindowResize';
import dynamic from 'next/dynamic';
import { ReactNode, useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
const TutorialSheet = dynamic(() => import('@/components/tutorial'));

const DeviceProvider = ({ children }: { children: ReactNode }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const onWindowResize = useWindowResize();
  onWindowResize(() => {
    setWidth(window.innerWidth);
  });

  if (width <= 640) {
    return (
      <section className='relative flex h-full w-full overflow-y-auto sm:hidden'>
        {children}
      </section>
    );
  }
  return (
    <>
      <Sidebar />
      <div className='relative hidden h-full w-full flex-col overflow-x-auto sm:flex sm:overflow-y-hidden'>
        <Navbar />
        <TutorialSheet />
        {children}
      </div>
    </>
  );
};
export default DeviceProvider;
