import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { numberToMonth } from '@/lib/utils';
import { useCreateCitation } from '@/query/query';
import { ICitation } from '@/query/type';
import { ICitationData, IJournalCitation } from '@/types';
import { Edit, Plus, ReplyAll } from 'lucide-react';
import { useParams } from 'next/navigation';
import { memo } from 'react';

export const SearchCitationCard = memo(({ item }: { item: ICitation }) => {
  const { id } = useParams();
  const { mutateAsync: handleCollectCitation } = useCreateCitation();
  const handleCollect = async (item: ICitation) => {
    const converted_data = {} as IJournalCitation;
    const {
      advanced_info,
      article_title,
      authors,
      doi,
      journal_title,
      page_info,
      publish_date,
    } = item;
    converted_data.publish_date = {
      day: publish_date.day ?? null,
      month: publish_date.month ? numberToMonth(publish_date.month) : null,
      year: publish_date.day ?? null,
    };
    converted_data.contributors = authors;
    converted_data.page_info = page_info;
    converted_data.journal_title = journal_title;
    converted_data.article_title = article_title;
    converted_data.doi = doi;
    converted_data.advanced_info = {
      issue: null,
      volume: advanced_info.volume ?? null,
      series: advanced_info.series.start ?? null,
    };
    await handleCollectCitation({
      citation_data: converted_data,
      citation_type: 'journal',
      document_id: id as string,
    });
  };
  return (
    <div key={item.article_title} className='group flex flex-col gap-y-2 px-2'>
      <h1
        onClick={() => {
          if (item.pdf_url) window.open(item.pdf_url, '_blank');
        }}
        className='base-semibold cursor-pointer hover:text-doc-primary'
      >
        {item.article_title}
      </h1>
      <p className='small-regular line-clamp-3'>
        {item.abstract ?? 'No content available'}
      </p>
      <div className='flex-between'>
        <Button className='h-max w-[48%] rounded bg-doc-primary' role='button'>
          <ReplyAll size={18} />
          Cite
        </Button>
        <Button
          className='h-max w-[48%] rounded border border-doc-primary text-doc-primary'
          variant={'ghost'}
          role='button'
          onClick={() => handleCollect(item as any)}
        >
          <Plus size={18} className='text-doc-primary' /> Add to mine
        </Button>
      </div>
    </div>
  );
});

export const MineCitationCard = memo(
  ({ index, item }: { index: number; item: ICitationData }) => {
    return (
      <div className='mb-5 flex flex-col bg-doc-secondary p-2'>
        <h1 className='base-semibold'>
          {item.article_title ? item.article_title : item.book_title}
        </h1>
        <Spacer y='5' />
        <div className='flex flex-wrap items-center gap-x-2'>
          {item.contributors && item.contributors?.length > 0 ? (
            item.contributors.map((contributor, idx) => {
              return (
                <p
                  className='samll-regular text-doc-shadow'
                  key={`in-doc-citation-${index}-author-${idx}`}
                >
                  {idx === 0 && <span>Author: </span>}
                  {contributor.first_name}
                  {contributor.middle_name}
                  {contributor.last_name}
                </p>
              );
            })
          ) : (
            <p className='samll-regular'>Missing authors</p>
          )}
        </div>
        <Spacer y='5' />
        <Spacer y='5' />
        <div className='flex-between'>
          <Button
            className='h-max w-[48%] rounded bg-doc-primary'
            role='button'
          >
            <ReplyAll size={18} />
            Cite
          </Button>
          <Button
            className='h-max w-[48%] rounded border border-doc-primary text-doc-primary'
            variant={'ghost'}
            role='button'
          >
            <Edit size={18} className='text-doc-primary' /> Edit
          </Button>
        </div>
      </div>
    );
  }
);

SearchCitationCard.displayName = 'SearchCitationCard';
MineCitationCard.displayName = 'MineCitationCard';
