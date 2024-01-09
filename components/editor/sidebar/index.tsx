'use client';
import { TableOfContentStorage } from '@tiptap-pro/extension-table-of-content';
import { Editor } from '@tiptap/react';
import { memo, useEffect, useState } from 'react';

export type TableOfContentsProps = {
  editor: Editor;
  onItemClick?: () => void;
};

type Props = { editor: Editor };
const Sidebar = ({ editor }: Props) => {
  const [data, setData] = useState<TableOfContentStorage | null>(null);

  useEffect(() => {
    const handler = () => {
      setData({ ...editor.extensionStorage.tableOfContent });
    };
    handler();
    editor.on('update', handler);
    editor.on('selectionUpdate', handler);

    return () => {
      editor.off('update', handler);
      editor.off('selectionUpdate', handler);
    };
  }, [editor]);
  return <div>Sidebar</div>;
};
export default memo(Sidebar);
