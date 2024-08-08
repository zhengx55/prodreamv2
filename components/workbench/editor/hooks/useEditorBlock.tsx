import { findTitle } from '@/lib/tiptap/utils';
import { getDraftSteam, useSaveDraft } from '@/query/draft';
import { useSaveOutline } from '@/query/outline';
import { useEditor as useEditorStore } from '@/zustand/store';
import {
  getHierarchicalIndexes,
  TableOfContents,
} from '@tiptap-pro/extension-table-of-contents';
import type { Editor } from '@tiptap/core';
import CharacterCount from '@tiptap/extension-character-count';
import Document from '@tiptap/extension-document';
import Heading from '@tiptap/extension-heading';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import type { Transaction } from '@tiptap/pm/state';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { marked } from 'marked';
import { useParams, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import TurndownService from 'turndown';
import { useDebouncedCallback } from 'use-debounce';

const Title = Heading.extend({
  name: 'title',
  group: 'title',
  parseHTML: () => [{ tag: 'h1:first-child' }],
}).configure({ levels: [1] });

const CustomDocument = Document.extend({
  content: 'title block*',
});

export default function useEditorBlock(
  defaultContent?: string,
  defaultHTML?: string,
  defaultTitle?: string
) {
  const setEditor = useEditorStore((state) => state.setEditor);
  const clearStore = useEditorStore((state) => state.clearStore);
  const setEditorContentGenerating = useEditorStore(
    (state) => state.setEditorContentGenerating
  );
  const { id } = useParams();
  const path = usePathname();
  const shouldTriggerDraftStream =
    path.includes('draft&feedback') && Boolean(id) && !defaultContent;
  const { mutateAsync: saveDraftFile } = useSaveDraft();
  const { mutateAsync: saveOutlineFile } = useSaveOutline();
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
    2000
  );
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      Title,
      CustomDocument,
      Underline,
      CharacterCount,
      TableOfContents.configure({
        getIndex: getHierarchicalIndexes,
      }),
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
          if (node.type.name === 'title') {
            return 'Enter Title';
          }
          return 'Enter Content';
        },
      }),
    ],
    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        spellcheck: 'false',
        class: 'min-h-full focus:outline-none prose prose-base !max-w-none',
      },
    },
    content: defaultHTML
      ? defaultHTML
      : defaultContent
        ? `<h1>Untitled</h1> ${marked.parse(defaultContent)}`
        : '',
    onCreate: async ({ editor }) => {
      setEditor(editor as any);
    },
    onUpdate: debouncedCallback,
    onDestroy: () => {
      clearStore();
    },
  });

  useEffect(() => {
    async function getStream() {
      if (shouldTriggerDraftStream && editor) {
        setEditorContentGenerating(true);
        await getDraftSteam(id as string, editor as any);
        setEditorContentGenerating(false);
      }
    }
    getStream();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldTriggerDraftStream, editor, id]);

  return { editor };
}
