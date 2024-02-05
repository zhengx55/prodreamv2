'use client';
import FontSize from '@/lib/tiptap/plugin/fontsize';
import TableOfContent from '@tiptap-pro/extension-table-of-content';
import Blockquote from '@tiptap/extension-blockquote';
import Bold from '@tiptap/extension-bold';
import BulletList from '@tiptap/extension-bullet-list';
import CharacterCount from '@tiptap/extension-character-count';
import { Color } from '@tiptap/extension-color';
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
import { textblockTypeInputRule } from '@tiptap/react';
import { AutoComplete } from './plugin/autocomplete';
import DragAndDrop from './plugin/drag';
import IntextCitation from './plugin/intext-citation';
import Selection from './plugin/selection';
import { AutoCompleteSlashCommand, SlashCommand } from './plugin/slashcommand';
import AutoCompleteCNSlashCommand from './plugin/slashcommand/AutoCompleteCnSlashCommand';
import Title from './plugin/title';
import { Underline } from './plugin/underline';

const adjustLevel = (level: number) => (level == 1 ? 2 : level);

const ExtensionKit = () => [
  CharacterCount,
  HardBreak,
  Bold,
  ListItem,
  OrderedList,
  BulletList,
  Text,
  Document.extend({
    content: 'title block+',
  }),
  Title,
  Paragraph,
  FontSize,
  Blockquote,
  TextStyle,
  Color,
  History,
  DragAndDrop,
  IntextCitation,
  Focus.configure({
    className: 'has-focus',
    mode: 'all',
  }),
  Placeholder.configure({
    includeChildren: true,
    showOnlyCurrent: false,
    placeholder: () => '',
  }),
  Heading.extend({
    parseHTML() {
      return this.options.levels.map((level) => ({
        tag: `h${level}`,
        attrs: { level: adjustLevel(level) },
      }));
    },
    addInputRules() {
      return this.options.levels.map((level) => {
        return textblockTypeInputRule({
          find: new RegExp(`^(#{1,${level}})\\s$`),
          type: this.type,
          getAttributes: {
            level: adjustLevel(level),
          },
        });
      });
    },
  }).configure({ levels: [2, 3, 4] }),
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
  // PolishUnderline,
  AutoComplete,
  // TrailingNode,
  AutoCompleteSlashCommand,
  AutoCompleteCNSlashCommand,
  Selection,
  DropCursor.configure({
    width: 2,
    color: '#DADADA',
  }),
];

export default ExtensionKit;
