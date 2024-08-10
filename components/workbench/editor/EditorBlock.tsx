import { EditorContent } from '@tiptap/react';
import EditorBubbleMenu from './EditorBubbleMenu';
import useOutlineEditor from './hooks/useEditorBlock';
import { TableOfContents } from './TableOfContents';
type Props = {
  title?: string;
  content?: string;
  html?: string;
};

const EditorBlock = ({ title, content, html }: Props) => {
  const { editor } = useOutlineEditor(content, html, title);
  if (!editor) return null;
  return (
    <div className='flex items-start gap-x-10'>
      <TableOfContents editor={editor} />
      <div className='h-full w-[70%] overflow-y-auto bg-white px-8 py-6'>
        <EditorBubbleMenu editor={editor} />
        <EditorContent editor={editor} className='size-full overflow-y-auto' />
      </div>
    </div>
  );
};

export default EditorBlock;
