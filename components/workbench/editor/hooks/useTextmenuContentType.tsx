import { Editor } from '@tiptap/react';
import { Heading1, Heading2, Heading3, Type } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { ContentPickerOptions } from '../ContentPicker';

export const useTextmenuContentTypes = (editor: Editor) => {
  const t = useTranslations('Editor');

  const options = useMemo<ContentPickerOptions>(() => {
    return [
      {
        type: 'category',
        label: 'Hierarchy',
        id: 'hierarchy',
      },
      {
        icon: <Type size={16} />,
        onClick: () =>
          editor.chain().focus().liftListItem('listItem').setParagraph().run(),
        id: 'paragraph',
        disabled: () => !editor.can().setParagraph(),
        isActive: () =>
          editor.isActive('paragraph') &&
          !editor.isActive('orderedList') &&
          !editor.isActive('bulletList') &&
          !editor.isActive('taskList'),
        label: t('BubbleMenu.Paragraph'),
        type: 'option',
      },
      {
        icon: <Heading1 size={16} />,
        onClick: () =>
          editor
            .chain()
            .focus()
            .liftListItem('listItem')
            .setHeading({ level: 2 })
            .run(),
        id: 'heading1',
        disabled: () => !editor.can().setHeading({ level: 2 }),
        isActive: () => editor.isActive('heading', { level: 2 }),
        label: t('BubbleMenu.Heading_1'),
        type: 'option',
      },
      {
        icon: <Heading2 size={16} />,
        onClick: () =>
          editor
            .chain()
            .focus()
            .liftListItem('listItem')
            .setHeading({ level: 3 })
            .run(),
        id: 'heading2',
        disabled: () => !editor.can().setHeading({ level: 3 }),
        isActive: () => editor.isActive('heading', { level: 3 }),
        label: t('BubbleMenu.Heading_2'),
        type: 'option',
      },
      {
        icon: <Heading3 size={16} />,
        onClick: () =>
          editor
            .chain()
            .focus()
            .liftListItem('listItem')
            .setHeading({ level: 4 })
            .run(),
        id: 'heading3',
        disabled: () => !editor.can().setHeading({ level: 4 }),
        isActive: () => editor.isActive('heading', { level: 4 }),
        label: t('BubbleMenu.Heading_3'),
        type: 'option',
      },
      {
        type: 'category',
        label: 'Lists',
        id: 'lists',
      },
      // {
      //   icon: <List size={16} />,
      //   onClick: () => editor.chain().focus().toggleBulletList().run(),
      //   id: 'bulletList',
      //   disabled: () => !editor.can().toggleBulletList(),
      //   isActive: () => editor.isActive('bulletList'),
      //   label: t('BubbleMenu.Bullet_list'),
      //   type: 'option',
      // },
      // {
      //   icon: <ListOrdered size={16} />,
      //   onClick: () => editor.chain().focus().toggleOrderedList().run(),
      //   id: 'orderedList',
      //   disabled: () => !editor.can().toggleOrderedList(),
      //   isActive: () => editor.isActive('orderedList'),
      //   label: t('BubbleMenu.Numbered_list'),
      //   type: 'option',
      // },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, editor.state]);

  return options;
};
