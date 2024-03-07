'use client';
import { UploadGard } from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { createDoc } from '@/query/api';
import { useMembershipInfo } from '@/query/query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Search } from 'lucide-react';
import dynamic from 'next/dynamic';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, memo, useCallback, useRef, useState } from 'react';
import PromptView from '../modal/Prompt';
import useUpdateEffect from 'beautiful-react-hooks/useUpdateEffect';
const FileUploadModal = dynamic(() => import('./FileUploadModal'));

const SearchBar = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [showPromptView, setShowPromptView] = useState(false)
  const [docId, setDocId] = useState<string>('')
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { data: usage } = useMembershipInfo();
  const { mutateAsync: createNew } = useMutation({
    mutationFn: (params: { text?: string; title?: string; file?: File }) =>
      createDoc(params.text, params.title, params.file),
    onSuccess: (data) => {
      // TODO: 处理 prompt 

      setDocId(data);
      
      // router.push(`/editor/${data}`);
      // queryClient.invalidateQueries({
      //   queryKey: ['membership'],
      // });
      // queryClient.invalidateQueries({
      //   queryKey: ['document_history_list'],
      // });
    },
    onError: async (error) => {
      const toast = (await import('sonner')).toast;
      toast.error(error.message);
    },
  });

  const handlePromptFinish = useCallback(()=>{
    router.push(`/editor/${docId}`);
    queryClient.invalidateQueries({
      queryKey: ['membership'],
    });
    queryClient.invalidateQueries({
      queryKey: ['document_history_list'],
    });
  },[docId])

  useUpdateEffect(()=>{
    if (docId) {
      setShowPromptView(true)
    }
  },[docId])

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    if (!e.target.value.trim()) {
      setIsTyping(false);
      params.delete('query');
      replace(`${pathname}?${params.toString()}`);
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
      replace(`${pathname}?${params.toString()}`);
    }
  };

  const handleCreateScrath = async () => {
    if (usage?.free_times_detail.Document === 0) {
      const toast = (await import('sonner')).toast;
      toast.error('You have reached the limit of creating new documents');
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
          style={{
            background:
              'linear-gradient(132deg, #DC3DC1 1.6%, #9C2CF3 49.22%, #7A4EF6 91.53%)',
          }}
          className='rounded-lg cursor-pointer flex-center h-14 w-52 gap-x-2 hover:opacity-50'
        >
          <Plus className='text-white' size={20} />
          <p className='text-white base-semibold'>New Essay</p>
        </button>
        <Dialog>
          <DialogTrigger asChild>
            <span className='border rounded-lg cursor-pointer flex-center h-14 w-52 gap-x-2 border-shadow-border hover:opacity-50'>
              <UploadGard />
              <p className='base-semibold '>Upload Essay</p>
            </span>
          </DialogTrigger>
          <FileUploadModal />
        </Dialog>
      </div>
      <div className='relative flex items-center w-2/5 border rounded-lg h-14 shrink-0 border-shadow-border'>
        <Button
          disabled={!isTyping}
          onClick={handleSearch}
          className={`${
            isTyping
              ? 'bg-primary-200 text-white'
              : 'bg-shadow-border text-shadow'
          } flex-center absolute right-2 h-10 w-10 rounded-lg p-1 `}
        >
          <Search size={22} />
        </Button>
        <Input
          ref={ref}
          onChange={handleKeywordChange}
          type='text'
          className='w-full h-full border-none pr-14 focus-visible:ring-0'
          name='search-essay'
          aria-label='Search'
          placeholder='Search citation database'
        />
      </div>
      <PromptView id={docId} showPromptView={showPromptView} onFinish={handlePromptFinish} />
    </div>
  );
};
export default memo(SearchBar);
