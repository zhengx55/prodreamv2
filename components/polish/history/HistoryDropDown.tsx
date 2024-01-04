import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IDocDetail } from '@/query/type';
import { Download, MoreVertical, Trash2 } from 'lucide-react';

type Props = {
  toggleDeleteModal: (value: boolean) => void;
  item: IDocDetail;
  setCurrentItem: (value: IDocDetail) => void;
};

const HistoryDropDown = ({
  toggleDeleteModal,
  item,
  setCurrentItem,
}: Props) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <span className='rounded-md p-1 hover:bg-shadow-border'>
            <MoreVertical className='text-shadow hover:opacity-50' size={18} />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side='bottom'
          align='end'
          sideOffset={10}
          className='bg-white'
        >
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              toggleDeleteModal(true);
              setCurrentItem(item);
            }}
            className='flex cursor-pointer gap-x-2 text-shadow hover:bg-shadow-50'
          >
            <Trash2 size={16} /> Delete
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
            }}
            className='flex cursor-pointer gap-x-2 text-shadow hover:bg-shadow-50'
          >
            <Download size={16} /> Download
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
export default HistoryDropDown;
