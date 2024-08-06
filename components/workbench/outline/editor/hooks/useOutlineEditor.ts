import Document from '@tiptap/extension-document';
import Placeholder from '@tiptap/extension-placeholder';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
const CustomDocument = Document.extend({
  content: 'heading block*',
});

export default function useOutlineEditor() {
  return useEditor({
    extensions: [
      CustomDocument,
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
        class: 'min-h-full prose prose-p:my-1.5 prose-base focus:outline-none',
      },
    },
    content: '',
  });
}
