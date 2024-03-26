import {
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { EdtitorDictType } from '@/types';
import { useAIEditor } from '@/zustand/store';
import { memo } from 'react';

type Props = {
  items: {
    title: any;
    id: string;
    label: string;
  }[];
  t: EdtitorDictType;
};

const GenerateDropdown = ({ items, t }: Props) => {
  const setGenerateTab = useAIEditor((state) => state.updateGenerateTab);
  return (
    <DropdownMenuContent hideWhenDetached className='w-[350px] rounded p-0'>
      {items.map((subItem) => (
        <DropdownMenuItem
          className='group cursor-pointer bg-white px-2.5 py-2 capitalize text-doc-shadow hover:bg-doc-secondary hover:text-doc-primary'
          key={subItem.id}
          onClick={() => setGenerateTab(subItem.title)}
        >
          {t.Generate[subItem.title as keyof typeof t.Generate] as any}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  );
};
export default memo(GenerateDropdown);
