import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Prompt } from '@/types/outline/types';
import { memo, useState } from 'react';
import SelectModal from './SelectModal';

const SelectOtherButton = ({ prompts }: { prompts: Prompt[] }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'ghost'} className='p-0'>
          Select Other
        </Button>
      </DialogTrigger>
      <SelectModal prompts={prompts} setShow={handleShow} />
    </Dialog>
  );
};

export default memo(SelectOtherButton);
