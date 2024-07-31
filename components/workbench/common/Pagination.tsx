import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useSearchParams } from 'next/navigation';
import { memo } from 'react';
type Props = { totalPage: number };

const PaginationSection = ({ totalPage }: Props) => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ?? '0';
  const query = searchParams.get('query') ?? '';

  const createPageLink = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    return `?${params.toString()}`;
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={parseInt(page) === 0}
            href={
              parseInt(page) === 0 ? '' : createPageLink(parseInt(page) - 1)
            }
          />
        </PaginationItem>

        {Array.from({ length: totalPage }).map((_, index) => (
          <PaginationItem
            key={index}
            className={`${index === Number(page) ? 'bg-indigo-500' : 'hover:bg-slate-50'} size-8 cursor-pointer rounded-lg `}
          >
            <PaginationLink
              href={createPageLink(index)}
              isActive={index === Number(page)}
              className='inline-flex size-full items-center justify-center'
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            disabled={parseInt(page) === totalPage - 1}
            href={
              parseInt(page) === totalPage - 1
                ? ''
                : createPageLink(parseInt(page) + 1)
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default memo(PaginationSection);
