import { Button } from '@/components/ui/button';
import { DialogContent } from '@/components/ui/dialog';
import { ICitation } from '@/query/type';
import { Download, LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { memo } from 'react';

type Props = { item: ICitation };
const CitationPreview = ({ item }: Props) => {
  return (
    <DialogContent className='flex h-[500px] bg-white sm:rounded md:w-[950px] 2xl:h-[700px]'>
      <div className='flex-between w-1/2 flex-col'>
        <div className='flex flex-col gap-y-4'>
          <h1 className='h3-semibold'>{item.article_title}</h1>
          <div className='flex items-center gap-x-2'>
            {item.area?.length &&
              item.area.map((keyword, idx) => (
                <span
                  className='subtle-regular rounded bg-doc-primary/10 p-1.5 text-doc-primary'
                  key={`keyword-${idx}`}
                >
                  {keyword}
                </span>
              ))}
          </div>

          {item.authors.length && (
            <p className='subtle-regular text-shadow-100'>
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
                  className='text-doc-primary'
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
            <Link passHref href={item.publisher} target='_blank'>
              <Button className='h-max rounded-xl bg-doc-primary/10 text-doc-primary'>
                Pulisher Site
                <LinkIcon size={16} className='text-doc-primary' />
              </Button>
            </Link>
            {item.pdf_url && (
              <Link passHref href={item.pdf_url} target='_blank'>
                <Button className='h-max rounded-xl bg-doc-primary/10 text-doc-primary'>
                  PDF
                  <Download size={16} className='text-doc-primary' />
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
        <h2 className='title-regular text-doc-font'>Summary</h2>
        <p className='text-[14px] leading-relaxed'>{item.tldr}</p>
        <h2 className='title-regular text-doc-font'>Abstract</h2>
        <p className='text-[14px] leading-relaxed'>{item.abstract}</p>
      </div>
    </DialogContent>
  );
};
export default memo(CitationPreview);
