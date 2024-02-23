import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { CitationTooltip } from '@/constant/enum';
import { ConvertCitationData } from '@/lib/utils';
import {
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
import { usePostHog } from 'posthog-js/react';
import { memo } from 'react';
import { useEditorCommand } from '../../hooks/useEditorCommand';

const Tiplayout = dynamic(
  () => import('@/components/editor/guide/tips/Tiplayout')
);

const CitationPreview = dynamic(() => import('./CitationPreview'), {
  ssr: false,
});

const MineCitationPreview = dynamic(() => import('./MineCitationPreview'), {
  ssr: false,
});

export const SearchCitationCard = memo(
  ({ item, index }: { item: ICitation; index: number }) => {
    const { id } = useParams();
    const posthog = usePostHog();
    const citation_tooltip_step = useUserTask((state) => state.citation_step);
    const updateCitationStep = useUserTask((state) => state.updateCitationStep);
    const { mutateAsync: updateTrack } = useMutateTrackInfo();
    const { data: track } = useUserTrackInfo();
    const { mutateAsync: handleCollect } = useCreateCitation();
    const { mutateAsync: handleCite } = useCiteToDoc();
    const handler = async (item: ICitation, action: 'cite' | 'collect') => {
      if (!track?.citation_task) {
        await updateTrack({
          field: 'citation_task',
          data: true,
        });
        posthog.capture('citation_task_completed');
      }
      const converted_data = ConvertCitationData(item);
      if (action === 'collect') {
        await handleCollect({
          citation_data: converted_data,
          citation_type: 'Journal',
          document_id: id as string,
        });
      } else {
        await handleCite({
          citation_data: converted_data,
          citation_type: 'Journal',
          document_id: id as string,
        });
      }
    };
    return (
      <div key={item.article_title} className='group flex flex-col px-2'>
        <Dialog>
          <DialogTrigger asChild>
            <h1 className='base-semibold line-clamp-2 cursor-pointer hover:text-doc-primary'>
              {item.article_title}&nbsp;{' '}
              {item.publish_date.year ? `(${item.publish_date.year})` : null}
            </h1>
          </DialogTrigger>
          <CitationPreview item={item} />
        </Dialog>
        <Spacer y='10' />
        {item.authors?.length > 0 && (
          <p className='subtle-regular line-clamp-2 text-shadow-100'>
            Authors:{' '}
            {item.authors.map((author, idx) => {
              return (
                <span key={`author-${idx}`}>
                  {author.last_name ?? ''}&nbsp;
                  {author.middle_name ?? ''}
                  {author.first_name ?? ''}
                  {idx !== item.authors.length - 1 && ', '}
                </span>
              );
            })}
          </p>
        )}
        <Spacer y='10' />
        {item.abstract && (
          <p className='small-regular line-clamp-4'>{item.abstract}</p>
        )}
        <Spacer y='15' />
        <div className='flex-between'>
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
                className='h-[30px] w-[48%] rounded bg-doc-primary'
                role='button'
                onClick={() => handler(item as any, 'cite')}
              >
                <ReplyAll size={18} />
                Cite
              </Button>
            </Tiplayout>
          ) : (
            <Button
              className='h-[30px] w-[48%] rounded bg-doc-primary'
              role='button'
              onClick={() => handler(item as any, 'cite')}
            >
              <ReplyAll size={18} />
              Cite
            </Button>
          )}

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
                className='h-[30px] w-[48%] rounded border border-doc-primary text-doc-primary'
                variant={'ghost'}
                role='button'
                onClick={() => handler(item as any, 'collect')}
              >
                <Plus size={18} className='text-doc-primary' /> Add to library
              </Button>
            </Tiplayout>
          ) : (
            <Button
              className='h-[30px] w-[48%] rounded border border-doc-primary text-doc-primary'
              variant={'ghost'}
              role='button'
              onClick={() => handler(item as any, 'collect')}
            >
              <Plus size={18} className='text-doc-primary' /> Add to library
            </Button>
          )}
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
    const { insertCitation } = useEditorCommand(editor!);

    const handleCite = async () => {
      if (type === 'inText') {
        insertCitation(item.data.id);
      } else {
        await appendInTextCitationIds(item);
        insertCitation(item.data.id);
      }
    };

    const handleDeleteCitation = async () => {
      if (type === 'inText') {
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
        await removeInTextCitationIds(item.data.id, item.data.document_id);
      } else {
        await removeInDocCitationIds(item.data.id, item.data.document_id);
      }
    };

    return (
      <div className='mb-5 flex flex-col gap-y-2.5 p-2.5'>
        {/* <Dialog>
            <DialogTrigger asChild>
              <h1 className='base-semibold line-clamp-2 cursor-pointer hover:text-doc-primary'>
                {item.data.article_title
                  ? item.data.article_title
                  : item.data.book_title}{' '}
              </h1>
            </DialogTrigger>
            <MineCitationPreview item={item.data} />
          </Dialog> */}
        <h1 className='base-semibold line-clamp-2 cursor-pointer hover:text-doc-primary'>
          {item.data.article_title
            ? item.data.article_title
            : item.data.book_title}{' '}
        </h1>
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
          <p className='subtle-regular line-clamp-4 text-doc-shadow'>
            {item.data.abstract}
          </p>
        )}
        <div className='flex-between gap-x-4'>
          <Button
            className='h-8 w-full rounded bg-doc-primary py-1'
            role='button'
            onClick={handleCite}
          >
            <ReplyAll size={18} />
            Cite
          </Button>
          <Button
            className='aspect-square h-8 rounded bg-doc-shadow/20 p-2 text-doc-shadow hover:bg-red-400 hover:text-white'
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
