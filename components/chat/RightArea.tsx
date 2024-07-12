import Image from 'next/image';

const NavItem = ({ icon, label }: { icon: string; label: string }) => (
  <div className='flex cursor-pointer items-center space-x-2'>
    <Image src={icon} alt={`${label} Icon`} width={24} height={24} />
    <span>{label}</span>
  </div>
);

const TopBar = () => (
  <div className='bg-secondary flex justify-center space-x-4 p-4'>
    <div className='bg-secondary text-secondary-foreground flex justify-center space-x-4 rounded-3xl border border-white bg-white bg-opacity-60 p-3 shadow-md'>
      <NavItem icon='/logo/Logo.svg' label='Chat' />
      <NavItem icon='/logo/Logo.svg' label='Brainstorming' />
      <NavItem icon='/logo/Logo.svg' label='Personal Statement' />
      <NavItem icon='/logo/Logo.svg' label='Writing' />
      <NavItem icon='/logo/Logo.svg' label='Proofread' />
    </div>
  </div>
);

const RightSidebar = () => (
  <div className='text-muted-foreground mx-6 mb-6 flex w-1/3 flex-col rounded-lg border border-white bg-white bg-opacity-60 p-4'>
    <div className='bg-card text-card-foreground mb-4 flex-grow rounded-lg p-4'></div>
    <div className='flex flex-col space-y-4'>
      <NavItem icon='/logo/Logo.svg' label='Search' />
      <NavItem icon='/logo/Logo.svg' label='Upload Files' />
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
