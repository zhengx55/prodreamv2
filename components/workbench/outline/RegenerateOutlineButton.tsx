import Icon from '@/components/root/Icon';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import dynamic from 'next/dynamic';
import { memo, useState } from 'react';

const RegenerateModal = dynamic(() => import('./modal/RegenerateModal'), {
  ssr: false,
});

const RegenerateOutlineButton = () => {
  const [show, setShow] = useState(false);
  const closeModal = () => setShow(false);
  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogTrigger asChild>
        <Button className='w-full'>
          <Icon
            alt='regenerate_outline'
            src='/workbench/regenerate_outline.svg'
            width={20}
            height={20}
            className='size-4'
            priority
          />
          Generate Outline
        </Button>
      </DialogTrigger>
      <RegenerateModal close={closeModal} />
    </Dialog>
  );
};

export default memo(RegenerateOutlineButton);
