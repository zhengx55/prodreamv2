import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Prompt } from '@/types/outline';
import dynamic from 'next/dynamic';
import { memo } from 'react';
const SelectModal = dynamic(() => import('./modal/SelectModal'), {
  ssr: false,
});

const SelectOtherButton = ({
  prompts,
  defaultOutline,
  defaultPrompt,
  setOutline,
  setPrompt,
}: {
  prompts: Prompt[];
  defaultPrompt: string;
  defaultOutline: string;
  setOutline: (outline: string) => void;
  setPrompt: (prompt_id: string) => void;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'ghost'} className='p-0'>
          Select Other
        </Button>
      </DialogTrigger>
      <SelectModal
        defaultOutline={defaultOutline}
        defaultPrompt={defaultPrompt}
        prompts={prompts}
        setPrompt={setPrompt}
        setOutline={setOutline}
      />
    </Dialog>
  );
};

export default memo(SelectOtherButton);
