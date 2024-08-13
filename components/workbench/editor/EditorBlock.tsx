import { EditorContent } from '@tiptap/react';
import EditorBubbleMenu from './EditorBubbleMenu';
import useEditorBlock from './hooks/useEditorBlock';
import TableOfContents from './TableOfContents';
type Props = {
  title?: string;
  content?: string;
  html?: string;
};

const EditorBlock = ({ title, content, html }: Props) => {
  const { editor } = useEditorBlock(content, html, title);
  if (!editor) return null;
  return (
    <>
      <TableOfContents editor={editor} />
      <div className='relative ml-[120px] size-full overflow-y-auto bg-white px-[60px] py-6 2xl:ml-0 2xl:w-[70%]'>
        <EditorBubbleMenu editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </>
  );
};

export default EditorBlock;
