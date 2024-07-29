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
const PAGENUMBER = 5;
type Props = {};

const PaginationSection = (props: Props) => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ?? '1';
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
            href={
              parseInt(page) === 1 ? '#' : createPageLink(parseInt(page) - 1)
            }
          />
        </PaginationItem>

        {Array.from({ length: PAGENUMBER }).map((_, index) => (
          <PaginationItem
            key={index}
            className={`${index + 1 === Number(page) && 'rounded-lg bg-indigo-500 '} inline-flex size-8 items-center justify-center`}
          >
            <PaginationLink
              href={createPageLink(index + 1)}
              isActive={index + 1 === Number(page)}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href={
              parseInt(page) === PAGENUMBER
                ? '#'
                : createPageLink(parseInt(page) + 1)
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default memo(PaginationSection);
