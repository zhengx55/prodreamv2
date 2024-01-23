'use client';
import BottomBar from '@/components/editor/bottombar';
import { TableOfContent } from '@/components/editor/table-of-contents';
import Spacer from '@/components/root/Spacer';
import { Input } from '@/components/ui/input';
import { useDebouncedState } from '@/hooks/useDebounceState';
import ExtensionKit from '@/lib/tiptap/extensions';
import '@/lib/tiptap/styles/index.css';
import { hasHtmlTags } from '@/lib/utils';
import { saveDoc } from '@/query/api';
import useAiEditor from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { Editor, useEditor } from '@tiptap/react';
import useUpdateEffect from 'beautiful-react-hooks/useUpdateEffect';
import { useParams } from 'next/navigation';
import { ChangeEvent, memo, useState } from 'react';
import { AiMenu } from '../editor/ai-menu';
import { BlockMenu } from '../editor/blockmenu';
import { BubbleMenu } from '../editor/bubble-menu';
import { CitationMenu } from '../editor/citation-menu';
import { SynonymMenu } from '../editor/synonym-menu';
import Reference from './Reference';

const Tiptap = ({
  essay_content,
  essay_title,
}: {
  essay_content: string;
  essay_title: string;
}) => {
  const { id }: { id: string } = useParams();
  const reset = useAiEditor((state) => state.reset);
  const showCopilotMenu = useAiEditor((state) => state.showCopilotMenu);
  const showCitiationMenu = useAiEditor((state) => state.showCitiationMenu);
  const showSynonymMenu = useAiEditor((state) => state.showSynonymMenu);
  const [title, setTitle] = useDebouncedState(essay_title, 1500);
  const [content, setContent] = useDebouncedState(essay_content, 1500);
  const [saving, toggleSaving] = useState(false);
  const setEditorInstance = useAiEditor((state) => state.setEditorInstance);
  const savingMode = useAiEditor((state) => state.savingMode);
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    toggleSaving(true);
    setTitle(e.currentTarget.value);
  };
  const { mutateAsync: saveDocument } = useMutation({
    mutationFn: (params: { id: string; text?: string; title?: string }) =>
      saveDoc(params),
    onSuccess: () => {
      toggleSaving(false);
    },
    onError: () => {
      toggleSaving(false);
    },
  });

  useUpdateEffect(() => {
    saveDocument({ id, title });
  }, [title]);

  useUpdateEffect(() => {
    if (savingMode) {
      saveDocument({ id, text: content });
    }
  }, [content, savingMode]);

  const editor = useEditor({
    extensions: [...ExtensionKit()],
    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'on',
        autocapitalize: 'off',
        class: 'min-h-full whitespace-pre-wrap',
      },
    },
    injectCSS: false,
    autofocus: true,
    content: essay_content
      ? hasHtmlTags(essay_content)
        ? essay_content
        : `${essay_content
            .split(/\n\s*\n/)
            .map((paragraph) => `<p>${paragraph}</p>`)
            .join('')}`
      : '',
    onCreate: ({ editor }) => {
      setEditorInstance(editor as Editor);
      editor.commands.focus('end');
    },
    onUpdate: ({ editor }) => {
      // if (editor.getHTML() === content) return;
      // if (savingMode) {
      //   toggleSaving(true);
      //   setContent(editor.getHTML());
      // }
    },
    onDestroy: () => {
      reset();
    },
  });
  if (!editor) return null;
  return (
    <section className='flex h-full w-full flex-col'>
      <div className='relative flex h-[calc(100%_-40px)] w-full'>
        <TableOfContent editor={editor} />
        <div
          aria-label='editor-parent'
          className='relative flex w-full flex-col overflow-y-auto rounded-lg pb-[30vh]'
        >
          <Spacer y='30' />
          <div className='flex h-12 w-full justify-center'>
            <Input
              placeholder={'Untitled Document'}
              defaultValue={title}
              onChange={handleTitleChange}
              type='text'
              id='title'
              className='h1-bold h-full w-[750px] border-none p-0 font-inter capitalize shadow-none focus-visible:ring-0'
            />
          </div>
          <Spacer y='20' />
          {showSynonymMenu && <SynonymMenu editor={editor} />}
          {showCopilotMenu && <AiMenu editor={editor} />}
          {showCitiationMenu && <CitationMenu editor={editor} />}
          <BubbleMenu editor={editor} />
          {/* <EditorContent className='flex-1' editor={editor} /> */}
          <BlockMenu editor={editor} />
          <Spacer y='20' />
          <Reference />
        </div>
      </div>
      <div className='flex-center h-10 shrink-0 border-t border-shadow-border px-0'>
        <BottomBar editor={editor} />
      </div>
    </section>
  );
};

export default memo(Tiptap);
