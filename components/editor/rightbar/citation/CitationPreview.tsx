import { Button } from '@/components/ui/button';
import { DialogClose, DialogContent } from '@/components/ui/dialog';
import { ICitation } from '@/query/type';
import { Download, X } from 'lucide-react';
import type { Route } from 'next';
import Link from 'next/link';
import { memo } from 'react';

type Props = { item: ICitation };

const CitationPreview = ({ item }: Props) => {
  return (
    <DialogContent className='flex bg-white sm:rounded md:w-[650px]'>
      <div className='flex flex-col gap-y-4'>
        <h1 className='h3-semibold w-4/5'>{item.article_title}</h1>
        <DialogClose>
          <span className='flex-center absolute right-6 top-6 size-6 rounded-full bg-red-500'>
            <X className='text-white' size={18} />
          </span>
        </DialogClose>
        <p className='subtle-regular text-shadow-100'>
          Authors: {item.publication}
        </p>
        {item.publish_date.year &&
          (item.publish_date.month && item.publish_date.month ? (
            <p className='subtle-regular text-shadow-100'>
              Published Date: {item.publish_date.day} {item.publish_date.month}{' '}
              {item.publish_date.year}
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
        {item.snippet && (
          <p className='text-[14px] leading-relaxed'>{item.snippet}</p>
        )}
        <div className='flex-between w-full pr-4'>
          <div className='flex items-center gap-x-2'>
            {item.pdf_url && (
              <Link passHref href={item.pdf_url as Route} target='_blank'>
                <Button className='h-max rounded-xl bg-violet-500/10 text-violet-500 hover:bg-violet-500/20 active:bg-violet-500/20'>
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
    </DialogContent>
  );
};
export default memo(CitationPreview);
