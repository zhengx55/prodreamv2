import { AlertDialog, AlertDialogTrigger } from '@radix-ui/react-alert-dialog';

import Icon from '@/components/root/Icon';
import Tooltip from '@/components/root/Tooltip';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
import { memo, useCallback, useState } from 'react';
const MaterialDeleteModal = dynamic(
  () => import('../brainstorming/DeleteModal'),
  {
    ssr: false,
  }
);

const OutlineDeleteModal = dynamic(() => import('../outline/DeleteModal'), {
  ssr: false,
});

type Props = { id: string; type: 'material' | 'outline' | 'draft' };

const DeleteButton = ({ id, type }: Props) => {
  const [show, setShow] = useState(false);
  const toggle = useCallback(() => setShow((prev) => !prev), []);
  return (
    <AlertDialog open={show} onOpenChange={setShow}>
      <Tooltip tooltipContent='Delete'>
        <Button className='size-max p-0' role='button' variant={'icon'}>
          <AlertDialogTrigger asChild>
            <span>
              <Icon
                className='size-4'
                width={20}
                height={20}
                alt='edit'
                src='/workbench/delete.svg'
              />
            </span>
          </AlertDialogTrigger>
        </Button>
      </Tooltip>
      {type === 'material' ? (
        <MaterialDeleteModal setShow={toggle} id={id} />
      ) : type === 'outline' ? (
        <OutlineDeleteModal setShow={toggle} id={id} />
      ) : null}
    </AlertDialog>
  );
};

export default memo(DeleteButton);
