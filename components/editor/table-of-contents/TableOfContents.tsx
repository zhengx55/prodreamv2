'use client';
import { BookMarks } from '@/components/root/SvgComponents';
import { cn } from '@/lib/utils';
import { TableOfContentStorage } from '@tiptap-pro/extension-table-of-content';
import { Editor } from '@tiptap/react';
import { memo, useEffect, useState } from 'react';

export type TableOfContentsProps = {
  editor: Editor;
  onItemClick?: () => void;
};

const TableOfContents = ({ editor }: TableOfContentsProps) => {
  const [data, setData] = useState<TableOfContentStorage | null>(null);

  useEffect(() => {
    const handler = ({ editor }: { editor: Editor }) => {
      setData({ ...editor.extensionStorage.tableOfContent });
    };
    handler({ editor });
    editor.on('create', () => handler({ editor }));
    editor.on('update', () => handler({ editor }));

    return () => {
      editor.off('update', () => handler({ editor }));
      editor.off('create', () => handler({ editor }));
    };
  }, [editor]);
  return (
    <aside className='h-full w-40 shrink-0 overflow-hidden'>
      <div className='z-0 h-full w-full overflow-y-auto px-2 pt-12'>
        {data?.content && data.content.length > 0 ? (
          <div className='flex flex-col gap-2'>
            {data.content.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                style={{ marginLeft: `${1 * item.level - 1}rem` }}
                className={cn(
                  'hover:bg-black subtle-semibold block w-full truncate rounded  bg-opacity-10 text-neutral-500 transition-all hover:bg-opacity-5 hover:text-neutral-800',
                  item.isActive && 'bg-neutral-100 text-neutral-800 '
                )}
              >
                {item.textContent}
              </a>
            ))}
            <p className='subtle-semibold inline-flex w-full items-center gap-x-1 truncate  rounded bg-opacity-10 text-neutral-500 transition-all hover:bg-opacity-5 hover:text-neutral-800'>
              <BookMarks />
              Reference
            </p>
          </div>
        ) : null}
      </div>
    </aside>
  );
};
export default memo(TableOfContents);
