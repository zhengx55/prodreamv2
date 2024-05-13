import Tooltip from '@/components/root/Tooltip';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DocSortingMethods } from '@/types';
import { ArrowUpNarrowWide, CheckCircle2 } from 'lucide-react';
import { memo } from 'react';

type Props = {
  sortingMethod: DocSortingMethods;
  setSortingMethod: (value: DocSortingMethods) => void;
};
const FilterDropdown = ({ sortingMethod, setSortingMethod }: Props) => {
  return (
    <DropdownMenu>
      <Tooltip side='bottom' tooltipContent='Sort by'>
        <DropdownMenuTrigger asChild>
          <Button role='button' variant={'icon'} className='size-max p-1'>
            <ArrowUpNarrowWide />
          </Button>
        </DropdownMenuTrigger>
      </Tooltip>
      <DropdownMenuContent
        side='bottom'
        align='end'
        sideOffset={2}
        className='bg-white'
      >
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            setSortingMethod('lastOpenedTime');
          }}
          className='flex cursor-pointer gap-x-2  hover:bg-shadow-50'
        >
          <CheckCircle2
            className={`${
              sortingMethod === 'lastOpenedTime' ? 'opacity-100' : 'opacity-0'
            } text-violet-500`}
            size={16}
          />
          <p
            className={`${
              sortingMethod === 'lastOpenedTime'
                ? 'text-violet-500'
                : 'text-shadow'
            } small-regular`}
          >
            Last opened
          </p>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            setSortingMethod('title');
          }}
          className='flex cursor-pointer gap-x-2 hover:bg-shadow-50'
        >
          <CheckCircle2
            className={`${
              sortingMethod === 'title' ? 'opacity-100' : 'opacity-0'
            } text-violet-500`}
            size={16}
          />
          <p
            className={`${
              sortingMethod === 'title' ? 'text-violet-500' : 'text-shadow'
            } small-regular`}
          >
            Title
          </p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default memo(FilterDropdown);
