'use client';
import React, { memo } from 'react';
import { Separator } from '../ui/separator';
import { toast } from 'sonner';
import Tooltip from '../root/Tooltip';
import dynamic from 'next/dynamic';
import useRootStore from '@/zustand/store';
import { Copy, Delete, Redo, Undo } from '../root/SvgComponents';

const UploadModal = dynamic(() => import('./UploadModal'), { ssr: false });

const DownloadModal = dynamic(() => import('./DownloadModal'), { ssr: false });

const EditBar = () => {
  const editor_instance = useRootStore((state) => state.editor_instance);
  const handleUndo = () => {
    if (!editor_instance) return;
    editor_instance.chain().focus().undo().run();
  };
  const handleRedo = () => {
    if (!editor_instance) return;
    editor_instance.chain().focus().redo().run();
  };
  const handleClear = () => {
    if (!editor_instance) return;
    editor_instance.commands.clearContent();
  };
  const handleCopy = () => {
    if (!editor_instance) return;
    navigator.clipboard.writeText(editor_instance.getText());
    toast.success('Copy to clipboard');
  };
  return (
    <div
      className={`flex w-full justify-evenly rounded-lg border-shadow-border bg-nav-selected px-4 py-1`}
    >
      <Tooltip tooltipContent='Undo ⌘+Z'>
        <button onClick={handleUndo} className='tool'>
          <Undo />
        </button>
      </Tooltip>

      <Tooltip tooltipContent='Redo ⌘+Y'>
        <button onClick={handleRedo} className='tool'>
          <Redo />
        </button>
      </Tooltip>
      <Separator orientation='vertical' className='bg-shadow-border' />
      <UploadModal />
      <DownloadModal />
      <Separator orientation='vertical' className='bg-shadow-border' />
      <Tooltip tooltipContent='Copy ⌘+C'>
        <button onClick={handleCopy} className='tool'>
          <Copy />
          <p>Copy</p>
        </button>
      </Tooltip>
      <Separator orientation='vertical' className='bg-shadow-border' />
      <button onClick={handleClear} className='tool'>
        <Delete />
        <p>Delete</p>
      </button>
    </div>
  );
};

export default memo(EditBar);
