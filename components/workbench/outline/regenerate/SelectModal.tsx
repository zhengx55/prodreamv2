import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetMaterials } from '@/query/outline/query';
import { Prompt } from '@/types/outline/types';
import { Loader2, SearchIcon } from 'lucide-react';
import { memo, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { MaterialCard, MaterialPagination } from '../modal/GenerateModal';

type Props = {
  prompts: Prompt[];
  defaultPrompt: string;
  defaultMaterials: string[];
  setMaterials: (material: string[]) => void;
  setPrompt: (prompt_id: string) => void;
};

const SelectModal = ({
  prompts,
  defaultPrompt,
  defaultMaterials,
  setMaterials,
  setPrompt,
}: Props) => {
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('');
  const [selectedMaterials, setSelectedMaterials] =
    useState<string[]>(defaultMaterials);
  const [selectedPrompt, setSelectedPrompt] = useState<string>(defaultPrompt);
  const { data: materials, isLoading: materialLoading } = useGetMaterials(
    query,
    page
  );

  const debounced = useDebouncedCallback((value) => {
    setQuery(value);
  }, 500);
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
      <div className='flex-between w-full'>
        <h2 className='text-xl font-medium'>Select Materials</h2>
        <div className='relative flex w-72 items-center rounded-lg border border-zinc-200 px-2.5'>
          <SearchIcon size={18} color='#726fe7' />
          <Input
            type='search'
            name='search'
            defaultValue={query}
            placeholder='Search Material...'
            className='border-none focus-visible:ring-0'
            onChange={(e) => debounced(e.target.value)}
          />
        </div>
      </div>
      <Spacer y='8' />
      <div className='rounded-lg bg-slate-100 px-2 pt-2'>
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
                <MaterialCard
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
          <MaterialPagination
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
        <DialogClose asChild>
          <Button
            disabled={
              selectedMaterials.length === 0 || selectedMaterials.length > 5
            }
            onClick={() => {
              setMaterials(selectedMaterials);
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
