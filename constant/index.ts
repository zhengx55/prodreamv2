export const Navigation = [
  {
    id: 'nav-01',
    title: 'Chat',
    image: '/workbench/nav_chat.svg',
    link: 'chat',
  },
  {
    id: 'nav-02',
    title: 'Brainstorming',
    image: '/workbench/nav_brainstorming.svg',
    link: 'brainstorming',
  },
  {
    id: 'nav-03',
    title: 'Outline',
    image: '/workbench/nav_outline.svg',
    link: 'outline',
  },
  {
    id: 'nav-04',
    title: 'Draft&Feedback',
    image: '/workbench/nav_draft.svg',
    link: 'draft',
  },
];

export const plag_report_type = [
  'Overall similarity score',
  'Results found',
  'Total words in text',
];

export const H1_regex = /^([^#]*#){1}[^#]*$/;
export const H2_regex = /^[^#]*##([^#]|$)/;
export const word_regex = /\b\w+\b/g;
