import { ThreeDots } from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import clearCachesByServerAction from '@/lib/revalidate';
import { clonectivityListItem } from '@/query/api';
import { IActHistoryData } from '@/query/type';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

type Props = {
  item: IActHistoryData;
  toggleDelete: () => void;
};

const HistoryDropDown = ({ item, toggleDelete }: Props) => {
  const { mutateAsync: cloneItem } = useMutation({
    mutationFn: (id: string) => clonectivityListItem(id),
    onSuccess() {
      toast.success('Duplicate activity successfully');
      toggleDelete();
      clearCachesByServerAction('/writtingpal/activityList/history');
    },
    onError(error) {
      toast.error(error.message);
    },
  });
  const handleClone = async (id: string) => {
    await cloneItem(id);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} className='border border-shadow-border p-2'>
          <ThreeDots />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side='bottom'
        align='end'
        sideOffset={5}
        className='bg-white'
      >
        <DropdownMenuItem
          onClick={() => {
            handleClone(item.id);
          }}
          className='cursor-pointer hover:bg-shadow-50'
        >
          Duplicate list
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={toggleDelete}
          className='cursor-pointer hover:bg-shadow-50'
        >
          Delete list
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default HistoryDropDown;
