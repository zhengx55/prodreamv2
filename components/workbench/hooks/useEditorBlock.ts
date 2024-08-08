import { findTitle } from '@/lib/tiptap/utils';
import { useGetDraftStream } from '@/query/draft';
import { useEditor as useEditorStore } from '@/zustand/store';
import type { Editor } from '@tiptap/core';
import CharacterCount from '@tiptap/extension-character-count';
import Document from '@tiptap/extension-document';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import type { Transaction } from '@tiptap/pm/state';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { marked } from 'marked';
import { useAction } from 'next-safe-action/hooks';
import { useParams, usePathname } from 'next/navigation';
import TurndownService from 'turndown';
import { useDebouncedCallback } from 'use-debounce';
import { updateDraft } from '../draft/server_actions/actions';
import { updateOutline } from '../outline/server_actions/actions';

const CustomDocument = Document.extend({
  content: 'heading block*',
});

export default function useEditorBlock(
  defaultContent?: string,
  defaultHTML?: string,
  defaultTitle?: string
) {
  const setEditor = useEditorStore((state) => state.setEditor);
  const clearStore = useEditorStore((state) => state.clearStore);
  const { id } = useParams();
  const path = usePathname();
  const shouldTriggerDraftStream =
    path.includes('draft&feedback') && Boolean(id) && !defaultContent;

  useGetDraftStream(id as string, shouldTriggerDraftStream);

  const { execute: saveOutlineFile } = useAction(updateOutline);
  const { execute: saveDraftFile } = useAction(updateDraft);
  const debouncedCallback = useDebouncedCallback(
    ({ editor }: { editor: Editor; transaction: Transaction }) => {
      if (!id) return;
      const currentTitle = findTitle(editor as any).content;
      const currentHTML = editor.getHTML();
      const updatedTitle = currentTitle !== defaultTitle ? currentTitle : null;
      const turnDownService = new TurndownService();
      const updatedHTML = currentHTML !== defaultHTML ? currentHTML : null;
      const updatedContent = updatedHTML
        ? turnDownService.turndown(currentHTML.replace(/<h1>.*?<\/h1>/, ''))
        : null;
      if (path.includes('outline')) {
        saveOutlineFile({
          outline_id: id as string,
          title: updatedTitle,
          content: updatedContent,
          html: updatedHTML,
        });
      } else if (path.includes('draft')) {
        saveDraftFile({
          draft_id: id as string,
          title: updatedTitle,
          content: updatedContent,
          html: updatedHTML,
        });
      }
    },
    1000
  );

  return useEditor({
    extensions: [
      CustomDocument,
      Underline,
      CharacterCount,
      TextAlign.extend({
        addKeyboardShortcuts() {
          return {};
        },
      }).configure({
        types: ['heading', 'paragraph'],
      }),
      StarterKit.configure({
        document: false,
      }),
      Placeholder.configure({
        emptyNodeClass: 'empty-node',
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return 'Enter Title';
          }
          return 'Enter Content';
        },
      }),
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        spellcheck: 'false',
        class:
          'min-h-full prose prose-p:my-2 !max-w-none prose-base focus:outline-none',
      },
    },
    content: defaultHTML
      ? defaultHTML
      : defaultContent
        ? `<h1>Untitled</h1> ${marked.parse(defaultContent)}`
        : '',
    onCreate: ({ editor }) => {
      setEditor(editor as any);
    },
    onUpdate: debouncedCallback,
    onDestroy: () => {
      clearStore();
    },
  });
}
