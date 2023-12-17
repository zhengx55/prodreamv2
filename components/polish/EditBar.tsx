'use client';
import React, { memo } from 'react';
import { Separator } from '../ui/separator';
import { useToast } from '../ui/use-toast';
import Tooltip from '../root/Tooltip';
import dynamic from 'next/dynamic';
import { useAIEditiorHistoryContext } from '@/context/AIEditiorHistoryProvider';
import useAIEditorStore from '@/zustand/store';

const UploadModal = dynamic(() => import('./UploadModal'), { ssr: false });

const DownloadModal = dynamic(() => import('./DownloadModal'), { ssr: false });

const EditBar = () => {
  const { toast } = useToast();
  const { handleUndo, handleRedo } = useAIEditiorHistoryContext();
  const editor_html = useAIEditorStore((state) => state.editor_html);
  const updateHtml = useAIEditorStore((state) => state.updateEditor_html);

  return (
    <div
      className={`flex w-full justify-evenly rounded-lg border-shadow-border bg-nav-selected px-4 py-1`}
    >
      <Tooltip tooltipContent='Undo'>
        <button onClick={handleUndo} className='tool'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
          >
            <path
              d='M6.99514 4.59401L2.27614 9.28102C1.88614 9.67202 1.88614 10.328 2.27614 10.719L6.99514 15.406L8.40115 14L5.43214 11L16.9641 11.031C18.0881 11.031 18.9951 11.913 18.9951 13V18C18.9951 18.552 19.4431 19 19.9951 19C20.5471 19 20.9951 18.552 20.9951 18V13C20.9951 10.796 19.1781 9.03102 16.9641 9.03102L5.43214 9.00001L8.40115 6.00001L6.99514 4.59401Z'
              fill='#1D1B1E'
            />
          </svg>
        </button>
      </Tooltip>

      <Tooltip tooltipContent='Redo'>
        <button onClick={handleRedo} className='tool'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='25'
            height='24'
            viewBox='0 0 25 24'
            fill='none'
          >
            <path
              d='M17.4714 4.59401L22.1904 9.28102C22.5804 9.67202 22.5804 10.328 22.1904 10.719L17.4714 15.406L16.0654 14L19.0334 11L7.50244 11.031C6.37844 11.031 5.47143 11.913 5.47143 13V18C5.47143 18.552 5.02343 19 4.47143 19C3.91944 19 3.47144 18.552 3.47144 18V13C3.47144 10.796 5.28844 9.03102 7.50244 9.03102L19.0334 9.00001L16.0654 6.00001L17.4714 4.59401Z'
              fill='#1D1B1E'
            />
          </svg>
        </button>
      </Tooltip>

      <Separator orientation='vertical' className='bg-shadow-border' />
      <UploadModal />
      <DownloadModal />
      <Separator orientation='vertical' className='bg-shadow-border' />
      <button
        onClick={() => {
          navigator.clipboard.writeText(editor_html);
          toast({
            variant: 'default',
            description: 'Copy to clipboard',
          });
        }}
        className='tool'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='25'
          height='24'
          viewBox='0 0 25 24'
          fill='none'
        >
          <path
            d='M6.89893 1.95312C4.68993 1.95312 2.89893 3.74402 2.89893 5.95312V13.9531C2.89893 16.1621 4.68993 17.9531 6.89893 17.9531L6.90894 17.9581C7.14094 20.1871 9.04692 21.9531 11.3369 21.9531C11.6579 21.9531 14.2169 21.9531 14.8989 21.9531C18.4509 21.9531 22.8989 17.5051 22.8989 13.9531C22.8989 13.2711 22.8989 10.8861 22.8989 10.3911C22.8989 8.10083 21.1339 6.18742 18.9049 5.95532L18.8989 5.95312C18.8989 3.74402 17.1079 1.95312 14.8989 1.95312H6.89893ZM6.89893 3.95312H14.8989C16.0039 3.95312 16.8989 4.84852 16.8989 5.95312H11.3369C8.89092 5.95312 6.89893 7.94483 6.89893 10.3911V15.9531C5.79393 15.9531 4.89893 15.0581 4.89893 13.9531V5.95312C4.89893 4.84852 5.79393 3.95312 6.89893 3.95312ZM11.3369 7.95312H17.8989H18.4609C19.8029 7.95312 20.8989 9.04943 20.8989 10.3911C20.8989 10.7471 20.8989 11.9781 20.8989 12.9531C19.9319 12.9531 18.6569 12.9531 18.3369 12.9531C15.8909 12.9531 13.8989 14.9451 13.8989 17.3911V19.9531C12.8839 19.9531 11.5679 19.9531 11.3369 19.9531C9.99492 19.9531 8.89893 18.8571 8.89893 17.5151V16.9531V10.3911C8.89893 9.04933 9.99492 7.95312 11.3369 7.95312ZM18.3369 14.9531C18.6179 14.9531 19.7839 14.9511 20.7199 14.9511C20.1009 16.9281 17.8959 19.1011 15.9059 19.7831L15.8989 17.3911C15.8989 16.0491 16.9949 14.9531 18.3369 14.9531Z'
            fill='#1D1B1E'
          />
        </svg>
        <p>Copy</p>
      </button>
      <Separator orientation='vertical' className='bg-shadow-border' />
      <button
        onClick={() => {
          if (editor_html.trim() !== '') updateHtml('');
        }}
        className='tool'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='23'
          height='24'
          viewBox='0 0 23 24'
          fill='none'
        >
          <path
            d='M11.921 2.72559C10.901 2.72559 10.0748 3.55174 10.0748 4.57173H5.45945C4.94992 4.57173 4.53638 4.98527 4.53638 5.49481C4.53638 6.00435 4.94992 6.41788 5.45945 6.41788V17.4948C5.45945 19.5163 7.12561 21.1871 9.15176 21.1871H14.6902C16.7164 21.1871 18.3825 19.5209 18.3825 17.4948V6.41788C18.8921 6.41788 19.3056 6.00435 19.3056 5.49481C19.3056 4.98527 18.8921 4.57173 18.3825 4.57173H13.7671C13.7671 3.55174 12.941 2.72559 11.921 2.72559ZM7.3056 6.41788H16.5364V17.4948C16.5364 18.5074 15.7148 19.3409 14.7188 19.3409L9.15176 19.3123C8.13453 19.3123 7.3056 18.4908 7.3056 17.4948V6.41788ZM10.0748 8.26403C9.5653 8.26403 9.15176 8.67757 9.15176 9.1871V16.5717C9.15176 17.0812 9.5653 17.4948 10.0748 17.4948C10.5844 17.4948 10.9979 17.0812 10.9979 16.5717V9.1871C10.9979 8.67757 10.5844 8.26403 10.0748 8.26403ZM13.7671 8.26403C13.2576 8.26403 12.8441 8.67757 12.8441 9.1871V16.5717C12.8441 17.0812 13.2576 17.4948 13.7671 17.4948C14.2767 17.4948 14.6902 17.0812 14.6902 16.5717V9.1871C14.6902 8.67757 14.2767 8.26403 13.7671 8.26403Z'
            fill='#1D1B1E'
          />
        </svg>
        <p>Delete</p>
      </button>
    </div>
  );
};

export default memo(EditBar);
