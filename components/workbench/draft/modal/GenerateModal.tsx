'use client';
import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { useGenerateDraft, useGetOutlines } from '@/query/draft';
import { Loader2 } from 'lucide-react';
import { memo, useState } from 'react';
import ModalOptionsCard from '../../common/ModalOptionsCard';
import ModalPaginations from '../../common/ModalPaginations';
import ModalSearch from '../../common/ModalSearch';

const GenerateModal = ({ close }: { close: () => void }) => {
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('');

  const { data: outlines, isLoading: outlineLoading } = useGetOutlines(
    query,
    page
  );
  const [selectedOutline, setSelectedOutline] = useState<string>('');
  const { mutateAsync: create, isPending } = useGenerateDraft(close);
  const handleSubmit = async () => {
    await create({
      outline_id: selectedOutline,
    });
  };

  return (
    <DialogContent
      aria-describedby='dialog-content'
      className='flex flex-col gap-0 rounded-lg bg-white py-6 pl-7 pr-10 md:w-[978px]'
    >
      <DialogTitle className='hidden' />
      <DialogDescription className='hidden' />
      <ModalSearch query={query} setQuery={setQuery} label='Select Outline' />
      <Spacer y='8' />
      <div className='rounded-lg bg-slate-100 px-2 pt-2'>
        {outlineLoading ? (
          <div className='flex-center h-[284px] w-full'>
            <Loader2 className='animate-spin text-indigo-500' size={24} />
          </div>
        ) : outlines?.data.length === 0 ? (
          <div className='flex-center h-[284px] w-full'>
            <p className='title-medium'>No outline found.</p>
          </div>
        ) : (
          <div className='grid grid-cols-3 grid-rows-2 gap-2'>
            {outlines?.data.map((outline) => {
              const isSelected = selectedOutline === outline.id;
              return (
                <ModalOptionsCard
                  key={outline.id}
                  isMarkdown
                  id={outline.id}
                  title={outline.title}
                  content={outline.content}
                  isSelected={isSelected}
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
        <Button
          disabled={!selectedOutline || isPending}
          onClick={handleSubmit}
          role='button'
          className='px-8'
        >
          {isPending ? 'Creating Draft' : `Create`}
        </Button>
      </div>
    </DialogContent>
  );
};

export default memo(GenerateModal);
