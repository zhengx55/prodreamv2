import Icon from '@/components/root/Icon';
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
import { memo, useState } from 'react';

const RegenerateModal = dynamic(() => import('./modal/RegenerateModal'), {
  ssr: false,
});

type Props = {
  outline: string;
};

const RegenerateDraftButton = ({ outline }: Props) => {
  const [show, setShow] = useState(false);
  const closeModal = () => setShow(false);
  return (
    <AlertDialog open={show} onOpenChange={setShow}>
      <AlertDialogTrigger asChild>
        <Button className='w-full'>
          <Icon
            alt='regenerate_outline'
            src='/workbench/regenerate_outline.svg'
            width={20}
            height={20}
            className='size-4'
            priority
          />
          Regenerate Draft
        </Button>
      </AlertDialogTrigger>
      <RegenerateModal outline={outline} close={closeModal} />
    </AlertDialog>
  );
};

export default memo(RegenerateDraftButton);
