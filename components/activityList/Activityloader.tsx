'use client';
import React, { memo, useEffect, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { activity_list_loading_prompt } from '@/constant';
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
      <DialogContent className='md:w-[400px] md:rounded-lg md:p-4'>
        <DialogHeader>
          <DialogTitle className='base-semibold flex items-center gap-x-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              className=' animate-spin'
            >
              <path
                d='M12 22C10.6868 22 9.38642 21.7413 8.17317 21.2388C6.95991 20.7362 5.85752 19.9997 4.92893 19.0711C4.00035 18.1425 3.26375 17.0401 2.7612 15.8268C2.25866 14.6136 2 13.3132 2 12C2 10.6868 2.25866 9.38642 2.76121 8.17316C3.26375 6.95991 4.00035 5.85752 4.92893 4.92893C5.85752 4.00035 6.95991 3.26375 8.17317 2.7612C9.38642 2.25866 10.6868 2 12 2C13.3132 2 14.6136 2.25866 15.8268 2.76121C17.0401 3.26375 18.1425 4.00035 19.0711 4.92893C19.9997 5.85752 20.7362 6.95991 21.2388 8.17317C21.7413 9.38642 22 10.6868 22 12C22 13.3132 21.7413 14.6136 21.2388 15.8268C20.7362 17.0401 19.9997 18.1425 19.0711 19.0711C18.1425 19.9997 17.0401 20.7362 15.8268 21.2388C14.6136 21.7413 13.3132 22 12 22L12 22Z'
                stroke='#E8E8E8'
                strokeWidth='4'
              />
              <path
                d='M19.0711 4.92893C20.4696 6.32746 21.422 8.10929 21.8079 10.0491C22.1937 11.9889 21.9957 13.9996 21.2388 15.8268C20.4819 17.6541 19.2002 19.2159 17.5557 20.3147C15.9112 21.4135 13.9778 22 12 22'
                stroke='url(#paint0_linear_2689_12661)'
                strokeWidth='4'
              />
              <defs>
                <linearGradient
                  id='paint0_linear_2689_12661'
                  x1='12'
                  y1='0'
                  x2='12'
                  y2='24'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='#C24FB0' />
                  <stop offset='1' stopColor='#7F01F6' />
                </linearGradient>
              </defs>
            </svg>
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
