'use client';

import Spacer from '@/components/root/Spacer';
import { Prompt } from '@/types/outline';
import { Loader2 } from 'lucide-react';
import { memo, useCallback, useMemo, useState } from 'react';

import { Separator } from '@/components/ui/separator';
import { useGetDraftOutline } from '@/query/draft';
import { Draft } from '@/types/draft';
import Markdown from 'react-markdown';
import RegenerateDraftButton from './RegenerateDraftButton';
import SelectOtherButton from './SelectOtherButton';

type Props = { prompts: Prompt[]; data: Draft };

const RegenerateDraftSidebar = ({ prompts, data }: Props) => {
  const [newOutline, setNewOutline] = useState<string>(data.outline_id);
  const [newPrompt, setNewPrompt] = useState<string>(data.prompt_id);
  const { data: outline, isPending } = useGetDraftOutline(data.outline_id);
  const promptTitle = useMemo(
    () => prompts.find((item) => item.id === newPrompt)?.title,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [prompt]
  );

  const updateOutline = useCallback((outline_id: string) => {
    setNewOutline(outline_id);
  }, []);

  const updatePrompt = useCallback((prompt_id: string) => {
    setNewPrompt(prompt_id);
  }, []);

  return (
    <aside className='flex h-full w-[272px] flex-col rounded-bl-lg border-r border-zinc-200 p-4'>
      <h2 className='base-medium'>Prompt</h2>
      <Spacer y='4' />
      <span className='small-regular w-full rounded-md bg-slate-100 p-2 text-zinc-600'>
        {promptTitle}
      </span>
      <Spacer y='16' />
      <div className='flex items-center justify-between'>
        <h2 className='base-medium'>Outlines</h2>
        <SelectOtherButton
          prompts={prompts}
          defaultPrompt={data.prompt_id}
          defaultOutline={data.outline_id}
          setPrompt={updatePrompt}
          setOutline={updateOutline}
        />
      </div>
      <Spacer y='16' />
      <div className='flex flex-1 flex-col gap-y-1 overflow-y-auto'>
        <Separator orientation='horizontal' className='bg-zinc-300' />
        {isPending ? (
          <span className='flex-center flex-1'>
            <Loader2 className='animate-spin text-indigo-500' />
          </span>
        ) : (
          <Markdown className='prose prose-sm prose-p:my-1 prose-ol:my-1 prose-ul:my-1'>
            {outline?.content}
          </Markdown>
        )}
      </div>
      <Spacer y='16' />
      <RegenerateDraftButton outline={newOutline} prompt={newPrompt} />
    </aside>
  );
};

export default memo(RegenerateDraftSidebar);
