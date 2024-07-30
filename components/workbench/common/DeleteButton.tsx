import { AlertDialog, AlertDialogTrigger } from '@radix-ui/react-alert-dialog';

import Icon from '@/components/root/Icon';
import Tooltip from '@/components/root/Tooltip';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
import { memo, useCallback, useState } from 'react';
const DeleteModal = dynamic(() => import('../brainstorming/DeleteModal'), {
  ssr: false,
});

type Props = { id: string };

const DeleteButton = ({ id }: Props) => {
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
      <DeleteModal setShow={toggle} id={id} />
    </AlertDialog>
  );
};

export default memo(DeleteButton);
