'use client';
import Image from 'next/image';
import { useOnboarding } from '@/zustand/store';

const NavItem = ({ icon, label }: { icon: string; label: string }) => {
  const { selectedNavItem, setSelectedNavItem } = useOnboarding((state) => ({
    selectedNavItem: state.selectedNavItem,
    setSelectedNavItem: state.setSelectedNavItem,
  }));

  const isSelected = selectedNavItem === label;

  return (
    <div
      className={`flex cursor-pointer items-center space-x-2 rounded-[29px] px-6 ${
        isSelected
          ? 'bg-white bg-opacity-60 px-6 py-1 shadow-md'
          : 'hover:bg-white hover:bg-opacity-60 hover:px-6 hover:py-1 hover:shadow-md'
      }`}
      onClick={() => setSelectedNavItem(label)}
    >
      <Image src={icon} alt={`${label} Icon`} width={24} height={24} />
      <span
        className={`font-poppins text-base font-normal capitalize leading-5 tracking-[0.16px] text-[#57545E] ${
          isSelected
            ? 'font-medium leading-6 text-[#272330]'
            : 'group-hover:font-medium group-hover:leading-6 group-hover:text-[#272330]'
        }`}
      >
        {label}
      </span>
    </div>
  );
};

const TopBar = () => (
  <div className='bg-secondary flex justify-center py-4 pr-5'>
    <div className='flex h-12 w-full flex-shrink-0 flex-col items-center justify-center gap-2 rounded-lg border border-white bg-white bg-opacity-60 p-3 shadow-md'>
      <div className='flex w-full justify-center space-x-4'>
        <NavItem icon='/logo/Logo.svg' label='Chat' />
        <NavItem icon='/logo/Logo.svg' label='Brainstorming' />
        <NavItem icon='/logo/Logo.svg' label='Personal Statement' />
        <NavItem icon='/logo/Logo.svg' label='Writing' />
        <NavItem icon='/logo/Logo.svg' label='Proofread' />
      </div>
    </div>
  </div>
);

export default TopBar;
