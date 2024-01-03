'use client';
import Loading from '@/components/root/CustomLoading';
import { createDoc } from '@/query/api';
import { IEvaluationHistory } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { Plus, Upload } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { memo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { toast } from 'sonner';
import Card from './Card';

type Props = { history_list: IEvaluationHistory[] };

const List = ({ history_list }: Props) => {
  const router = useRouter();
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

  return (
    <InfiniteScroll
      dataLength={history_list.length}
      hasMore={false}
      next={() => {}}
      loader={<Loading />}
    >
      <div className='grid w-full grid-flow-row grid-cols-5 gap-x-6 gap-y-8 px-6 2xl:grid-cols-6'>
        <div className='flex h-[250px] w-full flex-col gap-y-4'>
          <span
            className='flex-center h-1/2 w-full cursor-pointer gap-x-2 rounded-lg hover:opacity-50'
            style={{
              background:
                'linear-gradient(132deg, #DC3DC1 1.6%, #9C2CF3 49.22%, #7A4EF6 91.53%)',
            }}
          >
            <Upload className='text-white' size={20} />
            <p className='base-semibold text-white'>Upload Essay</p>
          </span>
          <button
            onClick={async () =>
              await createNew({ text: undefined, file: undefined })
            }
            className='flex-center h-1/2 w-full cursor-pointer gap-x-2 rounded-lg border border-shadow-border bg-transparent hover:opacity-50'
          >
            <Plus className='text-primary-200' size={20} />
            <p className='base-semibold'>New Essay</p>
          </button>
        </div>
        {history_list.map((item) => (
          <Link passHref href={`/writtingpal/polish/${item.id}`} key={item.id}>
            <Card item={item} />
          </Link>
        ))}
      </div>
    </InfiniteScroll>
  );
};
export default memo(List);
