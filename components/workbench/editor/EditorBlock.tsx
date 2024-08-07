import { EditorContent } from '@tiptap/react';
import useOutlineEditor from '../outline/hooks/useOutlineEditor';
import EditorBubbleMenu from './EditorBubbleMenu';

const EditorBlock = ({ defaultHTML }: { defaultHTML?: string }) => {
  const editor = useOutlineEditor();
  if (!editor) return null;
  return (
    <div className='h-full w-[80%] overflow-y-auto bg-white px-8 py-6'>
      <EditorBubbleMenu editor={editor} />
      <EditorContent editor={editor} className='size-full overflow-y-auto' />
    </div>
  );
};

export default EditorBlock;
