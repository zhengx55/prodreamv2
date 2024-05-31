import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IDocDetail } from '@/query/type';
import { MoreVertical, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
const DeleteModal = dynamic(() => import('./DeleteModal'));

type Props = {
  item: IDocDetail;
};

const HistoryDropDown = ({ item }: Props) => {
  const t = useTranslations('Editor');

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <span className='cursor-pointer rounded-md p-1 hover:bg-shadow-border'>
            <MoreVertical className='text-shadow' size={18} />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side='bottom'
          align='end'
          sideOffset={2}
          className='bg-white'
        >
          <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
            <DropdownMenuItem className='flex cursor-pointer gap-x-2 text-shadow hover:bg-shadow-50'>
              <Trash2 size={16} /> {t('HistoryDropDown.Delete')}
            </DropdownMenuItem>
          </DialogTrigger>

          {/* <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
            }}
            className='flex cursor-pointer gap-x-2 text-shadow hover:bg-shadow-50'
          >
            <Download size={16} /> Download
          </DropdownMenuItem> */}
          {/* <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              toggleMoveModal(true);
              setCurrentItem(item);
            }}
            className='flex cursor-pointer gap-x-2 text-shadow hover:bg-shadow-50'
          >
            <FolderSymlink size={16} /> Move
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteModal id={item.id} title={item.title} />
    </Dialog>
  );
};
export default HistoryDropDown;
