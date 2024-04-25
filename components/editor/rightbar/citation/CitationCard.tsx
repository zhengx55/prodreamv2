import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { CitationTooltip } from '@/constant/enum';
import {
  useButtonTrack,
  useCiteToDoc,
  useCreateCitation,
  useMutateTrackInfo,
  useUserTrackInfo,
} from '@/query/query';
import { ICitation } from '@/query/type';
import { ICitationData, ICitationType } from '@/types';
import { useAIEditor, useCitation, useUserTask } from '@/zustand/store';
import { Plus, ReplyAll, Trash2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { memo } from 'react';
import { useEditorCommand } from '../../hooks/useEditorCommand';

const Tiplayout = dynamic(
  () => import('@/components/editor/guide/tips/Tiplayout')
);

const CitationPreview = dynamic(() => import('./CitationPreview'), {
  ssr: false,
});

export const SearchCitationCard = memo(
  ({ item, index }: { item: ICitation; index: number }) => {
    const { id } = useParams();
    const editor = useAIEditor((state) => state.editor_instance);
    const citation_tooltip_step = useUserTask((state) => state.citation_step);
    const updateCitationStep = useUserTask((state) => state.updateCitationStep);
    const { mutateAsync: updateTrack } = useMutateTrackInfo();
    const { data: track } = useUserTrackInfo();
    const { mutateAsync: handleCollect } = useCreateCitation();
    const { mutateAsync: handleCite } = useCiteToDoc();
    const { mutateAsync: ButtonTrack } = useButtonTrack();
    const handler = async (item: ICitation, action: 'cite' | 'collect') => {
      if (!track?.citation_task) {
        const { toast } = await import('sonner');
        toast.info(
          'In text citation will be append to the postion of your cursor!'
        );
        await updateTrack({
          field: 'citation_task',
          data: true,
        });
        await ButtonTrack({ event: 'Onboarding task: add citation' });
      }
      const { selection } = editor!.state;
      const { anchor } = selection;
      if (action === 'collect') {
        await handleCollect({
          document_id: id as string,
          url: item.pdf_url,
          citation_id: item.citation_id,
          snippet: item.snippet,
          citation_count: item.citation_count,
          in_text_pos: 0,
        });
      } else {
        await handleCite({
          document_id: id as string,
          url: item.pdf_url,
          citation_id: item.citation_id,
          snippet: item.snippet,
          citation_count: item.citation_count,
          in_text_pos: anchor,
        });
      }
    };
    return (
      <div key={item.article_title} className='group flex flex-col px-2'>
        <Dialog>
          <DialogTrigger asChild>
            <h1 className='base-semibold line-clamp-2 cursor-pointer hover:text-violet-500'>
              {item.article_title}&nbsp;{' '}
              {item.publish_date.year ? `(${item.publish_date.year})` : null}
            </h1>
          </DialogTrigger>
          <CitationPreview item={item} />
        </Dialog>
        <Spacer y='10' />
        <p className='subtle-regular line-clamp-2 text-zinc-500'>
          Authors: {item.publication}
        </p>
        <Spacer y='10' />
        <p className='small-regular line-clamp-3 text-zinc-600'>
          {item.snippet}
        </p>
        <Spacer y='15' />
        <div className='flex items-center justify-between'>
          <p className='small-regular text-violet-500'>
            Cited by {item.citation_count}
          </p>
          <div className='flex items-center gap-x-2'>
            {citation_tooltip_step === 3 && index === 0 ? (
              <Tiplayout
                title={CitationTooltip.STEP3_TITLE}
                content={CitationTooltip.STEP3_TEXT}
                step={citation_tooltip_step}
                side='top'
                totalSteps={4}
                buttonLabel='next'
                onClickCallback={() => {
                  updateCitationStep();
                }}
              >
                <Button
                  className='size-max px-3 py-1'
                  variant={'outline'}
                  role='button'
                  onClick={() => handler(item as any, 'collect')}
                >
                  <Plus size={18} /> Add to library
                </Button>
              </Tiplayout>
            ) : (
              <Button
                className='size-max px-3 py-1'
                variant={'outline'}
                role='button'
                onClick={() => handler(item as any, 'collect')}
              >
                <Plus size={18} /> Add to library
              </Button>
            )}
            {citation_tooltip_step === 2 && index === 0 ? (
              <Tiplayout
                title={CitationTooltip.STEP2_TITLE}
                content={CitationTooltip.STEP2_TEXT}
                step={citation_tooltip_step}
                side='left'
                totalSteps={4}
                buttonLabel='next'
                onClickCallback={() => {
                  updateCitationStep();
                }}
              >
                <Button
                  className='size-max px-3 py-1'
                  role='button'
                  onClick={() => handler(item as any, 'cite')}
                >
                  <ReplyAll size={18} />
                  Cite
                </Button>
              </Tiplayout>
            ) : (
              <Button
                className='size-max px-3 py-1'
                role='button'
                onClick={() => handler(item as any, 'cite')}
              >
                <ReplyAll size={18} />
                Cite
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export const MineCitationCard = memo(
  ({
    item,
    type,
  }: {
    item: { type: ICitationType; data: ICitationData };
    type: 'inText' | 'library';
  }) => {
    const editor = useAIEditor((state) => state.editor_instance);
    const removeInTextCitationIds = useCitation(
      (state) => state.removeInTextCitationIds
    );
    const removeInDocCitationIds = useCitation(
      (state) => state.removeInDocCitationIds
    );
    const appendInTextCitationIds = useCitation(
      (state) => state.appendInTextCitationIds
    );
    const updateCitationItem = useCitation((state) => state.updateCitationItem);
    const { insertCitation } = useEditorCommand(editor!);

    const handleCite = async () => {
      const { selection } = editor!.state;
      const { from, to, anchor } = selection;
      const new_data = {
        type: item.type,
        data: { ...item.data, in_text_pos: anchor },
      };
      if (type === 'inText') {
        updateCitationItem(new_data);
        insertCitation(item.data.id, anchor, from, to);
      } else {
        await appendInTextCitationIds(new_data);
        insertCitation(item.data.id, anchor, from, to);
      }
    };

    const handleDeleteCitation = async () => {
      let counter = 0;
      editor?.state.doc.descendants((node, pos) => {
        if (node.type.name === 'IntextCitation') {
          if (node.attrs.citation_id === item.data.id) {
            editor.commands.deleteRange({
              from: pos - counter,
              to: pos + node.nodeSize - counter,
            });
            counter += node.nodeSize;
          }
        }
      });
      if (type === 'inText') {
        await removeInTextCitationIds(item.data.id, item.data.document_id);
      } else {
        await removeInDocCitationIds(item.data.id, item.data.document_id);
      }
    };
    return (
      <div className='mb-5 flex flex-col gap-y-2.5 p-2.5'>
        {!item.data.manual_create ? (
          <Dialog>
            <DialogTrigger asChild>
              <h1 className='base-semibold line-clamp-2 cursor-pointer hover:text-violet-500'>
                {item.data.article_title}
              </h1>
            </DialogTrigger>
            <CitationPreview item={item.data as any} />
          </Dialog>
        ) : (
          <h1 className='base-semibold line-clamp-2 cursor-pointer hover:text-violet-500'>
            {item.data.article_title
              ? item.data.article_title
              : item.data.book_title}
          </h1>
        )}
        {item.data.contributors?.length > 0 && (
          <p className='subtle-regular line-clamp-2 text-shadow-100'>
            Authors:{' '}
            {item.data.contributors.map((author, idx) => {
              return (
                <span key={`author-${idx}`}>
                  {author.last_name ?? ''}&nbsp;
                  {author.middle_name ?? ''}
                  {author.first_name ?? ''}
                  {idx !== item.data.contributors.length - 1 && ', '}
                </span>
              );
            })}
          </p>
        )}
        {item.data.abstract && (
          <p className='subtle-regular line-clamp-4 text-zinc-600'>
            {item.data.abstract}
          </p>
        )}
        <div className='flex justify-end gap-x-2'>
          <Button
            className='h-max w-max rounded bg-violet-500 px-4 py-1'
            role='button'
            onClick={handleCite}
          >
            <ReplyAll size={18} />
            Cite
          </Button>
          <Button
            className='h-7 rounded bg-zinc-600/20 px-1 text-zinc-600 hover:bg-red-400 hover:text-white'
            variant={'ghost'}
            onClick={handleDeleteCitation}
          >
            <Trash2 size={18} />
          </Button>
        </div>
      </div>
    );
  }
);

SearchCitationCard.displayName = 'SearchCitationCard';
MineCitationCard.displayName = 'MineCitationCard';
