'use client';

import { cn } from '@/lib/utils';
import { TableOfContentsStorage } from '@tiptap-pro/extension-table-of-contents';
import { Editor as CoreEditor } from '@tiptap/core';
import { useEffect, useState } from 'react';

export type TableOfContentsProps = {
  editor: CoreEditor;
};

export const TableOfContents = ({ editor }: TableOfContentsProps) => {
  const [data, setData] = useState<TableOfContentsStorage | null>(null);

  useEffect(() => {
    const handler = ({ editor: currentEditor }: { editor: CoreEditor }) => {
      setData({ ...currentEditor.extensionStorage.tableOfContents });
    };

    editor.on('create', handler);
    editor.on('update', handler);
    return () => {
      editor.off('create', handler);
      editor.off('update', handler);
    };
  }, [editor]);
  console.log('TableOfContents', data?.content);
  return (
    <div className='w-[200px]'>
      {data && data.content.length > 0 ? (
        <div className='flex size-max flex-col gap-1'>
          {data.content.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              style={{ marginLeft: `${1 * item.level - 1}rem` }}
              className={cn(
                'block w-full truncate rounded bg-opacity-10 p-1 text-sm font-medium text-neutral-500 transition-all hover:bg-black hover:bg-opacity-5 hover:text-neutral-800',
                item.isActive &&
                  'bg-neutral-100 text-neutral-800 dark:bg-neutral-900'
              )}
            >
              {item.textContent}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
};

TableOfContents.displayName = 'TableOfContents';
