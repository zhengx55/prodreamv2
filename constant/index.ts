export const SidebarLinks = [
  {
    id: 'sidebar-01',
    title: 'AI Editor',
    image: '/nav/polish.svg',
    active_image: '/nav/polish_active.svg',
    link: '/editor',
  },
  {
    id: 'sidebar-02',
    title: 'Essay Review',
    image: '/nav/review.svg',
    active_image: '/nav/review_active.svg',
    link: '/essay-review',
  },
  // {
  //   id: 'sidebar-03',
  //   title: 'ProPDF',
  //   image: '/nav/pdf.svg',
  //   active_image: '/nav/pdf_active.svg',
  //   link: '/pdf-chat',
  // },
];

export const CitationOptions = ['MLA', 'APA', 'IEEE', 'Chicago'];

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

export const WelcomEducationOptions = [
  {
    name: 'Undergrad & High School',
    desc: `High school students and bachelor's degree candidates`,
    src: '/welcome/HighSchool.png',
    label: 'undergrad',
  },
  {
    name: 'Masters or MBA',
    desc: `Postgraduate and MBA students,  advanced certification professionals`,
    src: '/welcome/Master.png',
    label: 'master_or_mba',
  },
  {
    name: 'PhD & Researcher',
    desc: `Doctoral candidates, academic researchers, post-doctoral fellows`,
    src: '/welcome/Phd.png',
    label: 'phd_or_above',
  },
];

export const ProfileSidebarLinks = [
  {
    id: 'sidebar-01',
    title: 'My Profile',
    link: '/profile/setting',
    image: '/profile.svg',
    active_image: '/profile_active.svg',
  },
  // {
  //   id: 'sidebar-02',
  //   title: 'Referrals',
  //   link: '/profile/referrals',
  //   image: '/referrals.svg',
  //   active_image: '/referrals_active.svg',
  // },
];

export const EvaluationsTitle = [
  'Attractiveness of the Beginning',
  'Expressiveness',
  'Authenticity and Uniqueness',
  'Fit',
  'Writing and Structure',
  'Grammar Accuracy',
];

export const PresetInstructions: { [key: string]: string } = {
  '1': 'Fix any mistakes',
  '2': 'Sound fluent',
  '3': 'Improve it',
  '4': 'Make it passionate',
  '5': 'Make it professional',
};

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
export const CitationPrompts = [
  {
    id: 'citation-prompt-01',
    title: 'Search for academic articles here',
    text: 'Search our database for academic papers & books and create auto-citations with one click.',
  },
  {
    id: 'citation-prompt-02',
    title: 'Add in-text Citations',
    text: 'Click “Cite” to add an in-text citation of this article.It will automatically be added in the Reference list and your Library.',
  },
  {
    id: 'citation-prompt-03',
    title: 'Save articles to your library',
    text: "Find this article interesting but not sure if you want to cite it yet? Add it to your Library for easy referencing when you're ready.",
  },
  {
    id: 'citation-prompt-04',
    title: 'Find saved articles here',
    text: "Access all your saved articles in 'My Library' and view citations used in this essay with a simple click on ”In this doc”. ",
  },
];

export const sample_continue = {
  type: 'doc',
  content: [
    {
      type: 'title',
      attrs: {
        level: 1,
      },
      content: [
        {
          type: 'text',
          text: 'My First Essay',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Academic writing encompasses a variety of styles, each serving a distinct purpose in the realm of scholarship and research. These styles include argumentative essays, which present a well-reasoned case on a debatable issue, and analytical papers, which dissect and interpret complex topics or texts.',
        },
      ],
    },
  ],
};

export const sample_outline = {
  type: 'doc',
  content: [
    {
      type: 'title',
      attrs: {
        level: 1,
      },
      content: [
        {
          type: 'text',
          text: 'My First Essay',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        textAlign: 'left',
        level: 2,
      },
      content: [
        {
          type: 'text',
          text: 'Introduction',
        },
      ],
    },
    {
      type: 'bulletList',
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              attrs: {
                class: null,
                textAlign: 'left',
              },
              content: [
                {
                  type: 'text',
                  text: 'Start with a brief overview of East Asian culture and its diversity. Discuss the importance of religion in shaping the culture and society of East Asia.',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              attrs: {
                class: null,
                textAlign: 'left',
              },
              content: [
                {
                  type: 'text',
                  text: 'Explain why this topic is important. Discuss how the interplay of culture and religion have guided social norms, ethics, and overall way of life in East Asia.',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              attrs: {
                class: null,
                textAlign: 'left',
              },
              content: [
                {
                  type: 'text',
                  text: 'Present the thesis statement. For instance, the thesis could be "Religion has played a pivotal role in shaping East Asian culture, influencing everything from art and architecture to societal norms and laws."',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        textAlign: 'left',
        level: 2,
      },
      content: [
        {
          type: 'text',
          text: 'Body',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        textAlign: 'left',
        level: 4,
      },
      content: [
        {
          type: 'text',
          text: 'The Influence of Buddhism',
        },
      ],
    },
    {
      type: 'bulletList',
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              attrs: {
                class: null,
                textAlign: 'left',
              },
              content: [
                {
                  type: 'text',
                  text: 'Start by introducing Buddhism and its origins. Explain how it spread to East Asia and its significance.',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              attrs: {
                class: null,
                textAlign: 'left',
              },
              content: [
                {
                  type: 'text',
                  text: "Present evidence of Buddhism's influence on East Asian culture. This may include its impact on art, literature, philosophy, and societal norms.",
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              attrs: {
                class: null,
                textAlign: 'left',
              },
              content: [
                {
                  type: 'text',
                  text: "Explain how this evidence supports your thesis statement. For example, discuss how Buddhism's teachings on compassion, non-violence, and meditation have sculpted the peaceful and contemplative aspects of East Asian cultures.",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        textAlign: 'left',
        level: 4,
      },
      content: [
        {
          type: 'text',
          text: 'The Impact of Confucianism',
        },
      ],
    },
    {
      type: 'bulletList',
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              attrs: {
                class: null,
                textAlign: 'left',
              },
              content: [
                {
                  type: 'text',
                  text: 'Introduce Confucianism, its origins, and its central teachings.',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              attrs: {
                class: null,
                textAlign: 'left',
              },
              content: [
                {
                  type: 'text',
                  text: 'Discuss the influence of Confucianism on East Asian societies, particularly on education, social hierarchy, and governmental structure.',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              attrs: {
                class: null,
                textAlign: 'left',
              },
              content: [
                {
                  type: 'text',
                  text: 'Connect this evidence back to your thesis. For instance, examine how Confucian principles of respect for authority, filial piety, and humaneness form the bedrock of societal interactions in many East Asian cultures.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        textAlign: 'left',
        level: 4,
      },
      content: [
        {
          type: 'text',
          text: 'The Role of Shinto and Taoism',
        },
      ],
    },
    {
      type: 'bulletList',
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              attrs: {
                class: null,
                textAlign: 'left',
              },
              content: [
                {
                  type: 'text',
                  text: 'Introduce Shinto and Taoism, their origins, and main beliefs.',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              attrs: {
                class: null,
                textAlign: 'left',
              },
              content: [
                {
                  type: 'text',
                  text: 'Discuss how these religions have shaped cultural practices, traditions, and beliefs in East Asia, particularly in Japan and China respectively.',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              attrs: {
                class: null,
                textAlign: 'left',
              },
              content: [
                {
                  type: 'text',
                  text: "Tie this evidence back to your thesis. For instance, explain how Shinto's emphasis on nature and spirits is reflected in Japanese art and architecture, or how Taoism's focus on harmony and balance has influenced Chinese philosophy and aesthetics.",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        textAlign: 'left',
        level: 2,
      },
      content: [
        {
          type: 'text',
          text: 'Conclusion',
        },
      ],
    },
    {
      type: 'bulletList',
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              attrs: {
                class: null,
                textAlign: 'left',
              },
              content: [
                {
                  type: 'text',
                  text: 'Summarize the main points made in the body of the essay, reiterating the influence of Buddhism, Confucianism, and Shinto/Taoism on East Asian culture.',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              attrs: {
                class: null,
                textAlign: 'left',
              },
              content: [
                {
                  type: 'text',
                  text: 'Restate the thesis in light of the evidence and arguments presented.',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              attrs: {
                class: null,
                textAlign: 'left',
              },
              content: [
                {
                  type: 'text',
                  text: 'Discuss the importance of understanding the role of religion in East Asian culture, especially for those seeking to engage with these societies.',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              attrs: {
                class: null,
                textAlign: 'left',
              },
              content: [
                {
                  type: 'text',
                  text: 'Suggest areas for further research, such as a deeper analysis of the influence of these religions on specific aspects of East Asian culture, or the study of other religions and their impact on East Asia.',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const sample_title = {
  type: 'doc',
  content: [
    {
      type: 'title',
      attrs: {
        level: 1,
      },
      content: [
        {
          type: 'text',
          text: 'My First Essay',
        },
      ],
    },
  ],
};

export const startup_task = [
  { id: 'task-01', label: 'Create first document' },
  { id: 'task-02', label: 'Highlight any text' },
  { id: 'task-03', label: 'Click "Start Grammar Check"' },
];

export const task_gif = [
  { id: 'gif-01', src: '/task/task1.gif' },
  { id: 'gif-02', src: '/task/task2.gif' },
  { id: 'gif-03', src: '/task/task3.gif' },
];

export const sample_search_citation = [
  {
    article_title:
      'Fashion-MNIST: a Novel Image Dataset for Benchmarking Machine Learning Algorithms',
    journal_title: 'ArXiv',
    abstract:
      'We present Fashion-MNIST, a new dataset comprising of 28x28 grayscale images of 70,000 fashion products from 10 categories, with 7,000 images per category. The training set has 60,000 images and the test set has 10,000 images. Fashion-MNIST is intended to serve as a direct drop-in replacement for the original MNIST dataset for benchmarking machine learning algorithms, as it shares the same image size, data format and the structure of training and testing splits. The dataset is freely available at this https URL',
    authors: [
      {
        first_name: 'Han',
        middle_name: null,
        last_name: 'Xiao',
        suffix: null,
        role: 'author',
      },
      {
        first_name: 'Kashif',
        middle_name: null,
        last_name: 'Rasul',
        suffix: null,
        role: 'author',
      },
      {
        first_name: 'Roland',
        middle_name: null,
        last_name: 'Vollgraf',
        suffix: null,
        role: 'author',
      },
    ],
    publish_date: {
      year: 2017,
      month: null,
      day: null,
    },
    page_info: {
      start: null,
      end: null,
    },
    doi: null,
    advanced_info: {
      volume: 'abs/1708.07747',
      issue: null,
      series: null,
    },
    area: ['Computer Science', 'Mathematics'],
    reference_count: 6,
    citation_count: 6613,
    influential_citation_count: 1704,
    pdf_url: null,
    tldr: 'Fashion-MNIST is intended to serve as a direct drop-in replacement for the original MNIST dataset for benchmarking machine learning algorithms, as it shares the same image size, data format and the structure of training and testing splits.',
    publisher:
      'https://www.semanticscholar.org/paper/f9c602cc436a9ea2f9e7db48c77d924e09ce3c32',
  },
];

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
