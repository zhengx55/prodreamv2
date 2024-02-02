'use client';
import BottomBar from '@/components/editor/bottombar';
import Spacer from '@/components/root/Spacer';
import { useDebouncedState } from '@/hooks/useDebounceState';
import ExtensionKit from '@/lib/tiptap/extensions';
import '@/lib/tiptap/styles/index.css';
import { saveDoc } from '@/query/api';
import useAiEditor from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import useUpdateEffect from 'beautiful-react-hooks/useUpdateEffect';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { memo, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { AiMenu } from '../editor/ai-menu';
import { BubbleMenu } from '../editor/bubble-menu';
import { CitationMenu } from '../editor/citation-menu';
import { SynonymMenu } from '../editor/synonym-menu';
import TableOfContents from '../editor/table-of-contents/TableOfContents';

const Reference = dynamic(() => import('./Reference'));

const Tiptap = ({ essay_content }: { essay_content: string }) => {
  const { id }: { id: string } = useParams();
  const [showBottomBar, setShowBottomBar] = useState(true);
  const savingMode = useAiEditor((state) => state.savingMode);
  const setEditorInstance = useAiEditor((state) => state.setEditorInstance);
  const reset = useAiEditor((state) => state.reset);
  const doc_title = useAiEditor((state) => state.doc_title);
  const updateTitle = useAiEditor((state) => state.updateTitle);
  const showCopilotMenu = useAiEditor((state) => state.showCopilotMenu);
  const showCitiationMenu = useAiEditor((state) => state.showCitiationMenu);
  const showSynonymMenu = useAiEditor((state) => state.showSynonymMenu);
  const toogleIsSaving = useAiEditor((state) => state.toogleIsSaving);
  const [content, setContent] = useDebouncedState(essay_content, 1500);
  const debouncedUpdatesTitle = useDebouncedCallback(async (title: string) => {
    if (title === doc_title) return;
    updateTitle(title);
    await saveDocument({ id, title: title });
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

  useUpdateEffect(() => {
    if (savingMode) {
      saveDocument({ id, content: content });
    }
  }, [content, savingMode]);

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
    autofocus: true,
    content: essay_content ?? '',
    onCreate: ({ editor }) => {
      setEditorInstance(editor as Editor);
    },
    onSelectionUpdate: ({ editor }) => {
      const { from, to } = editor.state.selection;
      from !== to ? setShowBottomBar(false) : setShowBottomBar(true);
    },
    onUpdate: ({ editor }) => {
      const title = editor.getJSON().content?.at(0)?.content?.at(0)?.text;
      const html = editor.getHTML();
      debouncedUpdatesTitle(title ?? '');
      setContent(html);
    },
    onDestroy: () => {
      reset();
    },
  });
  if (!editor) return null;
  return (
    <section className='flex h-full w-full flex-col'>
      <div className='relative flex h-[calc(100%_-40px)] w-full'>
        <TableOfContents editor={editor} />
        <div
          aria-label='editor-parent'
          id='editor-parent'
          className='relative flex w-full flex-col overflow-y-auto rounded-lg pb-[30vh]'
        >
          <Spacer y='20' />
          {showSynonymMenu && <SynonymMenu editor={editor} />}
          {showCopilotMenu && <AiMenu editor={editor} />}
          {showCitiationMenu && <CitationMenu editor={editor} />}
          <BubbleMenu editor={editor} />
          <EditorContent
            className='flex-1'
            spellCheck={false}
            editor={editor}
          />
          <Spacer y='40' />
          <Reference />
        </div>
      </div>
      {showBottomBar && (
        <div className='flex-center h-10 shrink-0 border-t border-shadow-border px-0'>
          <BottomBar editor={editor} />
        </div>
      )}
    </section>
  );
};

export default memo(Tiptap);
