'use client';
import useRootStore from '@/zustand/store';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { memo } from 'react';
import { toast } from 'sonner';
import { Copy, Delete, Redo, Undo } from '../root/SvgComponents';
import Tooltip from '../root/Tooltip';
import { Separator } from '../ui/separator';
import DownloadModal from './DownloadModal';
import UploadModal from './UploadModal';

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
      className={`flex w-full justify-evenly rounded-lg border-shadow-border bg-nav-selected px-2 py-1`}
    >
      <Link passHref href={'/writtingpal/polish'}>
        <button aria-label='return' className='tool'>
          <ChevronLeft /> Home
        </button>
      </Link>
      <Separator orientation='vertical' className='bg-shadow-border' />
      <Tooltip tooltipContent='Undo ⌘+Z'>
        <button
          id='undo'
          aria-label='Undo Button'
          onClick={handleUndo}
          className='tool'
        >
          <Undo />
        </button>
      </Tooltip>

      <Tooltip tooltipContent='Redo ⌘+Y'>
        <button
          id='redo'
          aria-label='Redo Button'
          onClick={handleRedo}
          className='tool'
        >
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
