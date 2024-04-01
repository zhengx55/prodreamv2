import { Cloud, Diamond } from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import { useMembershipInfo, useUserTrackInfo } from '@/query/query';
import { DocPageDicType } from '@/types';
import { useAIEditor } from '@/zustand/store';
import { ChevronLeft, Loader } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { memo } from 'react';
import Prompt from './Prompt';

const PromptViewModal = dynamic(() => import('../modal/Prompt'));

const NavbarDropdown = dynamic(() => import('./NavbarDropdown'));

type Props = {} & DocPageDicType;

const DocNavbar = ({ t, lang }: Props) => {
  const { isSaving, updatePaymentModal, docTtile } = useAIEditor((state) => ({
    isSaving: state.isSaving,
    updatePaymentModal: state.updatePaymentModal,
    docTtile: state.doc_title,
  }));
  const { data: track } = useUserTrackInfo();
  const { data: usage } = useMembershipInfo();

  return (
    <nav className='flex-between h-[var(--top-nav-bar-height)] w-full shrink-0 border-b border-gray-200 px-5 py-3'>
      {/* {!Boolean(prompt) && <PromptViewModal prompt={prompt} />} */}
      <div className='flex h-full items-center gap-x-2'>
        {track?.guidence && (
          <Link passHref href={`/${lang}/editor`}>
            <span className='cursor-pointer rounded-md hover:bg-shadow-border hover:opacity-50'>
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
      </div>
      <div className='flex items-center gap-x-4'>
        <Prompt t={t} />
        {['basic', 'free_trail'].includes(usage?.subscription ?? '') ? (
          <Button
            role='button'
            onClick={() => updatePaymentModal(true)}
            className='h-max rounded bg-violet-500 px-2 py-1 hover:bg-slate-100 hover:text-violet-500'
          >
            <Diamond /> {t.Utility.Upgrade}
          </Button>
        ) : null}
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='p-2 bg-transparent text-black hover:bg-slate-100 hover:text-violet-500'>
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
