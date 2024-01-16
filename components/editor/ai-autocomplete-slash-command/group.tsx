import { Group } from '@/lib/tiptap/type';

export const AutoCompleteMenuGROUPS: Group[] = [
  {
    name: 'ai-autocomplete',
    title: 'options',
    commands: [
      {
        name: 'next sentence',
        label: 'Write the next sentence',
        apiEndpoint: 'paraphrase',
      },
      {
        name: 'more content',
        label: 'Write more content',
        apiEndpoint: 'paraphrase',
      },
    ],
  },
];

export default AutoCompleteMenuGROUPS;
