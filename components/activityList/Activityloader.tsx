'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { activity_list_loading_prompt } from '@/constant';
import { memo } from 'react';
import { ActivityListLoading } from '../root/SvgComponents';
const Activityloader = ({
  isGenerating,
  toogleLoadingModal,
}: {
  isGenerating: boolean;
  toogleLoadingModal: () => void;
}) => {
  const prompt_index = Math.floor(
    Math.random() * activity_list_loading_prompt.length
  );

  return (
    <Dialog open={isGenerating} onOpenChange={toogleLoadingModal}>
      <DialogContent
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
        className='md:w-[400px] md:rounded-lg md:p-4'
      >
        <DialogHeader>
          <DialogTitle className='base-semibold flex items-center gap-x-2'>
            <ActivityListLoading />
            Editing, may take up to 2 minutes
          </DialogTitle>
        </DialogHeader>
        <div className='flex rounded-lg bg-shadow-50 p-4 text-justify'>
          {activity_list_loading_prompt[prompt_index]}
        </div>
        <DialogFooter className='md:justify-center'>
          <Button
            onClick={toogleLoadingModal}
            className='text-primary-200'
            variant={'ghost'}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default memo(Activityloader);
