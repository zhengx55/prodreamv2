export const RobotMessageLoading = () => {
  return (
    <div className='flex gap-x-1 self-start rounded-[20px] bg-shadow-200 px-3 py-4'>
      <span className='h-3 w-3 animate-bounce rounded-full bg-dot' />
      <span className='h-3 w-3 animate-bounce rounded-full bg-dot delay-100' />
      <span className='h-3 w-3 animate-bounce rounded-full bg-dot delay-200' />
    </div>
  );
};

export const MineMessagLoading = () => {
  return (
    <div className='flex gap-x-1 self-end rounded-[20px] border border-shadow-200 bg-white px-3 py-4'>
      <span className='h-3 w-3 animate-bounce rounded-full bg-dot' />
      <span className='h-3 w-3 animate-bounce rounded-full bg-dot delay-100' />
      <span className='h-3 w-3 animate-bounce rounded-full bg-dot delay-200' />
    </div>
  );
};
