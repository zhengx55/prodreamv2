'use client';
import Icon from '@/components/root/Icon';

const RightSidebar = () => {
  const clickSidebarIcon = () => {
    console.log('clicked');
  };

  return (
    <div className='text-muted-foreground relative mx-6 mb-6 flex w-[370px] flex-col overflow-hidden rounded-lg border border-white bg-white bg-opacity-60 p-4 backdrop-blur-lg backdrop-filter'>
      <div className='absolute left-0 right-0 top-0 flex h-[40px] items-center justify-end bg-white bg-opacity-60 px-2'>
        <div onClick={clickSidebarIcon}>
          <Icon
            alt=''
            src='/editor/rightbar/layout-sidebar-ihset-reverse.svg'
            width={20}
            height={20}
            className='size-[20px] cursor-pointer'
          />
        </div>
      </div>
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
};

export default RightSidebar;
