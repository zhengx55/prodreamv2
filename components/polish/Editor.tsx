'use client';
import useRootStore from '@/zustand/store';
import Bold from '@tiptap/extension-bold';
import CharacterCount from '@tiptap/extension-character-count';
import Document from '@tiptap/extension-document';
import HardBreak from '@tiptap/extension-hard-break';
import HighLight from '@tiptap/extension-highlight';
import History from '@tiptap/extension-history';
import Paragraph from '@tiptap/extension-paragraph';
import Strike from '@tiptap/extension-strike';
import Text from '@tiptap/extension-text';
import Underline from '@tiptap/extension-underline';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import Spacer from '../root/Spacer';
import EditBar from './EditBar';

const Tiptap = () => {
  const globalEssay = useRootStore((state) => state.eassy);
  const updateGlobalEssay = useRootStore((state) => state.updateEssay);
  const reset = useRootStore((state) => state.reset);
  const setEditorInstance = useRootStore((state) => state.setEditorInstance);
  const editor = useEditor({
    extensions: [
      CharacterCount,
      HardBreak,
      Bold,
      Text,
      Document,
      Paragraph,
      History,
      Strike,
      HighLight.configure({
        multicolor: true,
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
    content: globalEssay
      ? `${globalEssay
          .split(/\n\s*\n/)
          .map((paragraph) => `<p>${paragraph}</p>`)
          .join('')}`
      : '',
    parseOptions: {
      preserveWhitespace: 'full',
    },
    onCreate: ({ editor }) => {
      setEditorInstance(editor as Editor);
    },
    onDestroy: () => {
      if (globalEssay) updateGlobalEssay('');
      reset();
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
      <EditorContent className='min-h-full overflow-y-auto' editor={editor} />
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
