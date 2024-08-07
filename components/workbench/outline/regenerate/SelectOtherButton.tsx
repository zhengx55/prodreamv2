import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Prompt } from '@/types/outline/types';
import { memo } from 'react';
import SelectModal from './SelectModal';

const SelectOtherButton = ({
  prompts,
  defaultMaterials,
  defaultPrompt,
  setMaterials,
  setPrompt,
}: {
  prompts: Prompt[];
  defaultPrompt: string;
  defaultMaterials: string[];
  setMaterials: (material: string[]) => void;
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
        defaultMaterials={defaultMaterials}
        defaultPrompt={defaultPrompt}
        prompts={prompts}
        setPrompt={setPrompt}
        setMaterials={setMaterials}
      />
    </Dialog>
  );
};

export default memo(SelectOtherButton);
