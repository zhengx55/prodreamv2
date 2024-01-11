'use client';
import useWindowResize from 'beautiful-react-hooks/useWindowResize';
import { useParams, usePathname } from 'next/navigation';
import { ReactNode, useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
// const TutorialSheet = dynamic(() => import('@/components/tutorial'));

const DeviceProvider = ({ children }: { children: ReactNode }) => {
  const path = usePathname();
  const param = useParams();
  const isEssayDetail =
    Object.keys(param).length > 0 && path.includes('writtingpal/polish');
  const [width, setWidth] = useState(window.innerWidth);
  const onWindowResize = useWindowResize();
  onWindowResize(() => {
    setWidth(window.innerWidth);
  });

  if (width <= 640) {
    return null;
  }
  return (
    <>
      {!isEssayDetail && <Sidebar />}
      <div className='relative hidden h-full w-full flex-col overflow-x-auto sm:flex sm:overflow-y-hidden'>
        {!isEssayDetail && <Navbar />}
        {/* <TutorialSheet /> */}
        {children}
      </div>
    </>
  );
};
export default DeviceProvider;
