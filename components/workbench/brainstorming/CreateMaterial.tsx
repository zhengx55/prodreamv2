'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAction } from 'next-safe-action/hooks';
import Link from 'next/link';
import { memo, useState } from 'react';
import { createMaterial } from './server_actions/actions';

const CreateMaterial = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const titleLenght = title.trim().split(/\s+/).filter(Boolean).length;
  const contentLenght = content.trim().split(/\s+/).filter(Boolean).length;
  const { execute, isExecuting, result } = useAction(createMaterial, {
    onSuccess: async () => {
      const { toast } = await import('sonner');
      toast.success('Material created successfully');
    },
  });
  return (
    <form action={execute} className='flex flex-1 flex-col gap-y-6 pt-4'>
      <div className='relative flex flex-col gap-y-2 px-4'>
        <label htmlFor='theme' className='text-xl font-medium text-zinc-600'>
          Theme
        </label>
      </div>
      <div className='relative flex flex-col gap-y-2 px-4'>
        <p
          className={`${titleLenght > 50 ? 'text-red-500' : 'text-zinc-500'} small-regular absolute bottom-2 right-6`}
        >
          {titleLenght}/50
        </p>
        <label htmlFor='title' className='text-xl font-medium text-zinc-600'>
          Title
        </label>
        <Input
          value={title}
          onChange={(e) => {
            const { value } = e.target;
            setTitle(value);
          }}
          id='title'
          type='text'
          name='title'
          placeholder='Fill in your title'
          className={`w-full ${result.validationErrors?.title ? 'border-red-400' : 'border-zinc-300'} border pl-4 pr-14 focus-visible:ring-0`}
        />
      </div>
      <div className='relative flex flex-col gap-y-2 px-4'>
        <p
          className={`${contentLenght > 1000 ? 'text-red-500' : 'text-zinc-500'} small-regular absolute bottom-1.5 right-6`}
        >
          {contentLenght}/1000
        </p>
        <label htmlFor='content' className='text-xl font-medium text-zinc-600'>
          Content
        </label>
        <Textarea
          name='content'
          id='content'
          placeholder='Fill in your content'
          value={content}
          onChange={(e) => {
            const { value } = e.target;
            setContent(value);
          }}
          className={`small-regular h-96 w-full border ${result.validationErrors?.content ? 'border-red-400' : 'border-zinc-300'} pb-6 pr-6 focus-visible:ring-0`}
        />
      </div>
      <div className='mt-auto flex w-full justify-end gap-x-2 bg-white py-3 pr-4'>
        <Link passHref href={'/brainstorming'}>
          <Button
            disabled={isExecuting}
            role='button'
            className='px-8'
            variant={'secondary'}
          >
            Cancel
          </Button>
        </Link>
        <Button
          disabled={isExecuting}
          type='submit'
          role='button'
          className='px-8'
        >
          Create
        </Button>
      </div>
    </form>
  );
};

export default memo(CreateMaterial);
