import { DialogClose, DialogContent } from '@/components/ui/dialog';
import { ICitation } from '@/query/type';
import { X } from 'lucide-react';
import type { Route } from 'next';
import Link from 'next/link';
import { memo } from 'react';

type Props = { item: ICitation };

const CitationPreview = ({ item }: Props) => {
  return (
    <DialogContent className='flex bg-white sm:rounded md:w-[650px]'>
      <div className='flex flex-col gap-y-4'>
        <h1 className='w-4/5 text-xl'>{item.article_title}</h1>
        <DialogClose className='absolute right-6 top-6 '>
          <span className='flex-center size-6 rounded-full bg-red-500'>
            <X className='text-white' size={18} />
          </span>
        </DialogClose>
        {item.publication && (
          <p className='subtle-regular text-shadow-100'>
            Authors: {item.publication}
          </p>
        )}
        {item.contributors && (
          <p className='subtle-regular text-shadow-100'>
            Authors:{' '}
            {item.contributors.map((author, idx) => {
              return (
                <span key={`author-${idx}`}>
                  {author.last_name ?? ''}&nbsp;
                  {author.middle_name ?? ''}
                  {author.first_name ?? ''}
                  {idx !== item.contributors.length - 1 && ', '}
                </span>
              );
            })}
          </p>
        )}

        {item.publish_date
          ? item.publish_date.year && (
              <p className='subtle-regular text-shadow-100'>
                Published: {item.publish_date.year}
              </p>
            )
          : null}

        {item.pdf_url && item.publisher && (
          <p className='subtle-regular text-shadow-100'>
            {item.publisher}&nbsp;
            {item.pdf_url && (
              <Link
                className='text-violet-500'
                href={item.pdf_url as Route}
                target='_blank'
              >
                | {item.pdf_url}
              </Link>
            )}
          </p>
        )}
        {item.snippet ? (
          <p className='text-[14px] leading-relaxed'>{item.snippet}</p>
        ) : item.abstract ? (
          <p className='text-[14px] leading-relaxed'>{item.abstract}</p>
        ) : null}
        <div className='flex w-full justify-end pr-4'>
          <div className='flex flex-col items-center'>
            <p className='h3-bold text-shadow-100'>{item.citation_count}</p>
            <p className='subtle-regular text-shadow-100'>Cited by</p>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};
export default memo(CitationPreview);
