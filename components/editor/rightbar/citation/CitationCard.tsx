import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { ConvertCitationData } from '@/lib/utils';
import { useCiteToDoc, useCreateCitation } from '@/query/query';
import { ICitation } from '@/query/type';
import { ICitationData, ICitationType } from '@/types';
import { useAIEditor } from '@/zustand/store';
import { Plus, ReplyAll, Trash2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { memo } from 'react';
import { useEditorCommand } from '../../hooks/useEditorCommand';

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
      <div
        key={item.article_title}
        className='group flex flex-col gap-y-2 px-2'
      >
        <h1
          onClick={() => {
            if (item.pdf_url) window.open(item.pdf_url, '_blank');
          }}
          className='base-semibold line-clamp-2 cursor-pointer hover:text-doc-primary'
        >
          {item.article_title}&nbsp;{`(${item.publish_date.year})`}
        </h1>
        <p className='subtle-regular text-doc-shadow'>
          author:&nbsp;
          {item.authors && item.authors.length > 0
            ? `${item.authors[0].last_name ?? ''} ${item.authors[0].middle_name ?? ''} ${item.authors[0].first_name ?? ''}`
            : 'Missing authors'}
        </p>
        <div className='flex-between'>
          <Button
            className='h-max w-[48%] rounded bg-doc-primary'
            role='button'
            onClick={() => handler(item as any, index, 'cite')}
          >
            <ReplyAll size={18} />
            Cite
          </Button>
          <Button
            className='h-max w-[48%] rounded border border-doc-primary text-doc-primary'
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
        insertCitation(
          item.data.id,
          item.data.contributors[0].last_name ?? '',
          item.data.publish_date?.year as string,
          item.data.article_title ?? '',
          item.data.abstract
        );
      } else {
        await appendInTextCitationIds(item, item.data.document_id);
        insertCitation(
          item.data.id,
          item.data.contributors[0].last_name ?? '',
          item.data.publish_date?.year as string,
          item.data.article_title ?? '',
          item.data.abstract
        );
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
      <div className='mb-5 flex flex-col bg-doc-secondary p-2.5'>
        <h1 className='base-semibold line-clamp-2'>
          {item.data.article_title
            ? item.data.article_title
            : item.data.book_title}
        </h1>
        <Spacer y='10' />
        <div className='flex flex-wrap items-center gap-x-2'>
          {item.data.contributors && item.data.contributors?.length > 0 ? (
            <p className='small-regular text-doc-shadow'>
              <span>Author:&nbsp;</span>
              {item.data.contributors[0].last_name},&nbsp;
              {item.data.contributors[0].middle_name}
              {item.data.contributors[0].first_name}
            </p>
          ) : (
            <p className='samll-regular'>Missing authors</p>
          )}
        </div>
        <Spacer y='10' />
        <div className='flex-between'>
          <Button
            className='h-max w-[42%] rounded bg-doc-primary py-1'
            role='button'
            onClick={handleCite}
          >
            <ReplyAll size={18} />
            Cite
          </Button>
          {/* <Button
            className='h-max w-[42%] rounded border border-doc-primary py-1 text-doc-primary'
            variant={'ghost'}
            role='button'
          >
            <Edit size={18} className='text-doc-primary' /> Edit
          </Button> */}
          <Button
            className='aspect-square h-max rounded bg-doc-shadow/20 p-2 text-doc-shadow hover:bg-red-400 hover:text-white'
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
