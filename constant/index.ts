export const createSidebarLinks = (t: (id: string) => string) => {
  return [
    {
      id: 'sidebar-01',
      title: t('SideBar.AI_Editor'),
      image: '/nav/polish.svg',
      active_image: '/nav/polish_active.svg',
      link: '/editor',
    },
    // {
    //   id: 'sidebar-02',
    //   title: 'Essay Review',
    //   image: '/nav/review.svg',
    //   active_image: '/nav/review_active.svg',
    //   link: '/essay-review',
    // },
    // {
    //   id: 'sidebar-03',
    //   title: 'ProPDF',
    //   image: '/nav/pdf.svg',
    //   active_image: '/nav/pdf_active.svg',
    //   link: '/pdf-chat',
    // },
  ];
};

export const CitationOptions = ['mla', 'apa', 'ieee', 'chicago'];

export const CNPayments = [
  {
    name: '月度会员',
    currentPrice: 110,
    originalPrice: 110,
    discountDurationMonths: null,
    buttonText: '立即开通',
    discounted: false,
  },
  {
    name: '季度会员',
    currentPrice: 264,
    originalPrice: 330,
    discountDurationMonths: 8,
    buttonText: '立即开通',
    discounted: true,
  },
  {
    name: '季度会员',
    currentPrice: 660,
    originalPrice: 1320,
    discountDurationMonths: 5,
    buttonText: '立即开通',
    discounted: true,
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

export const contributorAnimation = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const GenerateOptions = [
  {
    id: 'generation-01',
    title: 'Write Introduction',
    label: 'write_introduction',
  },
  {
    id: 'generation-02',
    title: 'Write Conclusion',
    label: 'write_conclusion',
  },
  {
    id: 'generation-03',
    title: 'Generate Title',
    label: 'generate_title',
  },
  {
    id: 'generation-04',
    title: 'Generate Outline',
    submenu: [
      {
        id: 'outline-01',
        label: 'argumentative',
        title: 'Argumentative',
      },
      {
        id: 'outline-02',
        label: 'analytical',
        title: 'Analytical',
      },
      {
        id: 'outline-03',
        label: 'scientific',
        title: 'Scientific',
      },
      { id: 'outline-04', label: 'general', title: 'General' },
    ],
  },
];

export const education_info = [
  'high_school',
  'undergrad',
  'master_or_mba',
  'phd_or_above',
];

export const languange_info = ['english_native', 'international'];

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

export const PricingBasic = {
  title: 'Basic',
  month_price: '0.00',
  recommended: false,
  text: 'Access essential academic tools to foster your writing journey for free.',
  price_text: 'Free of Charge',
  features: [
    'Up to 3 Documents',
    '<strong>20</strong> Copilot prompt uses every 7 days',
    '<strong>5</strong> Outline Generations every 7 days',
    '<strong>100</strong> Grammar check sentences every 7 days',
    '<strong>Unlimited</strong> Citation sources',
    'Plagiarism Checker',
  ],
};

export const PricingUnlimited = {
  title: 'Unlimited',
  month_price: '15.99',
  text: 'Unlock comprehensive academic support with unlimited access to all features for advanced writing needs.',
  features: [
    '<strong>Unlimited</strong> Documents',
    '<strong>Unlimited</strong> Copilot prompt uses',
    '<strong>Unlimited</strong> Generations',
    '<strong>Unlimited</strong> Grammar Check',
    '<strong>Unlimited</strong> Citation sources',
    'Plagiarism Checker & <strong>Rewriter</strong>',
  ],
};

export const PricingAnnualyUnlimited = {
  title: 'Unlimited',
  month_price: '7.99',
  recommended: true,
  text: 'Unlock comprehensive academic support with unlimited access to all features for advanced writing needs.',
  price_text:
    'Save <span className="text-violet-500">50%</span> on yearly plan',
  features: [
    '<strong>Unlimited</strong> Documents',
    '<strong>Unlimited</strong> Copilot prompt uses',
    '<strong>Unlimited</strong> Generations',
    '<strong>Unlimited</strong> Grammar Check',
    '<strong>Unlimited</strong> Citation sources',
    'Plagiarism Checker & <strong>Rewriter</strong>',
  ],
};

export const PlanData = [
  {
    id: 'row-data-01',
    title: 'Document',
    text: 'Get a taste of what Prodream can do for you.',
    basic: '3 documents',
    basic_status: true,
  },
  {
    id: 'row-data-02',
    title: 'Copilot',
    text: 'Get a taste of what Prodream can do for you.',
    basic: '20 times for 7 days',
    basic_status: true,
  },
  {
    id: 'row-data-03',
    title: 'Generate',
    text: 'Get a taste of what Prodream can do for you.',
    basic: '5 times for 7 days',
    basic_status: true,
  },
  {
    id: 'row-data-04',
    title: 'Grammar',
    text: 'Get a taste of what Prodream can do for you.',
    basic: '5 times for 7 days',
    basic_status: true,
  },
  {
    id: 'row-data-05',
    title: 'Citation',
    text: 'Get a taste of what Prodream can do for you.',
    basic: 'Not copyable',
    basic_status: false,
  },
  {
    id: 'row-data-06',
    title: 'Plagiarism check',
    text: 'Get a taste of what Prodream can do for you.',
    basic: 'Not modifiable',
    basic_status: false,
  },
];

export const ReviewSteps = [
  {
    title: 'Submit Your Review Needs',
    description:
      'Quickly submit the basic info and requirements for your essay. No matter the subject or format, we’re ready.',
  },
  {
    title: 'Personalized Consultation',
    description:
      'Our team will reach out to discuss details and match you with one of our expert editors.',
  },
  {
    title: 'Receive Your Reviewed Essay',
    description:
      'Get comprehensive feedback & editing on your essay, with flexibility for any deadline.',
  },
];

export const ReviewReasons = [
  {
    icon: '/review/smile.svg',
    title: 'Personalized Approach',
    description:
      'From nuanced feedback to detailed rewrites, our services are tailored to your unique needs and academic goals.',
  },
  {
    icon: '/review/team.svg',
    title: 'Expert Team',
    description:
      'Our reviewers and writers are professionals with advanced degrees from top universities like Stanford and Harvard, offering insights from years of academic and professional experience.',
  },
  {
    icon: '/review/light.svg',
    title: 'Flexibility and Speed',
    description:
      'Our reviewers and writers are experienced professionals with advanced degrees from tops schools like Stanford and Harvard, offering insights from years of academic and professional experience.',
  },
];

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
