'use client';
import dynamic from 'next/dynamic';
import { useOnboarding } from '@/zustand/store';

const TopBar = dynamic(() => import('./TopBar'), { ssr: false });
const RightSideCommunicationArea = dynamic(
  () => import('./RightSideCommunicationArea'),
  { ssr: false }
);
const MiddleArticleArea = dynamic(() => import('./MiddleArticleArea'), {
  ssr: false,
});

const MainContent = () => {
  const { selectedNavItem } = useOnboarding((state) => ({
    selectedNavItem: state.selectedNavItem,
  }));

  return (
    <div className='flex flex-grow flex-col'>
      <TopBar />
      <div className='flex flex-grow'>
        {selectedNavItem === 'Chat' ? null : <MiddleArticleArea />}
        <RightSideCommunicationArea />
      </div>
    </div>
  );
};

export default MainContent;
