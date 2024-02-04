'use client';
import { UploadGard } from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { createDoc } from '@/query/api';
import { useMutation } from '@tanstack/react-query';
import { Plus, Search } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { ChangeEvent, memo, useRef, useState } from 'react';
import { toast } from 'sonner';
const FileUploadModal = dynamic(() => import('./FileUploadModal'));

const SearchBar = ({ setKeyword }: { setKeyword: (value: string) => void }) => {
  const [isTyping, setIsTyping] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);
  const { mutateAsync: createNew } = useMutation({
    mutationFn: (params: { text?: string; title?: string; file?: File }) =>
      createDoc(params.text, params.title, params.file),
    onSuccess: (data) => {
      router.push(`/writtingpal/polish/${data}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value.trim()) {
      setKeyword('');
      setIsTyping(false);
    } else {
      setIsTyping(true);
    }
  };
  return (
    <div className='flex-between w-[1100px]'>
      <div className='flex w-full gap-x-4'>
        <button
          onClick={async () => await createNew({})}
          style={{
            background:
              'linear-gradient(132deg, #DC3DC1 1.6%, #9C2CF3 49.22%, #7A4EF6 91.53%)',
          }}
          className='flex-center h-14 w-52 cursor-pointer gap-x-2 rounded-lg hover:opacity-50'
        >
          <Plus className='text-white' size={20} />
          <p className='base-semibold text-white'>New Essay</p>
        </button>
        <Dialog>
          <DialogTrigger asChild>
            <span className='flex-center h-14 w-52 cursor-pointer gap-x-2 rounded-lg border border-shadow-border hover:opacity-50'>
              <UploadGard />
              <p className='base-semibold '>Upload Essay</p>
            </span>
          </DialogTrigger>
          <FileUploadModal />
        </Dialog>
      </div>
      <div className='relative flex h-14 w-2/5 shrink-0 items-center rounded-lg border border-shadow-border'>
        <Button
          disabled={!isTyping}
          onClick={() => ref.current && setKeyword(ref.current.value)}
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
          className='h-full w-full border-none pr-14 focus-visible:ring-0'
          name='search-essay'
          aria-label='Search'
          placeholder='Search citation database'
        />
      </div>
    </div>
  );
};
export default memo(SearchBar);
