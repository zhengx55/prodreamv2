import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Download, MoreVertical, Settings, Shuffle } from 'lucide-react';

type Props = {};

const NavbarDropdown = ({}: Props) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <span className='flex-center h-10 w-10 cursor-pointer rounded-md bg-shadow-border hover:opacity-50'>
            <MoreVertical size={18} />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side='bottom'
          align='end'
          sideOffset={2}
          className='bg-white'
        >
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
            }}
            className='flex cursor-pointer gap-x-2 text-shadow hover:bg-shadow-50'
          >
            <Settings size={16} /> Export
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
            }}
            className='flex cursor-pointer gap-x-2 text-shadow hover:bg-shadow-50'
          >
            <Download size={16} /> Settings
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
            }}
            className='flex cursor-pointer gap-x-2 text-shadow hover:bg-shadow-50'
          >
            <Shuffle size={16} /> Citation Style
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
export default NavbarDropdown;
