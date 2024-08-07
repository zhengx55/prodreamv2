import { EditorContent } from '@tiptap/react';
import useOutlineEditor from '../outline/hooks/useOutlineEditor';
import EditorBubbleMenu from './EditorBubbleMenu';
type Props = {
  defaultHTML?: string;
  defaultContent?: string;
};
const EditorBlock = ({ defaultHTML, defaultContent }: Props) => {
  const editor = useOutlineEditor(defaultContent, defaultHTML);
  if (!editor) return null;
  return (
    <div className='h-full w-[80%] overflow-y-auto bg-white px-8 py-6'>
      <EditorBubbleMenu editor={editor} />
      <EditorContent editor={editor} className='size-full overflow-y-auto' />
    </div>
  );
};

export default EditorBlock;
