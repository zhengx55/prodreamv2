'use client';
import { createDoc } from '@/query/api';
import { IDocDetail } from '@/query/type';
import { useMutation } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { memo, useCallback, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { toast } from 'sonner';
import Card from './Card';

const FileUploadModal = dynamic(() => import('./FileUploadModal'));
type Props = { history_list: IDocDetail[] };

const List = ({ history_list }: Props) => {
  const router = useRouter();
  const { ref, inView } = useInView();
  const [list, setList] = useState(history_list);
  const [page, setPage] = useState(1);
  const { mutateAsync: createNew } = useMutation({
    mutationFn: (params: { text?: string; file?: File }) =>
      createDoc(params.text, params.file),
    onSuccess: (data) => {
      router.push(`/writtingpal/polish/${data}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteListItem = useCallback((id: string) => {
    setList((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return (
    <ul
      role='list'
      className='grid w-full grid-flow-row grid-cols-5 gap-x-6 gap-y-8 px-6 2xl:grid-cols-6'
    >
      <li className='flex h-[250px] w-full flex-col gap-y-4'>
        <FileUploadModal />
        <button
          onClick={async () =>
            await createNew({ text: undefined, file: undefined })
          }
          className='flex-center h-1/2 w-full cursor-pointer gap-x-2 rounded-lg border border-shadow-border bg-transparent hover:opacity-50'
        >
          <Plus className='text-primary-200' size={20} />
          <p className='base-semibold'>New Essay</p>
        </button>
      </li>
      {list.map((item) => (
        <Link passHref href={`/writtingpal/polish/${item.id}`} key={item.id}>
          <Card deleteListItem={deleteListItem} item={item} />
        </Link>
      ))}
    </ul>
  );
};
export default memo(List);
