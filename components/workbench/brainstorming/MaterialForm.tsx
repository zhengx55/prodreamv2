'use client';

import Icon from '@/components/root/Icon';
import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useGetMaterialSuggestion } from '@/query/material';
import { ThemeType } from '@/types/brainstorm';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { memo, useCallback, useState } from 'react';
import { createMaterial, updateMaterial } from './server_actions/actions';

const GetSuggestionModal = dynamic(() => import('./GetSuggestionModal'));

type Props = {
  defaultContent?: string;
  defaultTitle?: string;
  defaultTheme?: string;
  type: 'update' | 'create';
  id?: string;
  themes: ThemeType[];
};

const MaterialForm = ({
  defaultContent,
  defaultTitle,
  defaultTheme,
  type,
  id,
  themes,
}: Props) => {
  const [title, setTitle] = useState(defaultTitle || '');
  const [theme, setTheme] = useState(defaultTheme || themes[0].id);
  const { push } = useRouter();
  const titleLenght = title.trim().split(/\s+/).filter(Boolean).length;
  const boundCreateMaterial = createMaterial.bind(null, theme);
  const queryClient = useQueryClient();
  const {
    execute: create,
    isExecuting: isCreating,
    result,
  } = useAction(boundCreateMaterial, {
    onSuccess: async () => {
      const { toast } = await import('sonner');
      toast.success('Material created successfully');
      queryClient.invalidateQueries({
        queryKey: ['getMaterials'],
      });
      push('/brainstorming');
    },
  });
  const boundUpdateMaterial = updateMaterial.bind(null, id ?? '', theme);
  const {
    execute: update,
    isExecuting: isUpdating,
    result: updateResult,
  } = useAction(boundUpdateMaterial, {
    onSuccess: async () => {
      const { toast } = await import('sonner');
      toast.success('Material updated successfully');
      queryClient.invalidateQueries({
        queryKey: ['getMaterials'],
      });
      push('/brainstorming');
    },
  });

  const { mutation, content, setContent, contentLenght } =
    useGetMaterialSuggestion(defaultContent);
  const handleSuggestion = useCallback(
    (promptId: string) => {
      mutation.mutate({
        prompt_id: promptId,
        material_content: content,
      });
    },
    [content, mutation]
  );

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
      className='bott flex flex-1 flex-col gap-y-6 pt-4'
    >
      <div className='relative flex flex-col gap-y-2 px-4'>
        <label htmlFor='theme' className='text-base font-medium text-zinc-600'>
          Theme
        </label>
        <Select value={theme} name='theme' onValueChange={setTheme}>
          <div className='space-y-2 rounded-lg border border-gray-300 bg-white p-2'>
            <SelectTrigger id='theme' className='base-regular border-none'>
              {themes.find((t) => t.id === theme)?.title}
            </SelectTrigger>
            <Separator orientation='horizontal' className='bg-slate-300' />
            <div className='space-y-1 rounded-lg bg-slate-100 p-2.5'>
              <p className='small-regular text-neutral-400'>
                {themes.find((t) => t.id === theme)?.description}
              </p>
              <p className='small-regular text-neutral-400'>
                <span className='text-indigo-500'>Example: </span>
                {themes.find((t) => t.id === theme)?.example}
              </p>
            </div>
          </div>

          <SelectContent className='bg-white'>
            {themes.map((theme) => (
              <SelectItem
                className='base-regular h-9 rounded-lg text-zinc-600 hover:bg-slate-200'
                key={theme.id}
                value={theme.id}
              >
                {theme.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className='relative flex flex-col gap-y-2 px-4'>
        <p
          className={`${titleLenght > 50 ? 'text-red-500' : 'text-zinc-500'} small-regular absolute bottom-2.5 right-6`}
        >
          {titleLenght}/50
        </p>
        <label htmlFor='title' className='text-base font-medium text-zinc-600'>
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
          className={`w-full ${result.validationErrors?.title || updateResult.validationErrors?.title ? 'border-red-400' : 'border-gray-300'} border pl-4 pr-14 focus-visible:ring-0`}
        />
      </div>
      <div className='relative flex flex-col gap-y-2 px-4'>
        <p
          className={`${contentLenght > 1000 ? 'text-red-500' : 'text-zinc-500'} small-regular absolute bottom-1.5 right-6`}
        >
          {contentLenght}/1000
        </p>
        <div className='flex-between'>
          <label
            htmlFor='content'
            className='text-base font-medium text-zinc-600'
          >
            Content
          </label>
          <Dialog>
            <DialogTrigger asChild>
              {mutation.isPending ? (
                <Loader2 className='animate-spin text-indigo-500' />
              ) : (
                <Button type='button' variant={'ghost'} className='p-0'>
                  <Icon
                    alt='suggestions'
                    width={24}
                    height={24}
                    className='size-4'
                    priority
                    src={'/workbench/suggestions.svg'}
                  />
                  Get Suggestions
                </Button>
              )}
            </DialogTrigger>
            <GetSuggestionModal onSubmit={handleSuggestion} />
          </Dialog>
        </div>

        <Textarea
          name='content'
          id='content'
          placeholder='Fill in your content'
          value={content}
          onChange={(e) => {
            const { value } = e.target;
            setContent(value);
          }}
          className={`small-regular h-96 w-full border ${result.validationErrors?.content || updateResult.validationErrors?.content ? 'border-red-400' : 'border-gray-300'} pb-6 pr-6 focus-visible:ring-0`}
        />
      </div>
      <div className='absolute bottom-0 flex w-full justify-end gap-x-2 rounded-b-lg bg-white py-3 pr-4'>
        <Link href={'/brainstorming'}>
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
          disabled={isPending || mutation.isPending}
          type='submit'
          role='button'
          className='px-8'
        >
          {type === 'create' ? 'Create' : 'Confirm'}
        </Button>
      </div>
      <Spacer y='40' />
    </form>
  );
};

export default memo(MaterialForm);
