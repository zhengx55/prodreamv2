import BottomBar from '@/components/editor/bottombar';
import ExtensionKit from '@/lib/tiptap/extensions';
import '@/lib/tiptap/styles/index.css';
import { saveDoc } from '@/query/api';
import { useMutateTrackInfo, useUserTrackInfo } from '@/query/query';
import useAiEditor, { useUserTask } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { Editor as EditorType, useEditor } from '@tiptap/react';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const TableOfContents = dynamic(
  () => import('../editor/table-of-contents/TableOfContents')
);
const Guidence = dynamic(() => import('./guide/Guidence'));
const OutlineTip = dynamic(
  () => import('./guide/tips/FloatingTip').then((mod) => mod.OutlineTip),
  {
    ssr: false,
  }
);
const ContinueTip = dynamic(
  () => import('./guide/tips/FloatingTip').then((mod) => mod.ContinueTip),
  {
    ssr: false,
  }
);
const EditorBlock = dynamic(() => import('./EditorContent'));

const Editor = ({ essay_content }: { essay_content: string }) => {
  const { id }: { id: string } = useParams();
  const [showBottomBar, setShowBottomBar] = useState(true);
  const setEditorInstance = useAiEditor((state) => state.setEditorInstance);
  const reset = useAiEditor((state) => state.reset);
  const doc_title = useAiEditor((state) => state.doc_title);
  const updateTitle = useAiEditor((state) => state.updateTitle);
  const toogleIsSaving = useAiEditor((state) => state.toogleIsSaving);
  const { data: userTrack, isPending } = useUserTrackInfo();
  const outline_step = useUserTask((state) => state.outline_step);
  const continue_step = useUserTask((state) => state.continue_step);
  const { mutateAsync: updateTrack } = useMutateTrackInfo();

  const showGuidance =
    !Boolean(userTrack?.guidence) && outline_step === 0 && continue_step === 0;
  const showOutlineTip = Boolean(userTrack?.guidence) && outline_step === 1;
  const showContinueTip = Boolean(userTrack?.guidence) && continue_step === 1;
  const debouncedUpdateText = useDebouncedCallback(
    async (title: string, text: string) => {
      if (title === doc_title) {
        await saveDocument({
          id,
          content: text,
        });
      } else {
        updateTitle(title);
        await saveDocument({
          id,
          content: text,
          title: title,
        });
      }
    },
    1500
  );

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
      debouncedUpdateText(title ?? '', html);
    },
    onDestroy: () => {
      reset();
    },
  });

  if (!editor || isPending) return null;
  return (
    <section className='relative flex w-full flex-col'>
      <div className='relative flex h-full w-full'>
        <TableOfContents editor={editor} />
        <button
          onClick={async () => {
            await updateTrack({ field: 'guidence', data: '' });
          }}
        >
          test
        </button>
        <AnimatePresence mode='wait'>
          {showGuidance && <Guidence editor={editor} />}
          {showOutlineTip && <OutlineTip editor={editor} />}
          {showContinueTip && <ContinueTip editor={editor} />}
        </AnimatePresence>
        <EditorBlock editor={editor} />
      </div>
      {showBottomBar && (
        <div className='flex-center absolute bottom-0 h-10 w-full shrink-0 border-t border-shadow-border bg-white px-0'>
          <BottomBar editor={editor} />
        </div>
      )}
    </section>
  );
};

export default Editor;
