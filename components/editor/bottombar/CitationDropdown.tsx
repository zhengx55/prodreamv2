import {
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { CitationOptions } from '@/constant';
import { ReferenceType } from '@/query/type';
import { useCitation } from '@/zustand/store';
import { memo } from 'react';
import { cn } from '../../../lib/utils';

const ItemClassName =
  'flex cursor-pointer justify-center text-shadow hover:bg-gray-200';

const NavbarDropdown = () => {
  const setCitationStyle = useCitation((state) => state.updateCitationStyle);
  return (
    <DropdownMenuContent
      side='bottom'
      align='center'
      sideOffset={2}
      className='min-w-[4rem] rounded bg-white'
    >
      {CitationOptions.map((style) => (
        <DropdownMenuItem
          key={style}
          onClick={(e) => {
            e.stopPropagation();
            setCitationStyle(style as ReferenceType);
          }}
          className={cn(
            ItemClassName,
            style === 'chicago' ? 'capitalize' : 'uppercase'
          )}
        >
          {style}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  );
};
export default memo(NavbarDropdown);
