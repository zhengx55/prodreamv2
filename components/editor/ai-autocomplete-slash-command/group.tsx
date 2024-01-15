import { Group } from '@/lib/tiptap/type';

export const AutoCompleteMenuGROUPS: Group[] = [
  {
    name: 'ai-autocomplete',
    title: 'options',
    commands: [
      {
        name: 'next sentence',
        label: 'Write the next sentence',
        description: '',
        action: () => {
          console.log(123);
        },
      },
      {
        name: 'more content',
        label: 'Write more content',
        description: '',
        action: () => {},
      },
    ],
  },
];

export default AutoCompleteMenuGROUPS;
