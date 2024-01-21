import {
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { memo } from 'react';

type Props = {
  items: { id: string; label: string }[];
  onClick: (value: string) => void;
};

const GenerateDropdown = ({ items, onClick }: Props) => {
  return (
    <DropdownMenuContent hideWhenDetached className='w-[350px] rounded p-0'>
      {items.map((subItem) => (
        <DropdownMenuItem
          className='group cursor-pointer bg-white px-2.5 py-2 capitalize text-doc-shadow hover:bg-doc-secondary hover:text-doc-primary'
          key={subItem.id}
          onClick={() => onClick(subItem.label)}
        >
          {subItem.label}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  );
};
export default memo(GenerateDropdown);
