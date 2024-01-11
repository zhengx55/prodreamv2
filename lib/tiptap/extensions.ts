'use client';
import FontSize from '@/lib/tiptap/plugin/fontsize';
import SlashCommand from '@/lib/tiptap/plugin/slashcommand';
import TableOfContent from '@tiptap-pro/extension-table-of-content';
import Blockquote from '@tiptap/extension-blockquote';
import Bold from '@tiptap/extension-bold';
import BulletList from '@tiptap/extension-bullet-list';
import CharacterCount from '@tiptap/extension-character-count';
import Document from '@tiptap/extension-document';
import DropCursor from '@tiptap/extension-dropcursor';
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
import { PolishUnderline } from './plugin/polish-underline';
import Selection from './plugin/selection';
import { Underline } from './plugin/underline';

const ExtensionKit = () => [
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
  TableOfContent,
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
  Underline,
  PolishUnderline,
  Selection,
  DropCursor.configure({
    width: 2,
    color: '#DADADA',
  }),
];

export default ExtensionKit;
