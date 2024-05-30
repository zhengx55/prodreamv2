import {
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { EditorDictType } from '@/types';
import { useAIEditor } from '@/zustand/store';
import { useTranslations } from 'next-intl';
import { memo } from 'react';

type Props = {
  items: {
    title: any;
    id: string;
    label: string;
  }[];
  t: EditorDictType;
};

const GenerateDropdown = ({ items, t }: Props) => {
  const setGenerateTab = useAIEditor((state) => state.updateGenerateTab);
  const trans = useTranslations('Editor');

  return (
    <DropdownMenuContent hideWhenDetached className='w-[350px] rounded p-0'>
      {items.map((subItem) => (
        <DropdownMenuItem
          className='group cursor-pointer bg-white px-2.5 py-2 capitalize text-zinc-600 hover:bg-slate-100 hover:text-violet-500'
          key={subItem.id}
          onClick={() => setGenerateTab(subItem.label)}
        >
          {trans(`Generate.${subItem.label}`)}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  );
};
export default memo(GenerateDropdown);
