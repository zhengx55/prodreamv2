'use client';
import { Button } from '@/components/ui/button';
import clearCachesByServerAction from '@/lib/revalidate';
import { formatTimestampToDateString } from '@/lib/utils';
import { deleteDoc } from '@/query/api';
import { IDocDetail } from '@/query/type';
import { useMutation } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
type Props = { item: IDocDetail };
const Card = ({ item }: Props) => {
  const { mutateAsync: deleteDocument } = useMutation({
    mutationFn: (doc_id: string) => deleteDoc(doc_id),
    onSuccess: () => {
      toast.success('Document deleted successfully');
      clearCachesByServerAction('/writtingpal/polish');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await deleteDocument(item.id);
  };
  return (
    <div className='flex h-[250px] w-full shrink-0 flex-col overflow-hidden rounded-lg border border-shadow-border hover:shadow-lg hover:brightness-95'>
      <div className='h-2/3 w-full rounded-t-lg bg-nav-selected px-3 py-2.5'>
        <p className='subtle-regular line-clamp-[8] text-shadow'>{item.text}</p>
      </div>
      <div className='flex h-1/3 w-full flex-col justify-between rounded-b-lg px-4 py-2'>
        <h1 className='small-semibold line-clamp-1'>
          {item.title === 'Untitled' ? 'Untitled Document' : item.title}
        </h1>
        <p className='subtle-regular text-shadow'>
          {formatTimestampToDateString(item.create_time)}
        </p>
        <Button
          onClickCapture={handleDelete}
          className='h-max w-max self-end p-1.5'
          variant={'white'}
        >
          <Trash2 size={18} className='text-shadow' />
        </Button>
      </div>
    </div>
  );
};
export default Card;
