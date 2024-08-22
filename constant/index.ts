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

export const CNFeatures = [
  {
    feature: 'Generate',
    description: '智能生成文本的实例',
    icon: '/editor/rightbar/generate_active.svg',
  },
  {
    feature: 'Copilot',
    description: '体验Prodecan能为您做些什么',
    icon: '/editor/rightbar/copilot.svg',
  },
  {
    feature: 'Grammar suggestions',
    description: '智能提供修正建议',
    icon: '/editor/rightbar/grammar_active.svg',
  },
  {
    feature: 'Citation',
    description: '200M+ 数据学术资源',
    icon: '/editor/rightbar/citation_active.svg',
    subFeatures: [
      {
        name: 'In-text Citations',
        description: '文本内部引用',
      },
      {
        name: 'Citation Style Changer',
        description: '一键式引文风格转换',
      },
      {
        name: 'Edit Citations',
        description: '编辑引用格式',
      },
    ],
  },
  {
    feature: 'Plagiarism check',
    description: 'Get a taste of what Prodecan can do for you',
    icon: '/editor/rightbar/plagiarism_active.svg',
  },
  {
    feature: 'Document',
    description: 'Get a taste of what Prodecan can do for you',
    icon: '/editor/rightbar/document.svg',
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

// ----------------------------------------------------------------
// LANDING PAGE
// ----------------------------------------------------------------
export const Universitys = [
  {
    id: 'university-01',
    title: 'berkeley',
    image: '/landing/university/berkeley.png',
  },
  {
    id: 'university-02',
    title: 'Cambridge',
    image: '/landing/university/Cambridge.png',
  },
  {
    id: 'university-03',
    title: 'Harvard',
    image: '/landing/university/Harvard.png',
  },
  {
    id: 'university-04',
    title: 'Stanford',
    image: '/landing/university/Stanford.png',
  },
  {
    id: 'university-05',
    title: 'Princeton',
    image: '/landing/university/Princeton.png',
  },
  {
    id: 'university-06',
    title: 'Penn',
    image: '/landing/university/Penn.png',
  },
  {
    id: 'university-07',
    title: 'Nus',
    image: '/landing/university/Nus.png',
  },
];

//----------------------------------------------------------------
// Prompt Info
//----------------------------------------------------------------

export const EditorRightBar = [
  {
    id: 'rightbar-01',
    title: 'Grammar_Check',
    icon: '/editor/rightbar/grammar.svg',
    active_icon: '/editor/rightbar/grammar_active.svg',
  },
  {
    id: 'rightbar-04',
    title: 'Plagiarism_Check',
    icon: '/editor/rightbar/plagiarism.svg',
    active_icon: '/editor/rightbar/plagiarism_active.svg',
  },
  {
    id: 'rightbar-06',
    title: 'AI_Detection',
    icon: '/editor/rightbar/detection.svg',
    active_icon: '/editor/rightbar/detection_active.svg',
  },
  {
    id: 'rightbar-02',
    title: 'Citation',
    icon: '/editor/rightbar/citation.svg',
    active_icon: '/editor/rightbar/citation_active.svg',
  },
  {
    id: 'rightbar-05',
    title: 'My_Citation_Library',
    icon: '/editor/rightbar/library.svg',
    active_icon: '/editor/rightbar/library_active.svg',
  },
  {
    id: 'rightbar-03',
    title: 'Generate',
    icon: '/editor/rightbar/generate.svg',
    active_icon: '/editor/rightbar/generate_active.svg',
  },
];

export const ChatbotEngine = [
  {
    title: 'Research Assistant',
    id: 'engine-01',
    icon: '/editor/chatbot/Research.svg',
  },
  {
    title: 'Writing Tutor',
    id: 'engine-02',
    icon: '/editor/chatbot/Tutor.svg',
  },
];

export const createFeedbackOptions = (t: (id: string) => string) => {
  return [
    t('FeedbackOptions.Report_a_bug'),
    t('FeedbackOptions.Submit_a_feature_suggestion'),
    t('FeedbackOptions.Access_customer_assistance'),
  ];
};
