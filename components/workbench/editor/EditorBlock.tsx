import { useEditor } from '@/zustand/store';
import { EditorContent } from '@tiptap/react';
import CopilotMenu from './CopilotMenu';
import EditorBubbleMenu from './EditorBubbleMenu';
import EditorTopMenu from './EditorTopMenu';
import useEditorBlock from './hooks/useEditorBlock';
import TableOfContents from './TableOfContents';
type Props = {
  title?: string;
  content?: string;
  html?: string;
};

const EditorBlock = ({ title, content, html }: Props) => {
  const { editor } = useEditorBlock(content, html, title);
  const showCopilotMenu = useEditor((state) => state.showCopilot);
  if (!editor) return null;
  return (
    <>
      <TableOfContents editor={editor} />
      <EditorTopMenu editor={editor} />
      <div className='relative ml-[120px] size-full overflow-y-auto bg-white px-[60px] py-6 2xl:ml-0 2xl:w-[70%]'>
        <EditorBubbleMenu editor={editor} />
        <EditorContent editor={editor} />
        {showCopilotMenu && <CopilotMenu editor={editor} />}
      </div>
    </>
  );
};

export default EditorBlock;
