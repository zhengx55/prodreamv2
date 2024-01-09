import { Group } from '@/lib/tiptap/type';
import {
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
} from 'lucide-react';

export const GROUPS: Group[] = [
  {
    name: 'format',
    title: 'Format',
    commands: [
      {
        name: 'heading1',
        label: 'Heading 1',
        iconName: <Heading1 size={16} />,
        description: 'High priority section title',
        aliases: ['h1'],
        action: (editor) => {
          editor.chain().focus().setHeading({ level: 1 }).run();
        },
      },
      {
        name: 'heading2',
        label: 'Heading 2',
        iconName: <Heading2 size={16} />,
        description: 'Medium priority section title',
        aliases: ['h2'],
        action: (editor) => {
          editor.chain().focus().setHeading({ level: 2 }).run();
        },
      },
      {
        name: 'heading3',
        label: 'Heading 3',
        iconName: <Heading3 size={16} />,
        description: 'Low priority section title',
        aliases: ['h3'],
        action: (editor) => {
          editor.chain().focus().setHeading({ level: 3 }).run();
        },
      },
      {
        name: 'bulletList',
        label: 'Bullet List',
        iconName: <List size={16} />,
        description: 'Unordered list of items',
        aliases: ['ul'],
        action: (editor) => {
          editor.chain().focus().toggleBulletList().run();
        },
      },
      {
        name: 'numberedList',
        label: 'Numbered List',
        iconName: <ListOrdered size={16} />,
        description: 'Ordered list of items',
        aliases: ['ol'],
        action: (editor) => {
          editor.chain().focus().toggleOrderedList().run();
        },
      },
      {
        name: 'blockquote',
        label: 'Blockquote',
        iconName: <Quote size={16} />,
        description: 'Element for quoting',
        action: (editor) => {
          editor.chain().focus().setBlockquote().run();
        },
      },
    ],
  },
];

export default GROUPS;
