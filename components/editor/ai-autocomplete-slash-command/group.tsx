import { Group } from '@/lib/tiptap/type';

export const AutoCompleteMenuGROUPS: Group[] = [
  {
    name: 'ai-autocomplete',
    title: 'options',
    commands: [
      {
        name: 'next sentence',
        label: 'Write the next sentence',
        apiEndpoint: 'continue_write_sentence',
      },
      {
        name: 'more content',
        label: 'Write more content',
        apiEndpoint: 'continue_write_paragraph',
      },
    ],
  },
];

export default AutoCompleteMenuGROUPS;
