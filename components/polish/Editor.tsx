'use client';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
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
import useAIEditorStore from '@/zustand/store';
import Spacer from '../root/Spacer';
import Bold from '@tiptap/extension-bold';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {}
}

const Tiptap = () => {
  const globalEssay = useAIEditorStore((state) => state.eassy);
  const updateGlobalEssay = useAIEditorStore((state) => state.updateEssay);
  const setEditorInstance = useAIEditorStore(
    (state) => state.setEditorInstance
  );
  const editor = useEditor({
    extensions: [
      CharacterCount,
      HardBreak,
      Bold,
      Text,
      Document,
      Paragraph,
      History.configure({
        depth: 10,
      }),
      Strike,
      HighLight.configure({
        multicolor: false,
        HTMLAttributes: {
          class: 'bg-[#E9DAFF]',
        },
      }),
      Underline.configure({
        HTMLAttributes: {
          class: 'decoration-[2px] decoration-red-400 underline-offset-[5px]',
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          'focus:outline-none max-w-full prose prose-p:text-black-400 h-full',
        spellcheck: 'false',
      },
    },
    injectCSS: false,
    autofocus: true,
    content: globalEssay ? `${globalEssay}` : '',
    parseOptions: {
      preserveWhitespace: 'full',
    },
    onCreate: ({ editor }) => {
      setEditorInstance(editor as Editor);
    },
    onDestroy: () => {
      if (globalEssay) updateGlobalEssay('');
    },
  });
  if (!editor) return null;

  return (
    <div
      aria-label='editor-parent'
      className='flex h-[calc(100%_-50px)] w-full flex-col rounded-lg pb-2'
    >
      <EditBar />
      <Spacer y='10' />
      <EditorContent
        className='min-h-full overflow-y-auto whitespace-pre-wrap'
        editor={editor}
      />
      <div className='flex-between flex h-12 w-full'>
        <p className='small-semibold text-shadow-100'>
          {editor.storage.characterCount.words()}
          &nbsp;Words
        </p>
      </div>
    </div>
  );
};

export default Tiptap;
