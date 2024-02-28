import {
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { useAIEditor } from '@/zustand/store';
import { memo } from 'react';

type Props = {
  items: { id: string; label: string }[];
};

const GenerateDropdown = ({ items }: Props) => {
  const setGenerateTab = useAIEditor((state) => state.updateGenerateTab);
  return (
    <DropdownMenuContent hideWhenDetached className='w-[350px] rounded p-0'>
      {items.map((subItem) => (
        <DropdownMenuItem
          className='group cursor-pointer bg-white px-2.5 py-2 capitalize text-doc-shadow hover:bg-doc-secondary hover:text-doc-primary'
          key={subItem.id}
          onClick={() => setGenerateTab(subItem.label)}
        >
          {subItem.label}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  );
};
export default memo(GenerateDropdown);
