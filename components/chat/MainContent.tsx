import dynamic from 'next/dynamic';

const TopBar = dynamic(() => import('./TopBar'), { ssr: false });
const RightSideCommunicationArea = dynamic(
  () => import('./RightSideCommunicationArea'),
  { ssr: false }
);
const MiddleArticleArea = dynamic(() => import('./MiddleArticleArea'), {
  ssr: false,
});

const MainContent = () => {
  return (
    <div className='flex flex-grow flex-col'>
      <TopBar />
      <div className='flex flex-grow'>
        <MiddleArticleArea />
        <RightSideCommunicationArea />
      </div>
    </div>
  );
};

export default MainContent;
