import {
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { useAIEditor } from '@/zustand/store';
import { memo } from 'react';

const NavbarDropdown = () => {
  const setCitationStyle = useAIEditor((state) => state.updateCitationStyle);
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
        className='flex cursor-pointer justify-center text-shadow hover:bg-shadow-50'
      >
        MLA
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={(e) => {
          e.stopPropagation();
          setCitationStyle('APA');
        }}
        className='flex cursor-pointer justify-center text-shadow hover:bg-shadow-50'
      >
        APA
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};
export default memo(NavbarDropdown);
