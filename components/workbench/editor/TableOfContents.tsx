'use client';

import { TableOfContentsStorage } from '@tiptap-pro/extension-table-of-contents';
import { Editor as CoreEditor } from '@tiptap/core';
import { memo, useEffect, useState } from 'react';

export type TableOfContentsProps = {
  editor: CoreEditor;
};

const TableOfContents = ({ editor }: TableOfContentsProps) => {
  const [data, setData] = useState<TableOfContentsStorage | null>(null);

  useEffect(() => {
    const handler = ({ editor: currentEditor }: { editor: CoreEditor }) => {
      setData({ ...currentEditor.storage.tableOfContents });
    };

    editor.on('create', handler);
    editor.on('update', handler);
    return () => {
      editor.off('create', handler);
      editor.off('update', handler);
    };
  }, [editor]);
  return (
    <div className='absolute left-0 top-16 w-[110px]'>
      {data && data.content.length > 0 ? (
        <div className='flex flex-col'>
          {data.content.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              style={{ marginLeft: `${1 * item.level - 1}rem` }}
              className={
                'block truncate rounded p-1 text-xs font-semibold text-neutral-400 transition-all hover:text-neutral-600 hover:underline'
              }
            >
              {item.textContent}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default memo(TableOfContents);
