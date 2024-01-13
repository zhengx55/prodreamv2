'use client';
import { cn } from '@/lib/utils';
import { TableOfContentStorage } from '@tiptap-pro/extension-table-of-content';
import { Editor } from '@tiptap/react';
import { memo, useEffect, useState } from 'react';

export type TableOfContentsProps = {
  editor: Editor;
  onItemClick?: () => void;
};

export const TableOfContent = memo(({ editor }: TableOfContentsProps) => {
  const [data, setData] = useState<TableOfContentStorage | null>(null);

  useEffect(() => {
    const handler = ({ editor }: { editor: Editor }) => {
      setData({ ...editor.extensionStorage.tableOfContent });
    };
    handler({ editor });
    editor.on('update', () => handler({ editor }));
    editor.on('selectionUpdate', () => handler({ editor }));

    return () => {
      editor.off('update', () => handler({ editor }));
      editor.off('selectionUpdate', () => handler({ editor }));
    };
  }, [editor]);
  return (
    <aside className='absolute left-0 z-10 h-full w-40 shrink-0 overflow-hidden'>
      <div className='h-full w-full overflow-y-auto px-3 pb-6 pt-12'>
        <div className='mb-2 text-xs font-semibold uppercase text-neutral-500 dark:text-neutral-400'>
          Table of contents
        </div>
        {data?.content && data.content.length > 0 ? (
          <div className='flex flex-col gap-1'>
            {data.content.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                style={{ marginLeft: `${1 * item.level - 1}rem` }}
                className={cn(
                  'hover:bg-black small-semibold block w-full truncate rounded  bg-opacity-10 text-neutral-500 transition-all hover:bg-opacity-5 hover:text-neutral-800',
                  item.isActive && 'bg-neutral-100 text-neutral-800 '
                )}
              >
                {item.textContent}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </aside>
  );
});
TableOfContent.displayName = 'TableOfContents';
