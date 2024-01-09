import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DocSortingMethods } from '@/types';
import { ArrowUpNarrowWide, CheckCircle2 } from 'lucide-react';

type Props = {
  sortingMethod: DocSortingMethods;
  setSortingMethod: (value: DocSortingMethods) => void;
};
const FilterDropdown = ({ sortingMethod, setSortingMethod }: Props) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <span className='cursor-pointer rounded-md bg-transparent p-1 hover:bg-shadow-border'>
            <ArrowUpNarrowWide />
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
              setSortingMethod('lastOpenedTime');
            }}
            className='flex cursor-pointer gap-x-2  hover:bg-shadow-50'
          >
            <CheckCircle2
              className={`${
                sortingMethod === 'lastOpenedTime' ? 'opacity-100' : 'opacity-0'
              } text-primary-200`}
              size={16}
            />
            <p
              className={`${
                sortingMethod === 'lastOpenedTime'
                  ? 'text-primary-200'
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
              } text-primary-200`}
              size={16}
            />
            <p
              className={`${
                sortingMethod === 'title' ? 'text-primary-200' : 'text-shadow'
              } small-regular`}
            >
              Title
            </p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
export default FilterDropdown;
