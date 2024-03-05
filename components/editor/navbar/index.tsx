import { Cloud, Diamond } from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useMembershipInfo, useUserTrackInfo } from '@/query/query';
import { useAIEditor } from '@/zustand/store';
import { ChevronLeft, Loader } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { memo } from 'react';
import Plagiarism from './Plagiarism';
import PromptView from './Prompt';
import { Dialog } from '@/components/ui/dialog';

const NavbarDropdown = dynamic(() => import('./NavbarDropdown'));

const DocNavbar = ({ id }: {  id: string }) => {
  const isSaving = useAIEditor((state) => state.isSaving);
  const updatePaymentModal = useAIEditor((state) => state.updatePaymentModal);
  const docTtile = useAIEditor((state) => state.doc_title);
  const { data: track, isPending } = useUserTrackInfo();
  const { data: usage, isPending: isUsagePending } = useMembershipInfo();

  if (isPending || isUsagePending)
    return (
      <nav className='flex-between h-[var(--top-nav-bar-height)] w-full shrink-0 border-b border-shadow-border px-5 py-3'>
        <Skeleton className='w-24 h-5 rounded' />
        <Skeleton className='w-24 h-5 rounded' />
      </nav>
    );
  return (
    <nav className='flex-between h-[var(--top-nav-bar-height)] w-full shrink-0 border-b border-shadow-border px-5 py-3'>
      <div className='flex items-center h-full gap-x-4'>
        {track?.guidence && (
          <Link passHref href={'/editor'}>
            <span className='w-10 h-10 rounded-md cursor-pointer flex-center hover:bg-shadow-border hover:opacity-50'>
              <ChevronLeft />
            </span>
          </Link>
        )}
        <h1 className='max-w-xl base-semibold line-clamp-1'>
          {!track?.guidence
            ? 'Welcome To Prodream'
            : docTtile === 'Untitled'
              ? 'Untitled Document'
              : docTtile}
        </h1>
        {isSaving ? <Loader className='animate-spin' /> : <Cloud />}
        <PromptView id={id} />
        
      </div>
      <div className='flex items-center gap-x-4'>
        <Plagiarism />
        {usage?.subscription === 'basic' ? (
          <Button
            role='button'
            onClick={() => updatePaymentModal(true)}
            className='px-2 py-1 rounded h-max bg-doc-primary hover:bg-doc-secondary hover:text-doc-primary'
          >
            <Diamond /> Upgrade
          </Button>
        ) : null}
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='p-2 bg-transparent text-black-400 hover:bg-doc-secondary hover:text-doc-primary'>
              <MoreHorizontal size={18} />
            </Button>
          </DropdownMenuTrigger>
          <NavbarDropdown />
        </DropdownMenu> */}
      </div>
    </nav>
  );
};
export default memo(DocNavbar);
