'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import Text from '@tiptap/extension-text';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import History from '@tiptap/extension-history';
import Strike from '@tiptap/extension-strike';
import HighLight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import HardBreak from '@tiptap/extension-hard-break';
import CharacterCount from '@tiptap/extension-character-count';
import EditBar from './EditBar';
const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      CharacterCount,
      HardBreak,
      Text,
      Document,
      Paragraph,
      History.configure({
        depth: 10,
      }),
      Strike,
      HighLight.configure({
        multicolor: false,
      }),
      Underline,
    ],
    editorProps: {
      attributes: {
        class:
          'focus:outline-none max-w-full prose prose-lg prose-p:text-black-400 h-full',
        spellcheck: 'false',
      },
    },
    injectCSS: false,
    autofocus: true,
    content: '',
  });
  if (!editor) return null;

  return (
    <div
      aria-label='editor-parent'
      className={`relative flex h-[calc(100%_-50px)] w-full flex-col rounded-lg py-6`}
    >
      <EditBar />
      <EditorContent
        className='min-h-full overflow-y-auto whitespace-pre-wrap'
        editor={editor}
      />
      <div className='flex-between absolute -bottom-6 left-0 flex h-12 w-full'>
        <p className='small-semibold text-shadow-100'>
          {editor.storage.characterCount.words()}
          &nbsp;Words
        </p>
      </div>
    </div>
  );
};

export default Tiptap;
