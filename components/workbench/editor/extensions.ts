import FontSize from '@/lib/tiptap/plugin/fontsize';
import { TrailingNode } from '@/lib/tiptap/plugin/trailing-node';
import {
  getHierarchicalIndexes,
  TableOfContents,
} from '@tiptap-pro/extension-table-of-contents';
import CharacterCount from '@tiptap/extension-character-count';
import Document from '@tiptap/extension-document';
import Heading from '@tiptap/extension-heading';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';

const Title = Heading.extend({
  name: 'title',
  group: 'title',
  parseHTML: () => [{ tag: 'h1:first-child' }],
}).configure({ levels: [1] });

const CustomDocument = Document.extend({
  content: 'title block*',
});

const EditorExtensions = () => [
  TextStyle,
  Title,
  TrailingNode,
  CustomDocument,
  Underline,
  CharacterCount,
  FontSize,
  Highlight,
  TableOfContents.configure({
    getIndex: getHierarchicalIndexes,
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  StarterKit.configure({
    document: false,
    dropcursor: {
      color: '#e2e8f0',
    },
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
];

export default EditorExtensions;
