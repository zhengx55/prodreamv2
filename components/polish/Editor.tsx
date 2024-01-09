'use client';
import { TextMenu } from '@/components/editor/text';
import { useDebouncedState } from '@/hooks/useDebounceState';
import ExtensionKit from '@/lib/tiptap/extensions';
import '@/lib/tiptap/styles/index.css';
import { hasHtmlTags } from '@/lib/utils';
import { saveDoc } from '@/query/api';
import useRootStore from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import useUpdateEffect from 'beautiful-react-hooks/useUpdateEffect';
import { useParams } from 'next/navigation';
import { ChangeEvent, memo, useState } from 'react';
import BottomBar from '../editor/bottombar';
import Spacer from '../root/Spacer';
import { Input } from '../ui/input';

const Tiptap = ({
  essay_content,
  essay_title,
}: {
  essay_content: string;
  essay_title: string;
}) => {
  const { id }: { id: string } = useParams();
  const reset = useRootStore((state) => state.reset);
  const [title, setTitle] = useDebouncedState(essay_title, 1500);
  const [content, setContent] = useDebouncedState(essay_content, 1500);
  const [saving, toggleSaving] = useState(false);
  const setEditorInstance = useRootStore((state) => state.setEditorInstance);
  const savingMode = useRootStore((state) => state.savingMode);
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
        class:
          'focus:outline-none max-w-full font-inter prose whitespace-pre-wrap h-full',
        spellcheck: 'false',
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
      if (editor.getHTML() === content) return;
      if (savingMode) {
        toggleSaving(true);
        setContent(editor.getHTML());
      }
    },
    onDestroy: () => {
      reset();
    },
  });
  if (!editor) return null;

  return (
    <div
      aria-label='editor-parent'
      className='flex h-full w-full flex-col rounded-lg'
    >
      {/* <EditBar /> */}
      <div className='flex h-12 w-full shrink-0 border-b-2 border-shadow-border'>
        <Input
          placeholder={'Untitled Document'}
          defaultValue={title}
          onChange={handleTitleChange}
          type='text'
          id='title'
          className='title-semibold h-full border-none p-0 font-inter capitalize shadow-none focus-visible:ring-0'
        />
      </div>
      <Spacer y='16' />
      <TextMenu editor={editor} />
      <EditorContent
        spellCheck
        className='h-full overflow-y-auto'
        editor={editor}
      />
      <div className='flex h-10 w-full shrink-0 px-0'>
        <BottomBar editor={editor} />
        {/* {saving ? (
          <p className='small-semibold flex items-center gap-x-1 text-shadow-100'>
            <Loader2 className='animate-spin' size={16} />
            Saving
          </p>
        ) : null} */}
      </div>
    </div>
  );
};

export default memo(Tiptap);
