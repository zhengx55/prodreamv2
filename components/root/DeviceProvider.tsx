'use client';
import useWindowResize from 'beautiful-react-hooks/useWindowResize';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { Button } from '../ui/button';
import Sidebar from './Sidebar';
import { Feedback } from './SvgComponents';
import Tooltip from './Tooltip';
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
    <main className='relative hidden flex-1 sm:flex'>
      <Tooltip side='right' tooltipContent='submit feedback'>
        <Link
          passHref
          href={'https://tally.so/r/3NovEO'}
          className='absolute bottom-[10%] left-2 z-50'
          target='_blank'
        >
          <Button className='rounded-xl bg-doc-secondary p-2.5' role='link'>
            <Feedback />
          </Button>
        </Link>
      </Tooltip>
      {!isEssayDetail && <Sidebar />}
      <div className='relative flex h-full w-full flex-col overflow-x-auto overflow-y-hidden'>
        {children}
      </div>
    </main>
  );
};
export default DeviceProvider;
