export const Navigation = [
  {
    id: 'nav-01',
    title: 'Chat',
    image: '/workbench/nav_chat.svg',
    link: 'chat',
  },
  {
    id: 'nav-02',
    title: 'Brainstorm',
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
export const HeroInfo = [
  {
    id: 'hero-01',
    icon: '/landing/heros/outline.svg',
    title: 'Outlining',
    text: 'Create a detailed outline tailored to your requirements with guidance.',
  },
  {
    id: 'hero-02',
    icon: '/landing/heros/editing.svg',
    title: 'Drafting',
    text: 'Increase writing speed and enhance clarity, cohesion, grammar, and style',
  },
  {
    id: 'hero-03',
    icon: '/landing/heros/citation.svg',
    title: 'Citation',
    text: 'Unparalleled academic knowledge base boosts research efficiency.',
  },
  {
    id: 'hero-04',
    icon: '/landing/heros/proofread.svg',
    title: 'Final Touches',
    text: 'Perfect your writing: detect plagiarism and refine content.',
  },
];

export const AboutInfo = [
  {
    id: 'about-01',
    title: "Spent hours on outlining and still don't know how to begin?",
    image: '/landing/about/about1.png',
    description:
      "Our feature creates detailed outlines with relevant sources, tailored to your professor's requirements",
  },
  {
    id: 'about-02',
    title: 'Stuck in the middle of writing, with no idea what to write next?',
    image: '/landing/about/about2.png',
    description:
      "Our Co-Pilot's 'Continue Writing' feature will craft the next most suitable sentences for you, igniting your ideas and creativity.",
  },
  {
    id: 'about-03',
    title: 'Bothered for hours with citations and formatting?',
    image: '/landing/about/about3.png',
    description:
      "Our 'Auto Cite' feature automatically researches relevant sources and adds both in-text citations and reference citations in the correct format for any citation style.",
  },
];

export const IntroductionInfo = [
  {
    id: 'intro-01',
    title: "Exclusive 'Knowledge Base': Empowering You to Earn Top Grades",
    description:
      "We don't just do the work for you. Our exclusive knowledge base, enriched by academic experts, enables ProDream to offer step-by-step guidance, ensuring the highest academic quality for every feature.",
    image: '/landing/introduction/showcase1.png',
  },
  {
    id: 'intro-02',
    title:
      '200 million up-to-date scholarly sources: Ensuring the novelty of your research',
    description:
      'Our database of over 200 million scholarly publications can provide you with the best references to confidently back up your paper.',
    image: '/landing/introduction/showcase2.png',
  },
  {
    id: 'intro-03',
    title:
      'Plagiarism Check: To safeguard you from the risk of academic dishonesty',
    description:
      'Plagiarism Check feature, with paraphrasing tools, ensures that you can submit your paper free from plagiarism concerns',
    image: '/landing/introduction/showcase3.png',
  },
  {
    id: 'intro-04',
    title:
      "Multilingual Support: Removing non-native speakers' writing barriers",
    description:
      'Feel more at ease writing in your native language? With "mutilingual support , you can write in your mother tongue, and it will automatically adapt your text to the nuances of English, ensuring style and requirement compliance',
    image: '/landing/introduction/showcase4.png',
  },
];

export const HeroMainInfo = [
  { id: 'hero-main-01', image: '/landing/heros/Hero.png' },
  { id: 'hero-main-02', image: '/landing/heros/Hero2.png' },
  { id: 'hero-main-03', image: '/landing/heros/Hero3.png' },
  { id: 'hero-main-04', image: '/landing/heros/Hero4.png' },
];

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

export const CommentsInfo = [
  {
    id: 'comment-01',
    text: "Simply the best! This tool is a game-changer for refining academic drafts. What's even more impressive is its support for multiple languages, including Mandarin. It makes my writing process so easy!",
    image: '/landing/comments/Oval.png',
    name: 'Yuqing Wang',
    role: 'China',
  },
  {
    id: 'comment-02',
    text: "I've tried a few AI tools, and ProDream is hands down the best. It helps with tenses, paraphrasing, and organizes my paragraphs for better language. Using ProDream makes me feel confident about my paper.",
    image: '/landing/comments/Oval2.png',
    name: 'Aarav S. Gupta',
    role: 'PhD Student',
  },
  {
    id: 'comment-03',
    text: 'ProDream is my go-to writing tool now. It helps me polish my sentences to fit academic style, sorts out the confusing parts, and has certainly contributed to boosting my grades. Writing papers just got a whole lot easier with ProDream!',
    image: '/landing/comments/Oval3.png',
    name: 'Elijah Thompson',
    role: 'College Senior',
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
