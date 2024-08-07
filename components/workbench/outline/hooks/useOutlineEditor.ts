import { useEditor as useEditorStore } from '@/zustand/store';
import Document from '@tiptap/extension-document';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { marked } from 'marked';
const CustomDocument = Document.extend({
  content: 'heading block*',
});

export default function useOutlineEditor(
  defaultContent?: string,
  defaultHTML?: string
) {
  const setEditor = useEditorStore((state) => state.setEditor);
  const clearStore = useEditorStore((state) => state.clearStore);
  return useEditor({
    extensions: [
      CustomDocument,
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
    autofocus: 'end',
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
    onDestroy: () => {
      clearStore();
    },
  });
}
