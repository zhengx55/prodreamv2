'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAction } from 'next-safe-action/hooks';
import Link from 'next/link';
import { memo, useState } from 'react';
import { createMaterial, updateMaterial } from './server_actions/actions';
type Props = {
  defaultContent?: string;
  defaultTitle?: string;
  type: 'update' | 'create';
  id?: string;
};

const MaterialForm = ({ defaultContent, defaultTitle, type, id }: Props) => {
  const [title, setTitle] = useState(defaultTitle || '');
  const [content, setContent] = useState(defaultContent || '');
  const titleLenght = title.trim().split(/\s+/).filter(Boolean).length;
  const contentLenght = content.trim().split(/\s+/).filter(Boolean).length;
  const {
    execute: create,
    isExecuting: isCreating,
    result,
  } = useAction(createMaterial, {
    onSuccess: async () => {
      const { toast } = await import('sonner');
      toast.success('Material created successfully');
    },
  });
  const boundUpdateMaterial = updateMaterial.bind(null, id ?? '');
  const {
    execute: update,
    isExecuting: isUpdating,
    result: updateResult,
  } = useAction(boundUpdateMaterial, {
    onSuccess: async () => {
      const { toast } = await import('sonner');
      toast.success('Material updated successfully');
    },
  });

  const onActionHandler = (formData: FormData) => {
    if (type === 'create') {
      create(formData);
    } else {
      update(formData);
    }
  };

  const isPending = type === 'create' ? isCreating : isUpdating;

  return (
    <form
      action={onActionHandler}
      className='flex flex-1 flex-col gap-y-6 pt-4'
    >
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
          className={`w-full ${result.validationErrors?.title || updateResult.validationErrors?.title ? 'border-red-400' : 'border-zinc-300'} border pl-4 pr-14 focus-visible:ring-0`}
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
          className={`small-regular h-96 w-full border ${result.validationErrors?.content || updateResult.validationErrors?.content ? 'border-red-400' : 'border-zinc-300'} pb-6 pr-6 focus-visible:ring-0`}
        />
      </div>
      <div className='mt-auto flex w-full justify-end gap-x-2 bg-white py-3 pr-4'>
        <Link passHref href={'/brainstorming'}>
          <Button
            disabled={isPending}
            role='button'
            className='px-8'
            variant={'secondary'}
          >
            Cancel
          </Button>
        </Link>
        <Button
          disabled={isPending}
          type='submit'
          role='button'
          className='px-8'
        >
          {type === 'create' ? 'Create' : 'Update'}
        </Button>
      </div>
    </form>
  );
};

export default memo(MaterialForm);
