import BottomBar from '@/components/editor/bottombar';
import ExtensionKit from '@/lib/tiptap/extensions';
import '@/lib/tiptap/styles/index.css';
import { saveDoc } from '@/query/api';
import { useAIEditor } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { Editor as EditorType, useEditor } from '@tiptap/react';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import Procedure from './guide/Procedure';

const TableOfContents = dynamic(
  () => import('./table-of-contents/TableOfContents')
);
const EditorBlock = dynamic(() => import('./EditorContent'));
const PaymentModal = dynamic(() => import('@/components/pricing/Modal'), {
  ssr: false,
});
const Editor = ({ essay_content }: { essay_content: string }) => {
  const { id }: { id: string } = useParams();
  const [showBottomBar, setShowBottomBar] = useState(true);
  const setEditorInstance = useAIEditor((state) => state.setEditorInstance);
  const reset = useAIEditor((state) => state.reset);
  const doc_title = useAIEditor((state) => state.doc_title);
  const updateTitle = useAIEditor((state) => state.updateTitle);
  const toogleIsSaving = useAIEditor((state) => state.toogleIsSaving);

  const debouncedShowContinue = useDebouncedCallback((editor: EditorType) => {
    const { anchor } = editor.state.selection;
    const { doc } = editor.state;
    doc.descendants((node, pos) => {
      if (
        node.isText &&
        Boolean(node.textContent.trim()) &&
        pos + node.nodeSize === anchor
      ) {
      }
    });
  }, 2000);
  const debouncedUpdateText = useDebouncedCallback(
    async (title: string, text: string) => {
      const sanitize = (await import('sanitize-html')).default;
      const clean_text = sanitize(text, {
        allowedTags: [
          ...sanitize.defaults.allowedTags.filter(
            (item) => item !== 'mark' && item !== 'span'
          ),
          'intext-citation',
        ],
        allowedAttributes: {
          'intext-citation': ['citation_id', 'show_page', 'page_number'],
        },
      });
      if (title === doc_title) {
        await saveDocument({
          id,
          content: clean_text,
        });
      } else {
        updateTitle(title);
        await saveDocument({
          id,
          content: clean_text,
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
      if (from !== to) {
        setShowBottomBar(false);
      } else {
        setShowBottomBar(true);
        debouncedShowContinue(editor as EditorType);
      }
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

  if (!editor) return null;
  return (
    <section className='relative flex w-full flex-col'>
      <div className='flex h-full w-full'>
        <TableOfContents editor={editor} />
        <Procedure editor={editor} />
        <EditorBlock editor={editor} />
        <PaymentModal />
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
