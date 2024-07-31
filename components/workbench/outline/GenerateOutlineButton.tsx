'use client';
import Icon from '@/components/root/Icon';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import dynamic from 'next/dynamic';
import { memo, useState } from 'react';

const GenerateModal = dynamic(() => import('./GenerateModal'), { ssr: false });
type Props = {};

const GenerateButton = (props: Props) => {
  const [show, setShow] = useState(false);
  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogTrigger asChild>
        <Button role='button'>
          <Icon
            alt='stars'
            src='/workbench/stars.svg'
            width={20}
            height={20}
            className='size-4'
            priority
          />
          Generate Outline
        </Button>
      </DialogTrigger>
      <GenerateModal />
    </Dialog>
  );
};

export default memo(GenerateButton);
