'use client';
import Icon from '@/components/root/Icon';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useMembershipInfo } from '@/hooks/useMemberShip';
import { createDoc } from '@/query/api';
import { DocPageDicType } from '@/types';
import { useTranslations } from 'next-intl';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Search } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, memo, useRef, useState } from 'react';

const FileUploadModal = dynamic(() => import('./FileUploadModal'));

type Props = DocPageDicType;
const SearchBar = ({ lang, t }: Props) => {
  const [isTyping, setIsTyping] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { data: usage } = useMembershipInfo();
  const trans = useTranslations('Editor');
  const transError = useTranslations('Error');
  const { mutateAsync: createNew } = useMutation({
    mutationFn: (params: { text?: string; title?: string; file?: File }) =>
      createDoc(params.text, params.title, params.file),
    onSuccess: (data) => {
      router.push(`/${lang}/editor/${data}?new=true`);
      queryClient.invalidateQueries({
        queryKey: ['membership'],
      });
      queryClient.invalidateQueries({
        queryKey: ['document_history_list'],
      });
    },
    onError: async (error) => {
      const toast = (await import('sonner')).toast;
      toast.error(error.message);
    },
  });

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    if (!e.target.value.trim()) {
      setIsTyping(false);
      params.delete('query');
      router.replace(`/${lang}/editor?${params.toString()}`);
    } else {
      setIsTyping(true);
    }
  };

  const handleSearch = () => {
    if (ref.current) {
      const params = new URLSearchParams(searchParams);
      if (ref.current.value) {
        params.set('query', ref.current.value);
      }
      router.replace(`/${lang}/editor?${params.toString()}`);
    }
  };

  const handleCreateScrath = async () => {
    if (usage?.free_times_detail.Document === 0) {
      const toast = (await import('sonner')).toast;
      const toastInfo = transError('You_have_reached_the_limit_of_creating_new_documents');
      toast.error(toastInfo);
      return;
    }
    await createNew({});
  };

  return (
    <div className='flex-between w-[1100px]'>
      <div className='flex w-full gap-x-4'>
        <button
          role='button'
          onClick={handleCreateScrath}
          className='flex-center h-14 w-52 cursor-pointer gap-x-2 rounded-lg bg-gradient-to-br from-fuchsia-600 via-purple-600 to-violet-500 hover:bg-violet-500 hover:bg-none'
        >
          <Plus className='text-white' size={20} />
          <p className='base-semibold text-white'>
            {trans('TopBar.New_Essay')}
          </p>
        </button>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              role='dialog'
              variant={'outline'}
              className='size-max cursor-pointer rounded-lg border border-gray-200 px-8 py-4 hover:shadow'
            >
              <Icon
                alt='upload'
                src='/editor/upload.svg'
                width={24}
                height={24}
                priority
                className='size-6'
              />
              <p className='base-semibold'>{trans('TopBar.Upload_Essay')}</p>
            </Button>
          </DialogTrigger>
          <FileUploadModal t={t} lang={lang} />
        </Dialog>
      </div>
      <div className='relative flex h-14 w-2/5 shrink-0 items-center rounded-lg border border-gray-200'>
        <Button
          disabled={!isTyping}
          onClick={handleSearch}
          className={`${
            isTyping
              ? 'bg-violet-500 text-white'
              : 'bg-zinc-300 text-neutral-400'
          } absolute right-2 h-10 w-10 rounded-xl p-1 `}
        >
          <Search size={22} />
        </Button>
        <Input
          ref={ref}
          autoFocus={searchParams.get('query') ? true : false}
          defaultValue={searchParams.get('query') ?? ''}
          onChange={handleKeywordChange}
          type='text'
          className='h-full w-full border-none pr-14 focus-visible:ring-0'
          name='search-essay'
          aria-label='Search'
          placeholder={trans('TopBar.Search')}
          onKeyDown={(e) => e.code === 'Enter' && handleSearch()}
        />
      </div>
    </div>
  );
};
export default memo(SearchBar);
