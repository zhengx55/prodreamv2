import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination';
import { memo } from 'react';

type Props = {
  page: number;
  setPage: (page: number) => void;
  totalPage: number;
};

const ModalPaginations = ({ page, setPage, totalPage }: Props) => {
  return (
    <Pagination>
      <PaginationContent>
        {Array.from({ length: totalPage }).map((_, i) => (
          <PaginationItem
            key={i}
            onClick={() => setPage(i)}
            className={`${
              page === i
                ? 'bg-indigo-500 text-white'
                : 'bg-transparent text-zinc-600 hover:bg-slate-100'
            } flex-center size-8 cursor-pointer rounded-lg`}
          >
            {i + 1}
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  );
};

export default memo(ModalPaginations);
