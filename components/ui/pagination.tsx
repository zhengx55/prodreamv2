import { MoreHorizontal } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import Icon from '../root/Icon';
import { Button } from './button';

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role='navigation'
    aria-label='pagination'
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
);
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center gap-2', className)}
    {...props}
  />
));
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={className} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
  isActive?: boolean;
  showText?: boolean;
  disabled?: boolean;
} & React.ComponentProps<typeof Link>;

const PaginationLink = ({
  className,
  isActive,

  ...props
}: PaginationLinkProps) => (
  <Link
    aria-current={isActive ? 'page' : undefined}
    className={cn(isActive ? 'text-white' : 'text-zinc-500', className)}
    {...props}
  />
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label='Go to previous page'
    className={cn('gap-1', className)}
    {...props}
  >
    <Button
      disabled={props.disabled}
      role='button'
      variant={'icon'}
      className='size-max p-1'
    >
      <Icon
        alt='prev'
        src='/workbench/left.svg'
        width={20}
        height={20}
        className='size-5'
      />
      {props.showText && <span>Previous</span>}
    </Button>
  </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label='Go to next page'
    className={cn('gap-1', className)}
    {...props}
  >
    <Button
      disabled={props.disabled}
      role='button'
      variant={'icon'}
      className='size-max p-1'
    >
      {props.showText && <span>Next</span>}
      <Icon
        alt='next'
        src='/workbench/right.svg'
        width={20}
        height={20}
        className='size-5'
      />
    </Button>
  </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <Button role='button' variant={'icon'} className='size-max p-1'>
      <MoreHorizontal className='h-4 w-4' />
      <span className='sr-only'>More pages</span>
    </Button>
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
