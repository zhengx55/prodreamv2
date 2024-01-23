import { Button } from '@/components/ui/button';
import { ICitation } from '@/query/type';
import { Plus, ReplyAll } from 'lucide-react';
import { memo } from 'react';

export const SearchCitationCard = memo(({ item }: { item: ICitation }) => {
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
        >
          <Plus size={18} className='text-doc-primary' /> Add to mine
        </Button>
      </div>
    </div>
  );
});

export const MineCitationCard = memo(() => {
  return <div>s</div>;
});

SearchCitationCard.displayName = 'SearchCitationCard';
MineCitationCard.displayName = 'MineCitationCard';
