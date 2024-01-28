import {
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import useAiEditor from '@/zustand/store';
import { FileOutput } from 'lucide-react';
import { memo } from 'react';

const NavbarDropdown = ({ title }: { title: string }) => {
  const editor = useAiEditor((state) => state.editor_instance);
  const handleExportPdf = () => {};
  return (
    <DropdownMenuContent
      side='bottom'
      align='end'
      sideOffset={2}
      className='bg-white'
    >
      <DropdownMenuItem
        onClick={(e) => {
          e.stopPropagation();
          handleExportPdf();
        }}
        className='flex cursor-pointer gap-x-2 text-shadow hover:bg-shadow-50'
      >
        <FileOutput size={16} />
        Export
      </DropdownMenuItem>
      {/* <DropdownMenuItem
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='flex cursor-pointer gap-x-2 text-shadow hover:bg-shadow-50'
      >
        <Settings size={16} /> Settings
      </DropdownMenuItem> */}
    </DropdownMenuContent>
  );
};
export default memo(NavbarDropdown);
