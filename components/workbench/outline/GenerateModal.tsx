'use client';
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
import { useGetMaterials, useGetPrompts } from '@/query/outline/query';
import { SearchIcon } from 'lucide-react';
import { ChangeEvent, memo, useState } from 'react';

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
  ({ id, title, content }: { id: string; title: string; content: string }) => (
    <div
      key={id}
      className='flex h-[158px] w-full cursor-pointer flex-col rounded-lg bg-white px-4 py-2.5 hover:opacity-50'
    >
      <div className='flex-between'>
        <h3 className='base-medium text-zinc-800'>{title}</h3>
      </div>
      <p className='small-regular line-clamp-4 text-zinc-600'>{content}</p>
    </div>
  )
);

const GenerateModal = (props: Props) => {
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('');
  const { data: materials, isLoading: materialLoading } = useGetMaterials(
    query,
    page
  );
  const { data: prompts, isLoading: promptLoading } = useGetPrompts();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
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
            placeholder='Search Material...'
            className='border-none focus-visible:ring-0'
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <Spacer y='8' />

      <div className='w-[856px] self-end rounded-lg bg-slate-50 p-2'>
        <div className='grid grid-cols-3 grid-rows-2 gap-2'>
          {materials?.data.map((material) => (
            <MaterialCard
              key={material.id}
              id={material.id}
              title={material.title}
              content={material.content}
            />
          ))}
        </div>
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
