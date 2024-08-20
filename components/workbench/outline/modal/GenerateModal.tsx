'use client';
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
import {
  useCreateOutline,
  useGetMaterials,
  useGetPrompts,
} from '@/query/outline';
import { Loader2 } from 'lucide-react';
import { memo, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import ModalOptionsCard from '../../common/ModalOptionsCard';
import ModalPaginations from '../../common/ModalPaginations';
import ModalSearch from '../../common/ModalSearch';

const Step = memo(({ number, title }: { number: number; title: string }) => (
  <div className='flex items-center gap-x-4'>
    <span className='flex-center size-[42px] rounded-full bg-indigo-500/20'>
      <span className='flex-center size-[34px] rounded-full bg-indigo-500 text-xl font-medium text-white'>
        {number}
      </span>
    </span>
    <h2 className='text-xl font-medium'>{title}</h2>
  </div>
));

const GenerateModal = ({ close }: { close: () => void }) => {
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('');
  const debounced = useDebouncedCallback((value) => {
    setQuery(value);
  }, 500);
  const { data: materials, isLoading: materialLoading } = useGetMaterials(
    query,
    page
  );
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState<string>('');
  const { data: prompts } = useGetPrompts();
  const { mutate: create, isPending } = useCreateOutline(close);
  const handleSubmit = () => {
    create({
      prompt_id: selectedPrompt,
      title: 'Untitled',
      material_ids: selectedMaterials,
    });
  };

  return (
    <DialogContent
      aria-describedby='dialog-content'
      className='flex flex-col gap-0 rounded-lg bg-white py-6 pl-7 pr-10 md:w-[978px]'
    >
      <DialogTitle className='hidden' />
      <DialogDescription className='hidden' />
      <Step number={1} title='Select Prompt' />
      <Spacer y='8' />
      <div className='relative w-[856px] self-end rounded-lg bg-slate-100 p-2'>
        <span className='absolute -left-8 top-0 h-[70px] w-0 border border-dashed border-indigo-100' />
        <Select value={selectedPrompt} onValueChange={setSelectedPrompt}>
          <SelectTrigger className='h-11 bg-white text-base'>
            <SelectValue placeholder='Select a prompt' />
          </SelectTrigger>
          <SelectContent className='bg-white'>
            {prompts?.map((prompt) => (
              <SelectItem
                className='base-regular h-9 rounded-lg text-zinc-600 hover:bg-slate-200'
                key={prompt.id}
                value={prompt.id}
              >
                {prompt.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Spacer y='16' />
      <ModalSearch query={query} setQuery={debounced}>
        <Step number={2} title='Select Materials' />
      </ModalSearch>
      <Spacer y='8' />
      <div className='w-[856px] self-end rounded-lg bg-slate-100 px-2 pt-2'>
        {materialLoading ? (
          <div className='flex-center h-[284px] w-full'>
            <Loader2 className='animate-spin text-indigo-500' size={24} />
          </div>
        ) : materials?.data.length === 0 ? (
          <div className='flex-center h-[284px] w-full'>
            <p className='title-medium'>No materials found.</p>
          </div>
        ) : (
          <div className='grid grid-cols-3 grid-rows-2 gap-2'>
            {materials?.data.map((material) => {
              const isSelected = selectedMaterials.includes(material.id);
              return (
                <ModalOptionsCard
                  key={material.id}
                  id={material.id}
                  title={material.title}
                  content={material.content}
                  isSelected={isSelected}
                  onSelect={(id: string) => {
                    setSelectedMaterials((prev) =>
                      isSelected
                        ? prev.filter((id) => id !== material.id)
                        : [...prev, material.id]
                    );
                  }}
                />
              );
            })}
          </div>
        )}
        <Spacer y='16' />
        {(materials?.total_page_count ?? 0) > 0 ? (
          <ModalPaginations
            page={page}
            setPage={setPage}
            totalPage={materials?.total_page_count ?? 0}
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
          disabled={
            !selectedPrompt ||
            selectedMaterials.length === 0 ||
            selectedMaterials.length > 5 ||
            isPending
          }
          onClick={handleSubmit}
          role='button'
          className='px-8'
        >
          {isPending ? 'Creating Outline' : `Create`}
        </Button>
      </div>
    </DialogContent>
  );
};

export default memo(GenerateModal);
