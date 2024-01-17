import DragHandle from '@tiptap-pro/extension-drag-handle-react';
import { Editor } from '@tiptap/react';
import { GripVertical, Plus } from 'lucide-react';
import { memo, useEffect, useState } from 'react';
import { Toolbar } from '../Toolbar';
import useBlockMenuAction from './hooks/useBlockMenuAction';
import { useData } from './hooks/useData';

type Props = { editor: Editor };
export const BlockMenu = memo(({ editor }: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const data = useData();
  const actions = useBlockMenuAction(
    editor,
    data.currentNode,
    data.currentNodePos
  );

  useEffect(() => {
    if (menuOpen) {
      editor.commands.setMeta('lockDragHandle', true);
    } else {
      editor.commands.setMeta('lockDragHandle', false);
    }
  }, [editor, menuOpen]);
  return (
    <DragHandle
      pluginKey='blockMenu'
      editor={editor}
      onNodeChange={data.handleNodeChange}
      tippyOptions={{
        offset: [0, 16],
        zIndex: 99,
      }}
    >
      <div className='flex select-none items-center gap-0.5'>
        <Toolbar.Button onClick={actions.handleAdd}>
          <Plus size={16} className='text-shadow' />
        </Toolbar.Button>
        <Toolbar.Button onClick={actions.handleSelectAll}>
          <GripVertical size={16} className='text-shadow' />
        </Toolbar.Button>
      </div>
    </DragHandle>
  );
});

BlockMenu.displayName = 'BlockMenu';
