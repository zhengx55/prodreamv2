import { AlertDialog } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import dynamic from 'next/dynamic';
import { memo, useCallback, useState } from 'react';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
const MaterialDeleteModal = dynamic(
  () => import('../brainstorming/DeleteModal'),
  {
    ssr: false,
  }
);

const OutlineDeleteModal = dynamic(
  () => import('../outline/modal/DeleteModal'),
  {
    ssr: false,
  }
);

const DraftDeleteModal = dynamic(() => import('../draft/modal/DeleteModal'), {
  ssr: false,
});

type Props = {
  href: string;
  id: string;
  type: 'outline' | 'material' | 'draft';
};

const Menu = ({ href, id, type }: Props) => {
  const [showDialog, setShowDialog] = useState(false);
  const setShow = useCallback(() => setShowDialog((prev) => !prev), []);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button role='button' variant={'icon'} className='size-max p-0.5'>
            <MoreHorizontal size={24} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='space-y-1 bg-white'>
          <DropdownMenuItem className='p-0'>
            <EditButton href={href} />
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => setShowDialog((prev) => !prev)}
            className='p-0'
          >
            <DeleteButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        {type === 'material' ? (
          <MaterialDeleteModal setShow={setShow} id={id} />
        ) : type === 'outline' ? (
          <OutlineDeleteModal setShow={setShow} id={id} />
        ) : (
          <DraftDeleteModal setShow={setShow} id={id} />
        )}
      </AlertDialog>
    </>
  );
};

export default memo(Menu);
