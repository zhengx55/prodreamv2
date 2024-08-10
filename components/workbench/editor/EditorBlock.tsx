import { EditorContent } from '@tiptap/react';
import EditorBubbleMenu from './EditorBubbleMenu';
import useOutlineEditor from './hooks/useEditorBlock';
import TableOfContents from './TableOfContents';
type Props = {
  title?: string;
  content?: string;
  html?: string;
};

const EditorBlock = ({ title, content, html }: Props) => {
  const { editor } = useOutlineEditor(content, html, title);
  if (!editor) return null;
  return (
    <>
      <TableOfContents editor={editor} />
      <div className='ml-[120px] h-full w-full overflow-y-auto bg-white px-8 py-6 2xl:ml-0 2xl:w-[70%]'>
        <EditorBubbleMenu editor={editor} />
        <EditorContent editor={editor} className='size-full overflow-y-auto' />
      </div>
    </>
  );
};

export default EditorBlock;
