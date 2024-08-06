import { EditorContent } from '@tiptap/react';
import useOutlineEditor from './hooks/useOutlineEditor';

const EditorBlock = () => {
  const editor = useOutlineEditor();

  return (
    <div className='h-full w-[80%] overflow-y-auto bg-white px-8 py-6'>
      <EditorContent editor={editor} className='h-full overflow-y-auto' />
    </div>
  );
};

export default EditorBlock;
