'use client';
import { TrailingNode } from '@/extension/TrailingNode';
import useRootStore from '@/zustand/store';
import DragHandle from '@tiptap-pro/extension-drag-handle-react';
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
import { GripVertical } from 'lucide-react';
import Spacer from '../root/Spacer';
import { Input } from '../ui/input';
import EditBar from './EditBar';

const Tiptap = ({ content }: { content: string }) => {
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
      TrailingNode,
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
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        class:
          'focus:outline-none max-w-full prose whitespace-pre-wrap prose-p:text-black-400 h-full',
        spellcheck: 'false',
      },
    },
    injectCSS: false,
    autofocus: true,
    content: content
      ? `${content
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
      reset();
    },
  });
  if (!editor) return null;

  return (
    <div
      aria-label='editor-parent'
      className='flex h-[calc(100%_-125px)] w-full flex-col rounded-lg pb-2'
    >
      <EditBar />
      <Spacer y='16' />
      <div className='flex h-12 w-full shrink-0 border-b-2 border-shadow-border'>
        <Input
          placeholder={'Untitled Document'}
          type='text'
          className='title-semibold h-full border-none p-0 shadow-none focus-visible:ring-0'
        />
      </div>
      <Spacer y='16' />
      <DragHandle
        pluginKey='menu'
        editor={editor}
        onNodeChange={() => {}}
        tippyOptions={{
          offset: [-2, 16],
          zIndex: 99,
        }}
      >
        <div className='flex items-center gap-0.5'>
          <GripVertical />
        </div>
      </DragHandle>
      <EditorContent className='min-h-full overflow-y-auto' editor={editor} />
      <div className='flex-between flex h-12 w-full px-0'>
        <p className='small-semibold text-shadow-100'>
          {editor.storage.characterCount.words()}
          &nbsp;Words
        </p>
      </div>
    </div>
  );
};

export default Tiptap;
