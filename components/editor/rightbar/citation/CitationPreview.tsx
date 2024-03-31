import { Button } from '@/components/ui/button';
import { DialogContent } from '@/components/ui/dialog';
import { ICitation } from '@/query/type';
import { Download, LinkIcon } from 'lucide-react';
import type { Route } from 'next';
import Link from 'next/link';
import { memo } from 'react';

type Props = { item: ICitation };

const CitationPreview = ({ item }: Props) => {
  return (
    <DialogContent className='flex h-[500px] bg-white sm:rounded md:w-[950px] 2xl:h-[700px]'>
      <div className='flex-between w-1/2 flex-col'>
        <div className='flex flex-col gap-y-4'>
          <h1 className='h3-semibold'>{item.article_title}</h1>
          {item.area?.length > 0 && (
            <div className='flex items-center gap-x-2'>
              {item.area.map((keyword, idx) => (
                <span
                  className='subtle-regular rounded bg-violet-500/10 p-1.5 text-violet-500'
                  key={`keyword-${idx}`}
                >
                  {keyword}
                </span>
              ))}
            </div>
          )}
          {item.contributors?.length > 0 && (
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

          {item.publish_date.year &&
            (item.publish_date.month && item.publish_date.month ? (
              <p className='subtle-regular text-shadow-100'>
                Published Date: {item.publish_date.day}{' '}
                {item.publish_date.month} {item.publish_date.year}
              </p>
            ) : (
              <p className='subtle-regular text-shadow-100'>
                Published: {item.publish_date.year}
              </p>
            ))}
          {item.journal_title && (
            <p className='subtle-regular text-shadow-100'>
              {item.journal_title}{' '}
              {item.doi && (
                <Link
                  className='text-violet-500'
                  href={`https://doi.org/${item.doi}`}
                  target='_blank'
                >
                  | {item.doi}
                </Link>
              )}
            </p>
          )}
        </div>
        <div className='flex-between w-full pr-4'>
          <div className='flex items-center gap-x-2'>
            <Link passHref href={item.publisher as Route} target='_blank'>
              <Button className='h-max rounded-xl bg-violet-500/10 text-violet-500'>
                Pulisher Site
                <LinkIcon size={16} className='text-violet-500' />
              </Button>
            </Link>
            {item.pdf_url && (
              <Link passHref href={item.pdf_url as Route} target='_blank'>
                <Button className='h-max rounded-xl bg-violet-500/10 text-violet-500'>
                  PDF
                  <Download size={16} className='text-violet-500' />
                </Button>
              </Link>
            )}
          </div>
          <div className='flex flex-col items-center'>
            <p className='h3-bold text-shadow-100'>{item.citation_count}</p>
            <p className='subtle-regular text-shadow-100'>Cited by</p>
          </div>
        </div>
      </div>
      <div className='flex w-1/2 flex-col gap-y-2 overflow-y-auto'>
        {item.tldr && (
          <>
            <h2 className='title-regular text-neutral-400'>Summary</h2>
            <p className='text-[14px] leading-relaxed'>{item.tldr}</p>
          </>
        )}
        {item.abstract && (
          <>
            <h2 className='title-regular text-neutral-400'>Abstract</h2>
            <p className='text-[14px] leading-relaxed'>{item.abstract}</p>
          </>
        )}
      </div>
    </DialogContent>
  );
};
export default memo(CitationPreview);
