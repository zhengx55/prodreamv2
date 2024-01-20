import { DropdownMenuContent } from '@/components/ui/dropdown-menu';
import { memo } from 'react';

type Props = { items: { id: string; label: string }[] };

const GenerateDropdown = ({ items }: Props) => {
  return (
    <DropdownMenuContent className='w-[350px] rounded'>
      {items.map((subItem) => (
        <div
          className='group cursor-pointer px-2.5 py-2 capitalize text-doc-shadow hover:bg-doc-secondary hover:text-doc-primary'
          key={subItem.id}
        >
          {subItem.label}
        </div>
      ))}
    </DropdownMenuContent>
  );
};
export default memo(GenerateDropdown);
