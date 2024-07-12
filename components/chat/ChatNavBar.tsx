import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

const NavItem = ({ icon, label }: { icon: string; label: string }) => (
  <div className='flex cursor-pointer items-center space-x-2'>
    <Image src={icon} alt={`${label} Icon`} width={24} height={24} />
    <span>{label}</span>
  </div>
);

const AIRobot = ({ avatar, name }: { avatar: string; name: string }) => (
  <div className='flex w-full cursor-pointer items-center justify-between'>
    <Image
      src={avatar}
      alt={`${name} Avatar`}
      width={26}
      height={26}
      className='rounded-full'
    />
    <span className='mx-2 flex-1 overflow-hidden text-ellipsis whitespace-nowrap'>
      {name}
    </span>
    <ChevronRight />
  </div>
);

const ChatNavBar = () => {
  return (
    <div className='bg-card text-card-foreground flex h-full w-full flex-col p-6'>
      <div className='flex flex-grow flex-col justify-start'>
        <div className='flex flex-col items-center space-y-4 p-4'>
          <AIRobot avatar='/logo/Logo.svg' name='John Doe' />
          <AIRobot avatar='/logo/Logo.svg' name='Jane Smith' />
          <AIRobot avatar='/logo/Logo.svg' name='Alexander Hamilton' />
        </div>
      </div>
      <div className='flex-shrink-0'>
        <div className='flex flex-col justify-end space-y-4 p-4'>
          <NavItem icon='/logo/Logo.svg' label='Home' />
          <NavItem icon='/logo/Logo.svg' label='History' />
          <NavItem icon='/logo/Logo.svg' label='Features' />
          <NavItem icon='/logo/Logo.svg' label='Memory' />
        </div>
      </div>
    </div>
  );
};

export default ChatNavBar;
