import { Cloud, Diamond } from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { useMembershipInfo, useUserTrackInfo } from '@/query/query';
import { useAIEditor, useCitation } from '@/zustand/store';
import { ChevronLeft, Loader, MoreHorizontal } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { memo } from 'react';
import Plagiarism from './Plagiarism';

const NavbarDropdown = dynamic(() => import('./NavbarDropdown'));
const CitationDropdown = dynamic(() => import('./CitationDropdown'));

const DocNavbar = () => {
  const citationStyle = useCitation((state) => state.citationStyle);
  const isSaving = useAIEditor((state) => state.isSaving);
  const updatePaymentModal = useAIEditor((state) => state.updatePaymentModal);
  const docTtile = useAIEditor((state) => state.doc_title);
  const { data: track, isPending } = useUserTrackInfo();
  const { data: usage, isPending: isUsagePending } = useMembershipInfo();

  if (isPending || isUsagePending)
    return (
      <nav className='flex-between h-[var(--top-nav-bar-height)] w-full shrink-0 border-b border-shadow-border px-5 py-3'>
        <Skeleton className='h-5 w-24 rounded' />
        <Skeleton className='h-5 w-24 rounded' />
      </nav>
    );
  return (
    <nav className='flex-between h-[var(--top-nav-bar-height)] w-full shrink-0 border-b border-shadow-border px-5 py-3'>
      <div className='flex h-full items-center gap-x-4'>
        {track?.guidence && (
          <Link passHref href={'/editor'}>
            <span className='flex-center h-10 w-10 cursor-pointer rounded-md hover:bg-shadow-border hover:opacity-50'>
              <ChevronLeft />
            </span>
          </Link>
        )}
        <h1 className='base-semibold line-clamp-1 max-w-xl'>
          {!track?.guidence
            ? 'Welcome To Prodream'
            : docTtile === 'Untitled'
              ? 'Untitled Document'
              : docTtile}
        </h1>
        {isSaving ? <Loader className='animate-spin' /> : <Cloud />}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='h-max rounded bg-doc-primary/20 py-1 hover:bg-doc-secondary'>
              <p className='small-regular text-doc-primary'>{citationStyle}</p>
            </Button>
          </DropdownMenuTrigger>
          <CitationDropdown />
        </DropdownMenu>
      </div>

      <div className='flex items-center gap-x-4'>
        <Plagiarism />
        {usage?.subscription === 'basic' ? (
          <Button
            role='button'
            onClick={() => updatePaymentModal(true)}
            className='h-max rounded bg-doc-primary px-2 py-1 hover:bg-doc-secondary hover:text-doc-primary'
          >
            <Diamond /> Upgrade
          </Button>
        ) : null}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='bg-transparent p-2 text-black-400 hover:bg-doc-secondary hover:text-doc-primary'>
              <MoreHorizontal size={18} />
            </Button>
          </DropdownMenuTrigger>
          <NavbarDropdown />
        </DropdownMenu>
      </div>
    </nav>
  );
};
export default memo(DocNavbar);
