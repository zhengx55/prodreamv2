import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetOutlines } from '@/query/draft';
import { Prompt } from '@/types/outline';
import { Loader2 } from 'lucide-react';
import { memo, useState } from 'react';
import ModalOptionsCard from '../../common/ModalOptionsCard';
import ModalPaginations from '../../common/ModalPaginations';
import ModalSearch from '../../common/ModalSearch';

type Props = {
  prompts: Prompt[];
  defaultPrompt: string;
  defaultOutline: string;
  setOutline: (outline: string) => void;
  setPrompt: (prompt_id: string) => void;
};

const SelectModal = ({
  prompts,
  defaultPrompt,
  defaultOutline,
  setOutline,
  setPrompt,
}: Props) => {
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('');
  const [selectedOutline, setSelectedOutline] =
    useState<string>(defaultOutline);
  const [selectedPrompt, setSelectedPrompt] = useState<string>(defaultPrompt);
  const { data: outlines, isLoading: outlineLoading } = useGetOutlines(
    query,
    page
  );

  return (
    <DialogContent
      aria-describedby='dialog-content'
      className='flex flex-col gap-0 rounded-lg bg-white py-6 pl-7 pr-10 md:w-[978px]'
    >
      <DialogTitle className='hidden' />
      <DialogDescription className='hidden' />
      <h2 className='text-xl font-medium'>Select Prompt</h2>
      <Spacer y='8' />
      <Select value={selectedPrompt} onValueChange={setSelectedPrompt}>
        <SelectTrigger className='h-11 border-none bg-slate-50'>
          <SelectValue placeholder='Select a prompt' />
        </SelectTrigger>
        <SelectContent className='bg-white'>
          {prompts?.map((prompt) => (
            <SelectItem key={prompt.id} value={prompt.id}>
              {prompt.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Spacer y='16' />
      <ModalSearch query={query} setQuery={setQuery} label='Search Outlines' />
      <Spacer y='8' />
      <div className='rounded-lg bg-slate-100 px-2 pt-2'>
        {outlineLoading ? (
          <div className='flex-center h-[284px] w-full'>
            <Loader2 className='animate-spin text-indigo-500' size={24} />
          </div>
        ) : outlines?.data.length === 0 ? (
          <div className='flex-center h-[284px] w-full'>
            <p className='title-medium'>No outlines found.</p>
          </div>
        ) : (
          <div className='grid grid-cols-3 grid-rows-2 gap-2'>
            {outlines?.data.map((outline) => {
              const isSelected = selectedOutline === outline.id;
              return (
                <ModalOptionsCard
                  key={outline.id}
                  id={outline.id}
                  title={outline.title}
                  content={outline.content}
                  isSelected={isSelected}
                  isMarkdown
                  onSelect={(id: string) => {
                    setSelectedOutline(id);
                  }}
                />
              );
            })}
          </div>
        )}
        <Spacer y='16' />
        {(outlines?.total_page_count ?? 0) > 0 ? (
          <ModalPaginations
            page={page}
            setPage={setPage}
            totalPage={outlines?.total_page_count ?? 0}
          />
        ) : (
          <span className='flex h-8 shrink-0' />
        )}
        <Spacer y='16' />
      </div>
      <Spacer y='16' />
      <div className='flex w-full justify-end gap-x-2'>
        <DialogClose asChild>
          <Button role='button' className='px-8' variant={'secondary'}>
            Cancel
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button
            disabled={!selectedOutline}
            onClick={() => {
              setOutline(selectedOutline);
              setPrompt(selectedPrompt);
            }}
            role='button'
            className='px-8'
          >
            Confirm
          </Button>
        </DialogClose>
      </div>
    </DialogContent>
  );
};

export default memo(SelectModal);
