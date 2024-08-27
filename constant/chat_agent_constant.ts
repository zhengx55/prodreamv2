export type ActionButtonType = {
  alt: string;
  src: string;
  text: string;
};

type IconButtonType = {
  alt: string;
  src: string;
};

export const ICONS: Record<string, ActionButtonType[] | IconButtonType[]> = {
  brainstorming: [
    {
      alt: 'guide',
      src: '/chat_agent/brainstorming/guide.svg',
      text: 'Guided Input',
    },
    {
      alt: 'explore',
      src: '/chat_agent/brainstorming/explore.svg',
      text: 'In-depth',
    },
  ],
  outline: [
    {
      alt: 'generate',
      src: '/chat_agent/outline/generate.svg',
      text: 'Generate Outline',
    },
    {
      alt: 'polish',
      src: '/chat_agent/outline/polish.svg',
      text: 'Polish Outline',
    },
  ],
  draft: [
    {
      alt: 'draft',
      src: '/chat_agent/outline/generate.svg',
      text: 'Generate Draft',
    },
    {
      alt: 'proofread',
      src: '/chat_agent/outline/polish.svg',
      text: 'Proofread Draft',
    },
  ],
  common: [
    { alt: 'history', src: '/chat_agent/common/history.svg' },
    { alt: 'new', src: '/chat_agent/common/new.svg' },
  ],
};
