import { Group } from '@/lib/tiptap/type';

export const AutoCompleteMenuGROUPS: Group[] = [
  {
    name: '',
    title: '',
    commands: [
      {
        name: 'next sentence',
        label: 'Write the next sentence',
        description: 'High priority section title',
        action: () => {},
      },
      {
        name: 'more content',
        label: 'Write more content',
        description: 'High priority section title',
        action: () => {},
      },
    ],
  },
];

export default AutoCompleteMenuGROUPS;
