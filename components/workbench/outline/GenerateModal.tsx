'use client';
import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetMaterials, useGetPrompts } from '@/query/outline/query';
import { Loader2, SearchIcon } from 'lucide-react';
import { memo, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

type Props = {};

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

const MaterialCard = memo(
  ({
    id,
    title,
    content,
    isSelected,
    onSelect,
  }: {
    id: string;
    title: string;
    content: string;
    isSelected: boolean;
    onSelect: (id: string) => void;
  }) => (
    <div
      key={id}
      role='button'
      onClick={() => onSelect(id)}
      className={`${isSelected ? 'border-indigo-500' : 'border-transparent'} flex h-[138px] w-full cursor-pointer flex-col justify-between rounded-lg border bg-white px-4 py-2.5 hover:opacity-70`}
    >
      <div className='flex-between'>
        <h3 className='base-semibold line-clamp-1 max-w-[60%] text-zinc-800'>
          {title}
        </h3>
        <Checkbox name={title} checked={isSelected} className='rounded-md' />
      </div>
      <p className='line-clamp-4 text-sm leading-normal text-zinc-600'>
        {content}
      </p>
    </div>
  )
);

const MaterialPagination = memo(
  ({
    page,
    setPage,
    totalPage,
  }: {
    page: number;
    setPage: (page: number) => void;
    totalPage: number;
  }) => (
    <Pagination>
      <PaginationContent>
        {Array.from({ length: totalPage }).map((_, i) => (
          <PaginationItem
            key={i}
            onClick={() => setPage(i)}
            className={`${
              page === i
                ? 'bg-indigo-500 text-white'
                : 'bg-transparent text-zinc-600 hover:bg-slate-100'
            } flex-center size-8 cursor-pointer rounded-lg`}
          >
            {i + 1}
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  )
);

const GenerateModal = (props: Props) => {
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
  const { data: prompts, isLoading: promptLoading } = useGetPrompts();

  return (
    <DialogContent
      aria-describedby='dialog-content'
      className='flex flex-col gap-0 rounded-lg bg-white py-6 pl-7 pr-10 md:w-[978px]'
    >
      <DialogTitle className='hidden' />
      <DialogDescription className='hidden' />
      <Step number={1} title='Select Prompt' />
      <Spacer y='8' />
      <div className='w-[856px] self-end rounded-lg bg-slate-50 p-2'>
        <Select>
          <SelectTrigger className='h-11 bg-white'>
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
      </div>
      <Spacer y='16' />
      <div className='flex-between w-full'>
        <Step number={2} title='Selected Materials' />
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

      <div className='w-[856px] self-end rounded-lg bg-slate-50 px-2 pt-2'>
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
        <Button type='submit' role='button' className='px-8'>
          Create
        </Button>
      </div>
    </DialogContent>
  );
};

export default memo(GenerateModal);
