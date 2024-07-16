import dynamic from 'next/dynamic';

const TopBar = dynamic(() => import('./TopBar'), { ssr: false });

const RightSidebar = () => (
  <div className='text-muted-foreground mx-6 mb-6 flex w-1/3 flex-col rounded-lg border border-white bg-white bg-opacity-60 p-4'>
    <div className='bg-card text-card-foreground mb-4 flex-grow rounded-lg p-4'></div>
    <div className='flex flex-col space-y-4'>
      <div className='mt-auto flex items-center space-x-2'>
        <input
          type='text'
          className='border-input flex-grow rounded-lg border p-2'
          placeholder='Type a message...'
        />
        <button className='bg-primary text-primary-foreground rounded-lg p-2'>
          Send
        </button>
      </div>
    </div>
  </div>
);

const RightArea = () => {
  return (
    <div className='flex flex-grow flex-col'>
      <TopBar />
      <div className='flex flex-grow'>
        <div className='mb-6 w-2/3 rounded-lg bg-white p-4'></div>
        <RightSidebar />
      </div>
    </div>
  );
};

export default RightArea;
