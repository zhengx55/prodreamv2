import Icon from '@/components/root/Icon';
import { Button } from '@/components/ui/button';
import useButtonTrack from '@/hooks/useBtnTrack';
import { useMembershipInfo } from '@/hooks/useMemberShip';
import { DocPageDicType } from '@/types';
import { useAIEditor } from '@/zustand/store';
import { Loader } from 'lucide-react';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import Prompt from './Prompt';

const NavbarDropdown = dynamic(() => import('./NavbarDropdown'));

type Props = {} & DocPageDicType;

const DocNavbar = ({ t, lang }: Props) => {
  const trans = useTranslations('Editor');
  const isSaving = useAIEditor((state) => state.isSaving);
  const updatePaymentModal = useAIEditor((state) => state.updatePaymentModal);
  const { mutateAsync: buttonTrack } = useButtonTrack();
  const docTtile = useAIEditor((state) => state.doc_title);
  const prompt = useAIEditor((state) => state.essay_prompt);
  const { data: usage } = useMembershipInfo();

  return (
    <nav className='flex-between z-50 h-[var(--top-nav-bar-height)] w-full shrink-0 border-b border-gray-200 bg-white px-5 py-3'>
      <div className='flex h-full items-center gap-x-3'>
        <h1 className='line-clamp-1 max-w-xl text-base font-medium'>
          {!docTtile ? 'Untitled Document' : docTtile}
        </h1>
        {isSaving ? (
          <Loader className='animate-spin' />
        ) : (
          <Icon
            alt=''
            src='/editor/cloud.svg'
            width={24}
            height={24}
            className='size-6'
            priority
          />
        )}
      </div>
      <div className='flex items-center gap-x-4'>
        <Prompt key={prompt} prompt={prompt} />
        {['basic', 'free_trail'].includes(usage?.subscription ?? '') ? (
          <Button
            role='button'
            onClick={async () => {
              await buttonTrack({
                event: 'open payment at editor navbar',
              });
              updatePaymentModal(true);
            }}
            className='h-max rounded px-2 py-1'
          >
            <Icon
              width={18}
              height={18}
              className='size-4'
              priority
              alt='diamond'
              src='/editor/gem.svg'
            />
            {trans('Utility.Upgrade')}
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
