'use client';
import Spacer from '@/components/root/Spacer';
import {
  BookMarks,
  TableHide,
  TableShow,
} from '@/components/root/SvgComponents';
import Tooltip from '@/components/root/Tooltip';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { TableOfContentStorage } from '@tiptap-pro/extension-table-of-content';
import { Editor } from '@tiptap/react';
import { AnimatePresence, m } from 'framer-motion';
import { memo, useEffect, useState } from 'react';

export type TableOfContentsProps = {
  editor: Editor;
  onItemClick?: () => void;
};

const TableOfContents = ({ editor }: TableOfContentsProps) => {
  const [data, setData] = useState<TableOfContentStorage | null>(null);
  const [showTable, setShowTable] = useState(true);
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
  if (data?.content.length === 0 || !data?.content)
    return <div className='h-full w-40 shrink-0' />;
  return (
    <AnimatePresence mode='wait'>
      {showTable ? (
        <m.aside
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -10, opacity: 0 }}
          initial={{ x: -10, opacity: 0 }}
          key={'table-of-content'}
          className='h-full w-40 shrink-0 overflow-hidden'
        >
          <Spacer y='15' />
          <Tooltip tooltipContent='Hide' side='right'>
            <Button
              variant={'ghost'}
              role='button'
              className='py-0 pl-3 pr-0 hover:transform-none'
              onClick={() => setShowTable(false)}
            >
              <TableHide />
            </Button>
          </Tooltip>
          <div className='z-0 h-full w-full overflow-y-auto pl-5'>
            <div className='flex flex-col gap-2'>
              {data.content.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  style={{ marginLeft: `${1 * item.level - 1}rem` }}
                  className={cn(
                    'subtle-semibold block w-full truncate rounded bg-opacity-10 text-neutral-300 transition-all hover:bg-black hover:bg-opacity-5 hover:text-neutral-800',
                    item.isActive && 'bg-neutral-100 text-neutral-800'
                  )}
                >
                  {item.textContent}
                </a>
              ))}
              <p className='subtle-semibold inline-flex w-full items-center gap-x-1 truncate rounded bg-opacity-10 text-neutral-300 transition-all hover:bg-opacity-5 hover:text-neutral-800'>
                <BookMarks />
                Reference
              </p>
            </div>
          </div>
        </m.aside>
      ) : (
        <m.aside
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 10, opacity: 0 }}
          initial={{ x: 10, opacity: 0 }}
          key={'trigger'}
          className='h-full w-40 shrink-0 overflow-hidden'
        >
          <Spacer y='15' />
          <Tooltip side='right' tooltipContent='Expand'>
            <Button
              variant={'ghost'}
              role='button'
              className='pl-3 pr-0 hover:transform-none'
              onClick={() => setShowTable(true)}
            >
              <TableShow />
            </Button>
          </Tooltip>
        </m.aside>
      )}
    </AnimatePresence>
  );
};
export default memo(TableOfContents);
