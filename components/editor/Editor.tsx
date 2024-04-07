import BottomBar from '@/components/editor/bottombar';
import ExtensionKit from '@/lib/tiptap/extensions';
import '@/lib/tiptap/styles/index.css';
import { saveDoc } from '@/query/api';
import { useUserTrackInfo } from '@/query/query';
import { DocPageDicType } from '@/types';
import { useAIEditor } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { Editor as EditorType, posToDOMRect, useEditor } from '@tiptap/react';
import useWindowResize from 'beautiful-react-hooks/useWindowResize';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import Icon from '../root/Icon';
import { Button } from '../ui/button';
import Procedure from './guide/Procedure';

const TableOfContents = dynamic(
  () => import('./table-of-contents/TableOfContents')
);
const EditorBlock = dynamic(() => import('./EditorBlock'));
const PaymentModal = dynamic(() => import('@/components/pricing/Modal'), {
  ssr: false,
});
const OutlineWaitingModal = dynamic(() => import('./guide/Waiting'), {
  ssr: false,
});
const Editor = ({
  essay_content,
  ...props
}: { essay_content: string } & DocPageDicType) => {
  const { id }: { id: string } = useParams();
  const { data: track } = useUserTrackInfo();
  const [showBottomBar, setShowBottomBar] = useState(true);
  const {
    setEditorInstance,
    updateRightbarTab,
    reset,
    doc_title,
    updateTitle,
    toogleIsSaving,
    disableContinue,
    updateshowContinue,
  } = useAIEditor((state) => ({
    ...state,
  }));
  const onWindowResize = useWindowResize();

  onWindowResize(() => {
    updateshowContinue(null);
  });

  const debouncedShowContinue = useDebouncedCallback((editor: EditorType) => {
    if (disableContinue) return;
    const { anchor, from, to } = editor.state.selection;
    if (from !== to) return;
    const { doc } = editor.state;
    doc.descendants((node, pos) => {
      if (
        node.type.name === 'paragraph' &&
        Boolean(node.textContent.trim()) &&
        pos + node.nodeSize - 1 === anchor
      ) {
        const coordinate = posToDOMRect(editor.view, anchor, anchor);
        const parentElement = editor.view.dom.parentElement?.parentElement;
        const scrollTop = parentElement?.scrollTop ?? 0;
        updateshowContinue({
          top: coordinate.top - 58 + scrollTop,
          left: coordinate.left - 150 + window.scrollX,
        });
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
        class: 'outline-none whitespace-pre-wrap',
      },
    },
    injectCSS: false,
    autofocus: 'end',
    content: essay_content ?? '',
    onCreate: ({ editor }) => {
      setEditorInstance(editor as EditorType);
    },
    onSelectionUpdate: ({ editor }) => {
      updateshowContinue(null);
      debouncedShowContinue(editor as EditorType);
      const { from, to } = editor.state.selection;
      if (from !== to) {
        setShowBottomBar(false);
      } else if (from === to) {
        setShowBottomBar(true);
      }
    },

    onFocus: ({ editor }) => {
      editor.view.dom.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        editor.commands.blur();
        editor.commands.setTextSelection(0);
      });
    },

    onBlur: ({ editor }) => {
      editor.view.dom.removeEventListener('contextmenu', (e) => {
        e.preventDefault();
        editor.commands.blur();
        editor.commands.setTextSelection(0);
      });
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
      <Button
        className='absolute bottom-2 right-2 z-50 h-max w-max cursor-pointer bg-transparent p-0'
        role='button'
        onClick={() => updateRightbarTab(6)}
      >
        <Icon
          src='/editor/chatbot/trigger.svg'
          alt='trigger_chat'
          height={44}
          width={44}
          priority
        />
      </Button>

      <div className='flex h-full w-full'>
        <TableOfContents editor={editor} />
        {Boolean(track?.guidence) && <EditorBlock {...props} editor={editor} />}
        <Procedure t={props.t} editor={editor} />
        <PaymentModal />
        <OutlineWaitingModal />
      </div>
      <AnimatePresence>
        {showBottomBar && <BottomBar t={props.t} editor={editor} />}
      </AnimatePresence>
    </section>
  );
};

export default Editor;
