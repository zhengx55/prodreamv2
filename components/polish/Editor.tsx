'use client';
import BottomBar from '@/components/editor/bottombar';
import ExtensionKit from '@/lib/tiptap/extensions';
import '@/lib/tiptap/styles/index.css';
import { saveDoc } from '@/query/api';
import useAiEditor, { useUserTask } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { Editor as EditorType, useEditor } from '@tiptap/react';
import { AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import TableOfContents from '../editor/table-of-contents/TableOfContents';
import LazyMotionProvider from '../root/LazyMotionProvider';
import EditorBlock from './EditorContent';
import Guidence from './guide/Guidence';

const Editor = ({ essay_content }: { essay_content: string }) => {
  const { id }: { id: string } = useParams();
  const [showBottomBar, setShowBottomBar] = useState(true);
  const savingMode = useAiEditor((state) => state.savingMode);
  const setEditorInstance = useAiEditor((state) => state.setEditorInstance);
  const reset = useAiEditor((state) => state.reset);
  const doc_title = useAiEditor((state) => state.doc_title);
  const updateTitle = useAiEditor((state) => state.updateTitle);
  const toogleIsSaving = useAiEditor((state) => state.toogleIsSaving);
  const showGuidence = useUserTask((state) => state.shouldShowGuidence);
  const debouncedUpdatesTitle = useDebouncedCallback(async (title: string) => {
    if (title === doc_title) return;
    updateTitle(title);
    await saveDocument({ id, title: title });
  }, 1500);

  const debouncedUpdateText = useDebouncedCallback(async (text: string) => {
    await saveDocument({ id, content: text });
  }, 1500);

  const { mutateAsync: saveDocument } = useMutation({
    mutationFn: (params: { id: string; content?: string; title?: string }) =>
      saveDoc(params),
    onMutate: () => {
      toogleIsSaving(true);
    },
    onSettled: () => {
      toogleIsSaving(false);
    },
  });

  const editor = useEditor({
    extensions: [...ExtensionKit()],
    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'on',
        autocapitalize: 'off',
        class: 'min-h-full outline-none whitespace-pre-wrap',
      },
    },
    injectCSS: false,
    autofocus: 'end',
    content: essay_content ?? '',
    onCreate: ({ editor }) => {
      setEditorInstance(editor as EditorType);
    },
    onSelectionUpdate: ({ editor }) => {
      const { from, to } = editor.state.selection;
      from !== to ? setShowBottomBar(false) : setShowBottomBar(true);
    },
    onUpdate: ({ editor }) => {
      const title = editor.getJSON().content?.at(0)?.content?.at(0)?.text;
      const html = editor.getHTML();
      debouncedUpdatesTitle(title ?? '');
      debouncedUpdateText(html);
    },
    onDestroy: () => {
      reset();
    },
  });

  if (!editor) return null;
  return (
    <section className='flex w-full flex-col'>
      <div className='relative flex h-[calc(100%_-40px)] w-full'>
        <TableOfContents editor={editor} />
        <LazyMotionProvider>
          <AnimatePresence initial={false}>
            {showGuidence && <Guidence editor={editor} />}
          </AnimatePresence>
        </LazyMotionProvider>
        <EditorBlock editor={editor} />
      </div>
      {showBottomBar && (
        <div className='flex-center h-10 shrink-0 border-t border-shadow-border px-0'>
          <BottomBar editor={editor} />
        </div>
      )}
    </section>
  );
};

export default Editor;
