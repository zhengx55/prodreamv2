import ExtensionKit from '@/lib/tiptap/extensions';
import '@/lib/tiptap/styles/index.css';
import { saveDoc } from '@/query/api';
import { useAIEditor } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { Editor as EditorType, posToDOMRect, useEditor } from '@tiptap/react';
import useWindowResize from 'beautiful-react-hooks/useWindowResize';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function useEditorInstance(essay_content: string | undefined) {
  const {
    setEditorInstance,
    reset,
    doc_title,
    updateTitle,
    toogleIsSaving,
    disableContinue,
    updateshowContinue,
  } = useAIEditor((state) => ({
    ...state,
  }));
  const [showBottomBar, setShowBottomBar] = useState(true);
  const onWindowResize = useWindowResize();
  const { id }: { id: string } = useParams();

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
        class: 'outline-none pb-[30vh] whitespace-pre-wrap',
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
  return { editor, showBottomBar };
}
