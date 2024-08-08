import { EditorContent } from '@tiptap/react';
import useOutlineEditor from '../hooks/useEditorBlock';
import EditorBubbleMenu from './EditorBubbleMenu';
type Props = {
  title?: string;
  content?: string;
  html?: string;
};

const EditorBlock = ({ title, content, html }: Props) => {
  const editor = useOutlineEditor(content, html, title);
  if (!editor) return null;
  return (
    <div className='h-full w-[80%] overflow-y-auto bg-white px-8 py-6'>
      <EditorBubbleMenu editor={editor} />
      <EditorContent editor={editor} className='size-full overflow-y-auto' />
    </div>
  );
};

export default EditorBlock;
