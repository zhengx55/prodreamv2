import {
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { useCitation } from '@/zustand/store';
import { memo } from 'react';

const NavbarDropdown = () => {
  const setCitationStyle = useCitation((state) => state.updateCitationStyle);
  return (
    <DropdownMenuContent
      side='bottom'
      align='center'
      sideOffset={2}
      className='min-w-[4rem] rounded bg-white'
    >
      <DropdownMenuItem
        onClick={(e) => {
          e.stopPropagation();
          setCitationStyle('MLA');
        }}
        className='flex cursor-pointer justify-center text-shadow hover:bg-gray-200'
      >
        MLA
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={(e) => {
          e.stopPropagation();
          setCitationStyle('APA');
        }}
        className='flex cursor-pointer justify-center text-shadow hover:bg-gray-200'
      >
        APA
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={(e) => {
          e.stopPropagation();
          setCitationStyle('IEEE');
        }}
        className='flex cursor-pointer justify-center text-shadow hover:bg-gray-200'
      >
        IEEE
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={(e) => {
          e.stopPropagation();
          setCitationStyle('Chicago');
        }}
        className='flex cursor-pointer justify-center text-shadow hover:bg-gray-200'
      >
        Chicago
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};
export default memo(NavbarDropdown);
