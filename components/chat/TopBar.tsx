'use client';
import { useOnboarding } from '@/zustand/store';
import Image from 'next/image';

const NavItem = ({ icon, label }: { icon: string; label: string }) => {
  const { selectedNavItem, setSelectedNavItem } = useOnboarding((state) => ({
    selectedNavItem: state.selectedNavItem,
    setSelectedNavItem: state.setSelectedNavItem,
  }));

  const isSelected = selectedNavItem === label;

  return (
    <div
      className={`flex cursor-pointer items-center space-x-2 rounded-[8px] px-6 py-2 ${
        isSelected
          ? 'bg-white bg-opacity-60 px-6 shadow-md'
          : 'hover:bg-white hover:bg-opacity-60 hover:px-6 hover:shadow-md'
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
  <div className='bg-secondary flex justify-center py-6 pr-5'>
    <div className='flex h-12 w-full flex-shrink-0 flex-col items-center justify-center gap-2 rounded-lg'>
      <div className='flex w-full justify-center space-x-4'>
        <NavItem icon='/workbench/nav_chat.svg' label='Chat' />
        <NavItem
          icon='/workbench/nav_brainstorming.svg'
          label='Brainstorming'
        />
        <NavItem icon='/workbench/nav_outline.svg' label='Outline' />
        <NavItem icon='/workbench/nav_draftproofread.svg' label='Proofread' />
      </div>
    </div>
  </div>
);

export default TopBar;
