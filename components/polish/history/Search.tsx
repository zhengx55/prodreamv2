import { Input } from '@/components/ui/input';
import { createDoc } from '@/query/api';
import { useMutation } from '@tanstack/react-query';
import { Plus, Search } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { ChangeEvent, memo, useState } from 'react';
import { toast } from 'sonner';
const FileUploadModal = dynamic(() => import('./FileUploadModal'));

type Props = {
  keyword: string;
  setKeyword: (value: string) => void;
};
const SearchBar = ({ keyword, setKeyword }: Props) => {
  const [isTyping, setIsTyping] = useState(false);
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
  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    if (!e.target.value.trim()) {
      setIsTyping(false);
    } else {
      setIsTyping(true);
    }
  };
  return (
    <div className='flex-between w-[1100px]'>
      <div className='flex w-full gap-x-4'>
        <FileUploadModal />
        <button
          onClick={async () =>
            await createNew({ text: undefined, file: undefined })
          }
          className='flex-center h-14 w-52 cursor-pointer gap-x-2 rounded-lg border border-shadow-border bg-transparent hover:opacity-50'
        >
          <Plus className='text-primary-200' size={20} />
          <p className='base-semibold'>New Essay</p>
        </button>
      </div>
      <div className='relative flex h-14 w-2/5 shrink-0 items-center rounded-lg border border-shadow-border'>
        <div
          className={`${
            isTyping
              ? 'bg-primary-200 text-white'
              : 'bg-shadow-border text-shadow'
          } flex-center absolute right-2 h-10 w-10 rounded-xl `}
        >
          <Search size={22} />
        </div>
        <Input
          defaultValue={keyword}
          onChange={handleKeywordChange}
          type='text'
          className='h-full w-full border-none pr-14 focus-visible:ring-0'
          name='search-essay'
          aria-label='Search'
          placeholder='Search essay history ...'
        />
      </div>
    </div>
  );
};
export default memo(SearchBar);
