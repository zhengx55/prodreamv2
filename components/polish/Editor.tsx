'use client';
import BottomBar from '@/components/editor/bottombar';
import { sample_title } from '@/constant';
import ExtensionKit from '@/lib/tiptap/extensions';
import '@/lib/tiptap/styles/index.css';
import { saveDoc } from '@/query/api';
import { IGuidence } from '@/types';
import useAiEditor, { useUserInfo } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { Editor as EditorType, useEditor } from '@tiptap/react';
import useLocalStorage from 'beautiful-react-hooks/useLocalStorage';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import TableOfContents from '../editor/table-of-contents/TableOfContents';
import EditorContent from './EditorContent';

const Editor = ({ essay_content }: { essay_content: string }) => {
  const { id }: { id: string } = useParams();
  const user_id = useUserInfo((state) => state.user.user_id);
  const [showBottomBar, setShowBottomBar] = useState(true);
  const savingMode = useAiEditor((state) => state.savingMode);
  const setEditorInstance = useAiEditor((state) => state.setEditorInstance);
  const reset = useAiEditor((state) => state.reset);
  const doc_title = useAiEditor((state) => state.doc_title);
  const updateTitle = useAiEditor((state) => state.updateTitle);
  const toogleIsSaving = useAiEditor((state) => state.toogleIsSaving);
  const [guidenceStatus, setGuidenceStatus] =
    useLocalStorage<Record<string, IGuidence>>('guidence-status');
  const [showGuidence, setShowGuidence] = useState(false);

  const memoHideGuidence = useCallback(() => {
    setShowGuidence(false);
    // setGuidenceStatus({
    //   [user_id]: {
    //     show_guidence: false,
    //   },
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_id]);

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

  useEffect(() => {
    if (!guidenceStatus) return;
    if (!editor) return;
    editor.commands.setContent(sample_title, true);
    if (guidenceStatus[user_id].show_guidence) {
      setShowGuidence(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, guidenceStatus, user_id]);

  if (!editor) return null;
  return (
    <section className='flex w-full flex-col'>
      <div className='relative flex h-[calc(100%_-40px)] w-full'>
        <TableOfContents editor={editor} />
        {/* <LazyMotionProvider>
          <AnimatePresence initial={false}>
            {showGuidence && (
              <Guidence editor={editor} close={memoHideGuidence} />
            )}
          </AnimatePresence>
        </LazyMotionProvider> */}
        <EditorContent editor={editor} />
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
