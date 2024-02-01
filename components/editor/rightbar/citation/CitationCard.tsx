import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { ConvertCitationData } from '@/lib/utils';
import { useCiteToDoc, useCreateCitation } from '@/query/query';
import { ICitation } from '@/query/type';
import { ICitationData, ICitationType } from '@/types';
import { useAIEditor } from '@/zustand/store';
import { Plus, ReplyAll, Trash2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { memo } from 'react';
import { useEditorCommand } from '../../hooks/useEditorCommand';
const CitationPreview = dynamic(() => import('./CitationPreview'), {
  ssr: false,
});

const MineCitationPreview = dynamic(() => import('./MineCitationPreview'), {
  ssr: false,
});

export const SearchCitationCard = memo(
  ({
    item,
    remove,
    index,
  }: {
    item: ICitation;
    index: number;
    remove: (index: number) => void;
  }) => {
    const { id } = useParams();
    const { mutateAsync: handleCollectCitation } = useCreateCitation();
    const { mutateAsync: handleCite } = useCiteToDoc();
    const handler = async (
      item: ICitation,
      index: number,
      action: 'cite' | 'collect'
    ) => {
      const converted_data = ConvertCitationData(item);
      if (action === 'collect') {
        await handleCollectCitation({
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
      remove(index);
    };
    return (
      <div key={item.article_title} className='group flex flex-col px-2'>
        <Dialog>
          <DialogTrigger asChild>
            <h1 className='base-semibold line-clamp-2 cursor-pointer hover:text-doc-primary'>
              {item.article_title}&nbsp;{`(${item.publish_date.year})`}
            </h1>
          </DialogTrigger>
          <CitationPreview item={item} />
        </Dialog>
        <Spacer y='10' />
        <p className='subtle-regular text-doc-shadow'>
          Authors:&nbsp; {item.authors[0].last_name ?? ''}&nbsp;
          {item.authors[0].middle_name ?? ''}
          {item.authors[0].first_name ?? ''}
        </p>
        <Spacer y='10' />
        {item.abstract && (
          <p className='small-regular line-clamp-4'>{item.abstract}</p>
        )}
        <Spacer y='15' />
        <div className='flex-between'>
          <Button
            className='h-[30px] w-[48%] rounded bg-doc-primary'
            role='button'
            onClick={() => handler(item as any, index, 'cite')}
          >
            <ReplyAll size={18} />
            Cite
          </Button>
          <Button
            className='h-[30px] w-[48%] rounded border border-doc-primary text-doc-primary'
            variant={'ghost'}
            role='button'
            onClick={() => handler(item as any, index, 'collect')}
          >
            <Plus size={18} className='text-doc-primary' /> Add to library
          </Button>
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
    const removeInTextCitationIds = useAIEditor(
      (state) => state.removeInTextCitationIds
    );
    const removeInDocCitationIds = useAIEditor(
      (state) => state.removeInDocCitationIds
    );
    const appendInTextCitationIds = useAIEditor(
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
        {item.data.contributors.length > 0 && (
          <p className='subtle-regular text-doc-shadow'>
            <span>Authors:&nbsp;</span>
            {item.data.contributors[0].last_name},&nbsp;
            {item.data.contributors[0].middle_name}
            {item.data.contributors[0].first_name}
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
