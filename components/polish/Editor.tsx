'use client';
import { useDebouncedState } from '@/hooks/useDebounceState';
import FontSize from '@/lib/tiptap/plugin/fontsize';
import SlashCommand from '@/lib/tiptap/plugin/slashcommand';
import '@/lib/tiptap/styles/index.css';
import { hasHtmlTags } from '@/lib/utils';
import { saveDoc } from '@/query/api';
import useRootStore from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import Blockquote from '@tiptap/extension-blockquote';
import Bold from '@tiptap/extension-bold';
import BulletList from '@tiptap/extension-bullet-list';
import CharacterCount from '@tiptap/extension-character-count';
import Document from '@tiptap/extension-document';
import Focus from '@tiptap/extension-focus';
import HardBreak from '@tiptap/extension-hard-break';
import Heading from '@tiptap/extension-heading';
import HighLight from '@tiptap/extension-highlight';
import History from '@tiptap/extension-history';
import Italic from '@tiptap/extension-italic';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import Placeholder from '@tiptap/extension-placeholder';
import Strike from '@tiptap/extension-strike';
import Text from '@tiptap/extension-text';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import useUpdateEffect from 'beautiful-react-hooks/useUpdateEffect';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { ChangeEvent, memo, useState } from 'react';
import Spacer from '../root/Spacer';
import { Input } from '../ui/input';
import EditBar from './EditBar';

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
    saveDocument({ id, text: content });
  }, [content]);

  const editor = useEditor({
    extensions: [
      CharacterCount,
      HardBreak,
      Bold,
      ListItem,
      OrderedList,
      BulletList,
      Text,
      Document,
      Paragraph,
      FontSize,
      Blockquote,
      TextStyle,
      History,
      Focus.configure({
        className: 'has-focus',
        mode: 'all',
      }),
      Placeholder.configure({
        includeChildren: true,
        showOnlyCurrent: false,
        placeholder: () => '',
      }),
      Heading.configure({ levels: [1, 2, 3] }),
      Strike,
      Italic,
      SlashCommand,
      TextAlign.extend({
        addKeyboardShortcuts() {
          return {};
        },
      }).configure({
        types: ['heading', 'paragraph'],
      }),
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
          'focus:outline-none max-w-full font-inter prose whitespace-pre-wrap prose-p:text-black-400 h-full',
        spellcheck: 'false',
      },
    },
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
      if (editor.getText() === content) return;
      toggleSaving(true);
      setContent(editor.getHTML());
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
          defaultValue={title}
          onChange={handleTitleChange}
          type='text'
          className='title-semibold h-full border-none p-0 capitalize shadow-none focus-visible:ring-0'
        />
      </div>
      <Spacer y='16' />
      <EditorContent className='min-h-full overflow-y-auto' editor={editor} />
      <div className='flex-between flex h-12 w-full px-0'>
        <p className='small-semibold text-shadow-100'>
          {editor.storage.characterCount.words()}
          &nbsp;Words
        </p>
        {saving ? (
          <p className='small-semibold flex items-center gap-x-1 text-shadow-100'>
            <Loader2 className='animate-spin' size={16} />
            Saving
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default memo(Tiptap);
