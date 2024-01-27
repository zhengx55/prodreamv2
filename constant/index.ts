import { IUsage } from '@/types';
import { Variants } from 'framer-motion';
export const initialUsage: IUsage = {
  first_editior: true,
  first_brainstorm: true,
  first_resume: true,
  first_activity_list: true,
  first_activity_list_upload: true,
  first_activity_list_generate: true,
  first_activity_list_edit: true,
};
export const SidebarLinks = [
  {
    id: 'sidebar-01',
    title: 'AI Editor',
    image: '/polish.svg',
    active_image: '/polish_active.svg',
    link: '/writtingpal/polish',
  },
  // {
  //   id: 'sidebar-02',
  //   title: 'Brainstorm',
  //   image: '/templates.svg',
  //   active_image: '/templates_active.svg',
  //   link: '/writtingpal/brainstorm',
  // },
  // {
  //   id: 'sidebar-03',
  //   title: 'Resume',
  //   image: '/resume.svg',
  //   active_image: '/resume_active.svg',
  //   link: '/writtingpal/resume',
  // },
  // {
  //   id: 'sidebar-04',
  //   title: 'Activity List',
  //   image: '/activity.svg',
  //   active_image: '/activity_active.svg',
  //   link: '/writtingpal/activityList',
  // },
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
  { id: 'generation-02', title: 'Write Conclusion', label: 'write_conclusion' },
  { id: 'generation-03', title: 'Generate title', label: 'generate_title' },
  {
    id: 'generation-04',
    title: 'Generate Outline',
    submenu: [
      { id: 'outline-01', label: 'argumentative' },
      { id: 'outline-02', label: 'analytical' },
      { id: 'outline-03', label: 'scientific' },
    ],
  },
];

export const WelcomLanguageOptions = [
  {
    name: 'English native speaker',
    src: '/welcome/English.png',
    label: 'english_native',
  },
  {
    name: 'International Student',
    src: '/welcome/International.png',
    label: 'international',
  },
];

export const WelcomEducationOptions = [
  {
    name: 'Undergrad & High Schoold',
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
  {
    id: 'sidebar-02',
    title: 'Referrals',
    link: '/profile/referrals',
    image: '/referrals.svg',
    active_image: '/referrals_active.svg',
  },
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

export const PresetIcons: { [key: string]: string } = {
  '1': '/ai_editors/Fix.svg',
  '2': '/ai_editors/Fluent.svg',
  '3': '/ai_editors/Improve.svg',
  '4': '/ai_editors/Passionate.svg',
  '5': '/ai_editors/Professional.svg',
};

export const ProfileDropdownLinks = [
  {
    id: 'profile-01',
    title: 'Refer Friends',
    image: '/referrals_dark.svg',
  },
  {
    id: 'profile-02',
    title: 'View blogs',
    image: '/document.svg',
  },
  {
    id: 'profile-03',
    title: 'Log out',
    image: '/logout.svg',
  },
];

export const ResumeProcedure = [
  { title: 'Input your experiences and description' },
  { title: 'Convert your experience into resume-ready bullet points' },
  { title: 'Apply final edits for polished results' },
  { title: 'Download your resume as a PDF' },
];

export const FormHeightVariant: Variants = {
  expanded: { height: 'auto' },
  collapse: { height: '80px' },
};

export const activity_list_loading_prompt = [
  'Celebrate every step you complete, from finishing an essay draft to submitting a form – each one is a victory on the path to your future.',
  "Set personal goals and reward yourself when you meet them, whether it's finishing an application section or acing a standardized test.",
  "Remember, every application is a story about you, and you're the best author of your own narrative – tell it with passion and confidence.",
  'You got this! Each step you take is building towards a bright and exciting future.',
  'Take breaks to recharge; your best work comes when you are well-rested and relaxed.',
  "Keep things in perspective – you're more than this process, and there are many paths to a fulfilling future.",
  "Do you know each school has thier own admission preference? Don't forget to include them in your application or ask Max for suggestions! ",
  "Use action verbs to make your activity list standout! Not sure about how to grab admission officers' attention? Try our activity list!",
];

export const release_data = [
  {
    id: 'release_data_01',
    img: '/Release-1.png',
    title: '✨ Introducing: Activity List Optimizer!',
    description:
      'Struggling with character limits on your college apps? Our new feature helps you distill your achievements using impactful words that showcase your skills. Make every character count and elevate your application with ease. Try it now!',
  },
  {
    id: 'release_data_02',
    img: '/Release-2.png',
    title: 'Your dream is now professionally supported 🎓',
    description:
      "Exciting news, we met a fortune teller who said changing our name could help our users get into their dream schools. So, we switched from 'QuickApply' to 'ProDream'! Just kidding – we chose 'ProDream' because it better fits our mission of building a Co-Pilot to achieve your dreams.Same dedication, fresh vibe – welcome to the ProDream family! Let's make our college dreams a reality together!",
  },
];

// ----------------------------------------------------------------
// LANDING PAGE
// ----------------------------------------------------------------
export const TeamMembers = [
  {
    id: 'teams-01',
    name: 'Max Tang',
    role: 'CEO',
    image: '/landing/team/Max.png',
    background: '#CFBDFF',
    education: 'Harvard School of Education',
    description:
      "As the founder of ProDream Education since 2019, I've guided over a hundred community college students to top universities. I earned my Bachelor's in History from UCLA and a Master's in Education from Harvard, focusing on assisting underrepresented students in college admissions.",
  },
  {
    id: 'teams-02',
    name: 'Yun Fan',
    role: 'CMO',
    image: '/landing/team/Yun.png',
    background: '#FFB686',
    education: 'Harvard School of Education, MBA',
    description:
      "As a co-founder of Applify AI and the entrepreneur behind Super Link Inc., I bring extensive college consulting experience. I've supported over 10,000 students, holding a Bachelor's degree from DePaul University and a Master's in Education from Harvard.",
  },
  {
    id: 'teams-03',
    name: 'Kevinn',
    role: 'CTO',
    image: '/landing/team/Kevin.png',
    background: '#92E3F5',
    education: 'Harvard PhD, Computer Science ',
    description:
      "As a full-stack engineer and Ph.D. candidate in Computational Physics at Harvard, my expertise spans large language models, finetuning, and human-computer interaction. I've been recognized with awards like the Harvard Purcell Fellowship and the Guo Moruo Scholarship, serving as a reviewer for IEEE CHI, IEEE PacificVis, and ICML.",
  },
  {
    id: 'teams-04',
    name: 'Jessie',
    role: 'CPO',
    image: '/landing/team/Jessie.png',
    background: '#D7FFBF',
    education: 'Stanford Class of 2022, MS&E and Economics',
    description:
      'As an recent alum, I know how stressful college application process can be! My goal is to create a product where students get accessible and affordable support that they truly need.',
  },
];

export const ShowCases = [
  {
    id: 'show-cases-01',
    title: 'Essay evaluation',
    description:
      'This means that you can download and use any of the templates in the UI Market Web library, as many times as you want. This can be a great way to save time and money on design costs.',
    image: '/landing/showcase/Evaluate.png',
  },
  {
    id: 'show-cases-02',
    title: 'Essay polishing',
    description:
      'The All-Access Pass also includes access to premium features, such as the ability to export your designs in high resolution, the ability to add custom fonts and colors, and the ability to collaborate with other designers.',
    image: '/landing/showcase/Polish.png',
  },
  {
    id: 'show-cases-03',
    title: 'Time saving',
    description:
      'All-Access Pass holders also get priority support from the UI Market Web team. This means that you can get help with any problems you have with your designs quickly and easily.',
    image: '/landing/showcase/Team.png',
  },
];

export const Universitys = [
  {
    id: 'university-01',
    alt: 'university',
    image: '/landing/university/uclalogo.png',
  },
  {
    id: 'university-02',
    alt: 'university',
    image: '/landing/university/nyu.png',
  },
  {
    id: 'university-03',
    alt: 'university',
    image: '/landing/university/berkeley.png',
  },
  {
    id: 'university-04',
    alt: 'university',
    image: '/landing/university/ucla.png',
  },
];

export const Storys = [
  {
    image: '/landing/stories/story1.png',
    alt: 'story',
    id: 'story-slider-item-01',
  },
  {
    image: '/landing/stories/story2.png',
    alt: 'story',
    id: 'story-slider-item-02',
  },
  {
    image: '/landing/stories/story3.png',
    alt: 'story',
    id: 'story-slider-item-03',
  },
  {
    image: '/landing/stories/story4.png',
    alt: 'story',
    id: 'story-slider-item-04',
  },
];

export const CiationDemoDoc = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: {
        id: '20df1b0a-9163-452a-903b-82402df5d1d8',
        'data-toc-id': '20df1b0a-9163-452a-903b-82402df5d1d8',
        textAlign: 'left',
        level: 1,
      },
      content: [
        {
          type: 'text',
          marks: [
            {
              type: 'bold',
            },
          ],
          text: 'This is a sample essay to help you get started',
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: {
        class: null,
        textAlign: 'left',
      },
      content: [
        {
          type: 'text',
          text: 'Hey, academic writer! Ready to transform your writing journey? Follow this tutorial to get started!',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        id: '96ed3619-7f40-4609-99b0-1fc0add18c1f',
        'data-toc-id': '96ed3619-7f40-4609-99b0-1fc0add18c1f',
        textAlign: 'left',
        level: 1,
      },
      content: [
        {
          type: 'text',
          marks: [
            {
              type: 'bold',
            },
          ],
          text: 'AI Copilot ',
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: {
        class: null,
        textAlign: 'left',
      },
      content: [
        {
          type: 'text',
          marks: [
            {
              type: 'bold',
            },
            {
              type: 'highlight',
              attrs: {
                color: 'rgb(100, 37, 208, 0.3)',
              },
            },
            {
              type: 'textStyle',
              attrs: {
                fontSize: '',
                color: 'rgb(100, 37, 208)',
                polish_underline: {
                  color: '',
                  offset: '',
                },
              },
            },
          ],
          text: 'Highlight ',
        },
        {
          type: 'text',
          text: 'any text to call out ',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'bold',
            },
            {
              type: 'highlight',
              attrs: {
                color: 'rgb(100, 37, 208, 0.3)',
              },
            },
            {
              type: 'textStyle',
              attrs: {
                fontSize: '',
                color: 'rgb(100, 37, 208)',
                polish_underline: {
                  color: '',
                  offset: '',
                },
              },
            },
          ],
          text: 'AI Copilot',
        },
        {
          type: 'text',
          text: ', which gives you access to our collection of writing tools that will help you craft your academic writings.',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        id: 'b468e53a-b4b5-4a37-ac4b-102c64bd2cce',
        'data-toc-id': 'b468e53a-b4b5-4a37-ac4b-102c64bd2cce',
        textAlign: 'left',
        level: 3,
      },
      content: [
        {
          type: 'text',
          marks: [
            {
              type: 'bold',
            },
          ],
          text: 'Edit Tools & Generate from Selection',
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: {
        class: null,
        textAlign: 'left',
      },
      content: [
        {
          type: 'text',
          marks: [
            {
              type: 'bold',
            },
          ],
          text: 'Try it yourself! ',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'bold',
            },
            {
              type: 'highlight',
              attrs: {
                color: 'rgb(100, 37, 208, 0.3)',
              },
            },
            {
              type: 'textStyle',
              attrs: {
                fontSize: '',
                color: 'rgb(100, 37, 208)',
                polish_underline: {
                  color: '',
                  offset: '',
                },
              },
            },
          ],
          text: 'Highlight ',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'bold',
            },
          ],
          text: 'the text below, click ',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'bold',
            },
            {
              type: 'highlight',
              attrs: {
                color: 'rgb(100, 37, 208, 0.3)',
              },
            },
            {
              type: 'textStyle',
              attrs: {
                fontSize: '',
                color: 'rgb(100, 37, 208)',
                polish_underline: {
                  color: '',
                  offset: '',
                },
              },
            },
          ],
          text: 'AI Copilot',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'bold',
            },
          ],
          text: ' and try any edit tools 😊',
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: {
        class: null,
        textAlign: 'left',
      },
      content: [
        {
          type: 'text',
          text: 'The increasingly warmer climate engendered conditions in which humidity levels increased and frozen lands began thawing out, thus allowing for the possibility of the cultivation of plants.',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        id: '1cc6ef4a-58d7-4c5b-bdbe-ba65334fd12e',
        'data-toc-id': '1cc6ef4a-58d7-4c5b-bdbe-ba65334fd12e',
        textAlign: 'left',
        level: 1,
      },
      content: [
        {
          type: 'text',
          marks: [
            {
              type: 'bold',
            },
          ],
          text: 'Citations',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        id: '6f87ccee-42fd-400c-a5ce-60bfb841375c',
        'data-toc-id': '6f87ccee-42fd-400c-a5ce-60bfb841375c',
        textAlign: 'left',
        level: 2,
      },
      content: [
        {
          type: 'text',
          marks: [
            {
              type: 'bold',
            },
          ],
          text: 'Create Citations',
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: {
        class: null,
        textAlign: 'left',
      },
      content: [
        {
          type: 'text',
          text: 'Our citation feature supports citation creation and management of different research habits!',
        },
      ],
    },
    {
      type: 'orderedList',
      attrs: {
        start: 1,
      },
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
                  marks: [
                    {
                      type: 'bold',
                    },
                    {
                      type: 'highlight',
                      attrs: {
                        color: 'rgb(100, 37, 208, 0.3)',
                      },
                    },
                    {
                      type: 'textStyle',
                      attrs: {
                        fontSize: '',
                        color: 'rgb(100, 37, 208)',
                        polish_underline: {
                          color: '',
                          offset: '',
                        },
                      },
                    },
                  ],
                  text: 'Highlight',
                },
                {
                  type: 'text',
                  text: ' content and click ',
                },
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'bold',
                    },
                    {
                      type: 'highlight',
                      attrs: {
                        color: 'rgb(100, 37, 208, 0.3)',
                      },
                    },
                    {
                      type: 'textStyle',
                      attrs: {
                        fontSize: '',
                        color: 'rgb(100, 37, 208)',
                        polish_underline: {
                          color: '',
                          offset: '',
                        },
                      },
                    },
                  ],
                  text: 'Citation',
                },
                {
                  type: 'text',
                  text: ' to find citations supporting your argument',
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
                  text: "ProDream's smart algorithm will find the best matching academic articles related to your argument",
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
                  text: 'Use the ',
                },
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'bold',
                    },
                    {
                      type: 'highlight',
                      attrs: {
                        color: 'rgb(100, 37, 208, 0.3)',
                      },
                    },
                    {
                      type: 'textStyle',
                      attrs: {
                        fontSize: '',
                        color: 'rgb(100, 37, 208)',
                        polish_underline: {
                          color: '',
                          offset: '',
                        },
                      },
                    },
                  ],
                  text: 'Search Citation Base',
                },
                {
                  type: 'text',
                  text: ' on the right to look up articles and book titles, just like in a library. Our database is up to date and has over 200M+ articles included.',
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
                  text: 'If you already have citations, click ',
                },
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'bold',
                    },
                    {
                      type: 'highlight',
                      attrs: {
                        color: 'rgb(100, 37, 208, 0.3)',
                      },
                    },
                    {
                      type: 'textStyle',
                      attrs: {
                        fontSize: '',
                        color: 'rgb(100, 37, 208)',
                        polish_underline: {
                          color: '',
                          offset: '',
                        },
                      },
                    },
                  ],
                  text: '+',
                },
                {
                  type: 'text',
                  text: 'to add customized citations (we currently support websites, articles and books)',
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
        id: '433348b2-91f4-4d6f-bf4c-aebc7c61c7db',
        'data-toc-id': '433348b2-91f4-4d6f-bf4c-aebc7c61c7db',
        textAlign: 'left',
        level: 2,
      },
      content: [
        {
          type: 'text',
          marks: [
            {
              type: 'bold',
            },
          ],
          text: 'In-text Citations',
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: {
        class: null,
        textAlign: 'left',
      },
      content: [
        {
          type: 'text',
          text: 'After identifying an article, you could directly cite the article to your essay by clicking ',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'bold',
            },
            {
              type: 'highlight',
              attrs: {
                color: 'rgb(100, 37, 208, 0.3)',
              },
            },
            {
              type: 'textStyle',
              attrs: {
                fontSize: '',
                color: 'rgb(100, 37, 208)',
                polish_underline: {
                  color: '',
                  offset: '',
                },
              },
            },
          ],
          text: 'Cite',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'bold',
            },
          ],
          text: '.',
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: {
        class: null,
        textAlign: 'left',
      },
      content: [
        {
          type: 'text',
          text: 'ProDream will create an in-text citation of that article to where your mouse is located in the article and automatically add that article to the reference list at the end.',
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: {
        class: null,
        textAlign: 'left',
      },
      content: [
        {
          type: 'text',
          text: 'If you find the article interesting but are not sure if you want to cite the article, click ',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'bold',
            },
            {
              type: 'highlight',
              attrs: {
                color: 'rgb(100, 37, 208, 0.3)',
              },
            },
            {
              type: 'textStyle',

              attrs: {
                fontSize: '',
                color: 'rgb(100, 37, 208)',
                polish_underline: {
                  color: '',
                  offset: '',
                },
              },
            },
          ],
          text: 'Add to library ',
        },
        {
          type: 'text',
          text: 'to add the article to the citation library that you could access cite in your essay later.',
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: {
        class: null,
        textAlign: 'left',
      },
      content: [
        {
          type: 'text',
          marks: [
            {
              type: 'bold',
            },
          ],
          text: 'Try it yourself! ',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'bold',
            },
            {
              type: 'highlight',
              attrs: {
                color: 'rgb(100, 37, 208, 0.3)',
              },
            },
            {
              type: 'textStyle',
              attrs: {
                fontSize: '',
                color: 'rgb(100, 37, 208)',
                polish_underline: {
                  color: '',
                  offset: '',
                },
              },
            },
          ],
          text: 'Highlight',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'bold',
            },
          ],
          text: ' the text below, click ',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'bold',
            },
            {
              type: 'highlight',
              attrs: {
                color: 'rgb(100, 37, 208, 0.3)',
              },
            },
            {
              type: 'textStyle',
              attrs: {
                fontSize: '',
                color: 'rgb(100, 37, 208)',
                polish_underline: {
                  color: '',
                  offset: '',
                },
              },
            },
          ],
          text: 'Citation',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'bold',
            },
          ],
          text: ' and cite any article you like.',
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: {
        class: null,
        textAlign: 'left',
      },
      content: [
        {
          type: 'text',
          text: 'Large language models will transform the future of medical education ',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'textStyle',
              attrs: {
                fontSize: '',
                color: 'rgb(36, 91, 219)',
                polish_underline: {
                  color: '',
                  offset: '',
                },
              },
            },
          ],
          text: '(Alaa)',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        id: '66abe70b-c46d-4383-bde0-bdd0cb44a7e0',
        'data-toc-id': '66abe70b-c46d-4383-bde0-bdd0cb44a7e0',
        textAlign: 'left',
        level: 2,
      },
      content: [
        {
          type: 'text',
          marks: [
            {
              type: 'bold',
            },
          ],
          text: 'Managing Citations',
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: {
        class: null,
        textAlign: 'left',
      },
      content: [
        {
          type: 'text',
          text: 'In ',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'highlight',
              attrs: {
                color: 'rgb(100, 37, 208, 0.3)',
              },
            },
            {
              type: 'textStyle',
              attrs: {
                fontSize: '',
                color: 'rgb(100, 37, 208)',
                polish_underline: {
                  color: '',
                  offset: '',
                },
              },
            },
          ],
          text: 'Citation',
        },
        {
          type: 'text',
          text: ', click the ',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'highlight',
              attrs: {
                color: 'rgb(100, 37, 208, 0.3)',
              },
            },
            {
              type: 'textStyle',
              attrs: {
                fontSize: '',
                color: 'rgb(100, 37, 208)',
                polish_underline: {
                  color: '',
                  offset: '',
                },
              },
            },
          ],
          text: 'arrow',
        },
        {
          type: 'text',
          text: ' in the lower right corner to find your citations in this document and articles stored in your library.',
        },
      ],
    },
  ],
};

export const CitationSample = {
  publish_date: {
    day: '',
    month: '',
    year: 2023,
  },
  contributors: [
    {
      first_name: 'Alaa',
      middle_name: 'A.',
      last_name: 'Abd-Alrazaq',
      suffix: null,
      role: 'author',
    },
    {
      first_name: 'Rawan',
      middle_name: null,
      last_name: 'AlSaad',
      suffix: null,
      role: 'author',
    },
    {
      first_name: 'Dari',
      middle_name: null,
      last_name: 'AlHuwail',
      suffix: null,
      role: 'author',
    },
    {
      first_name: 'Arfan',
      middle_name: null,
      last_name: 'Ahmed',
      suffix: null,
      role: 'author',
    },
    {
      first_name: 'P.',
      middle_name: null,
      last_name: 'Healy',
      suffix: null,
      role: 'author',
    },
    {
      first_name: 'Syed',
      middle_name: null,
      last_name: 'Latifi',
      suffix: null,
      role: 'author',
    },
    {
      first_name: 'Sarah',
      middle_name: null,
      last_name: 'Aziz',
      suffix: null,
      role: 'author',
    },
    {
      first_name: 'Rafat',
      middle_name: null,
      last_name: 'Damseh',
      suffix: null,
      role: 'author',
    },
    {
      first_name: 'Sadam',
      middle_name: 'Alabed',
      last_name: 'Alrazak',
      suffix: null,
      role: 'author',
    },
    {
      first_name: 'Javaid',
      middle_name: null,
      last_name: 'Sheikh',
      suffix: null,
      role: 'author',
    },
  ],
  page_info: {
    start: null,
    end: null,
  },
  journal_title: 'JMIR Medical Education',
  article_title:
    'Large Language Models in Medical Education: Opportunities, Challenges, and Future Directions',
  doi: '10.2196/48291',
  advanced_info: {
    issue: '',
    volume: '9',
    series: '',
  },
};
