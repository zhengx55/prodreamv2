'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAction } from 'next-safe-action/hooks';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { memo, useState } from 'react';
import { createMaterial } from './server_actions/actions';

const CreateMaterial = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');
  const titleLenght = title.trim().split(/\s+/).filter(Boolean).length;
  const contentLenght = content.trim().split(/\s+/).filter(Boolean).length;
  const router = useRouter();
  const { execute, isExecuting } = useAction(createMaterial, {
    onSuccess: async ({ data }) => {
      const { toast } = await import('sonner');
      toast.success(data?.message);
      router.back();
    },
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content) {
      setContentError('Content is required');
    }
    if (title && content && !titleError && !contentError) {
      execute({ title, content });
    }
  };
  return (
    <form onSubmit={handleSubmit} className='flex flex-1 flex-col gap-y-6 pt-4'>
      <div className='relative flex flex-col gap-y-2 px-4'>
        <label htmlFor='theme' className='text-xl font-medium text-zinc-600'>
          Theme
        </label>
      </div>
      <div className='relative flex flex-col gap-y-2 px-4'>
        <p
          className={`${titleError ? 'text-red-500' : 'text-zinc-500'} small-regular absolute bottom-2 right-6`}
        >
          {titleLenght}/50
        </p>
        <label htmlFor='title' className='text-xl font-medium text-zinc-600'>
          Title
        </label>
        <Input
          value={title}
          onChange={(e) => {
            if (titleError) setTitleError('');
            const { value } = e.target;
            setTitle(value);
            if (value.trim().split(/\s+/).filter(Boolean).length > 50)
              setTitleError('Title is limited to 50 words');
          }}
          id='title'
          type='text'
          placeholder='Fill in your title'
          className={`w-full ${titleError ? 'border-red-400' : 'border-zinc-300'} border pl-4 pr-14 focus-visible:ring-0`}
        />
      </div>
      <div className='relative flex flex-col gap-y-2 px-4'>
        <p
          className={`${contentError ? 'text-red-500' : 'text-zinc-500'} small-regular absolute bottom-1.5 right-6`}
        >
          {contentLenght}/1000
        </p>
        <label htmlFor='content' className='text-xl font-medium text-zinc-600'>
          Content
        </label>
        <Textarea
          id='content'
          placeholder='Fill in your content'
          value={content}
          onChange={(e) => {
            const { value } = e.target;
            if (contentError) setContentError('');
            if (value.trim().split(/\s+/).filter(Boolean).length > 1000)
              setContentError('Content is limited to 1000 words');
            setContent(value);
          }}
          className={`small-regular h-96 w-full border ${contentError ? 'border-red-400' : 'border-zinc-300'} pb-6 pr-6 focus-visible:ring-0`}
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
