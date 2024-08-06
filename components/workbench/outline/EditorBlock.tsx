import { EditorContent } from '@tiptap/react';
import EditorBubbleMenu from '../editor/EditorBubbleMenu';
import useOutlineEditor from './hooks/useOutlineEditor';

const EditorBlock = () => {
  const editor = useOutlineEditor();
  if (!editor) return null;
  return (
    <div className='h-full w-[80%] overflow-y-auto bg-white px-8 py-6'>
      <EditorBubbleMenu editor={editor} />
      <EditorContent editor={editor} className='h-full overflow-y-auto' />
    </div>
  );
};

export default EditorBlock;
