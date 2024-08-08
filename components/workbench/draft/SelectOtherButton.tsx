import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import dynamic from 'next/dynamic';
import { memo } from 'react';
const SelectModal = dynamic(() => import('./modal/SelectModal'), {
  ssr: false,
});

const SelectOtherButton = ({
  defaultOutline,
  setOutline,
}: {
  defaultOutline: string;
  setOutline: (outline: string) => void;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'ghost'} className='p-0'>
          Select Other
        </Button>
      </DialogTrigger>
      <SelectModal defaultOutline={defaultOutline} setOutline={setOutline} />
    </Dialog>
  );
};

export default memo(SelectOtherButton);
