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
    title: 'AI editors',
    image: '/polish.svg',
    active_image: '/polish_active.svg',
    link: '/writtingpal/polish',
  },
  {
    id: 'sidebar-02',
    title: 'Brainstorm',
    image: '/templates.svg',
    active_image: '/templates_active.svg',
    link: '/writtingpal/brainstorm',
  },
  {
    id: 'sidebar-03',
    title: 'Resume',
    image: '/resume.svg',
    active_image: '/resume_active.svg',
    link: '/writtingpal/resume',
  },
  {
    id: 'sidebar-04',
    title: 'Activity List',
    image: '/activity.svg',
    active_image: '/activity_active.svg',
    link: '/writtingpal/activityList',
  },
];

export const TutTabs = [
  {
    id: 'tut-tabs01',
    title: 'AI Editor',
    image: '/tutorials/polish.png',
    bg: '#FFFBD6',
  },
  {
    id: 'tut-tabs02',
    title: 'Brainstorm',
    image: '/tutorials/brainstorm.png',
    bg: '#EBFFE4',
  },
  {
    id: 'tut-tabs03',
    title: 'Resume',
    image: '/tutorials/resume.png',
    bg: '#EBF8FF',
  },
  {
    id: 'tut-tabs04',
    title: 'Activity List',
    image: '/tutorials/actList.png',
    bg: '#F6DACE',
  },
];

export const WelcomOptions = [
  {
    id: 'welcome-01',
    title: 'Essay Review & Edit',
    image: '/welcome/Review.png',
    link: '/writtingpal/polish',
  },
  {
    id: 'welcome-02',
    title: 'Explore Essay Ideas & Drafting',
    image: '/welcome/Ideas.png',
    link: '/writtingpal/brainstorm',
  },
  {
    id: 'welcome-03',
    title: 'Activity List',
    image: '/welcome/ActivityList.png',
    link: '/writtingpal/activityList',
  },
  {
    id: 'welcome-04',
    title: 'Resume',
    image: '/welcome/Resume.png',
    link: '/writtingpal/resume',
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

// !!----------------------------------------------------------------
// !! DEMO USE ONLY
// !!----------------------------------------------------------------

export const ChatIntroductionCard = [
  {
    id: 'chat-introduction-1',
    title: 'Discover yourself',
    description:
      "Delve into your story to uncover what truly drives you. By recognizing these values, you'll better navigate your major and school choices.",
  },
  {
    id: 'chat-introduction-2',
    title: 'Know what and how',
    description:
      'Learn what schools seek and how to craft standout essays with tutorials and examples. Analyze top essays to elevate your own.',
  },
  {
    id: 'chat-introduction-3',
    title: 'Being guided step by step',
    description:
      'Being guided step-by-step, much like a human teacher, to delve deep and uncover the core of your college essay narrative',
  },
];

export const moduleMenu = [
  { id: 'module-00', title: 'Overview' },
  { id: 'module-01', title: 'Motivation' },
  { id: 'module-02', title: 'Academic achievements' },
  { id: 'module-03', title: 'Previous Experience' },
  { id: 'module-04', title: 'Career Goal' },
  { id: 'module-05', title: 'Why School' },
];

export const moduleInfo = [
  {
    id: 'info1',
    value: [
      {
        id: 'info1-sub-1',
        title: 'AI-Powered Brainstorming',
        info: "We'll have several sections and will brainstorm with you in each section through dialogue with AI. At the end of each section, we'll provide a summary and reflection. After completing all the sections, you can choose to generate an essay based on your experience, for reference only.",
      },
      {
        id: 'info1-sub-2',
        title: 'Designing Your Blueprint',
        info: "For graduate school personal statements, schools want to know who you are, which program you're applying to, and why. Therefore, we'll brainstorm with you focusing on motivations, academic achievements, previous experiences, program fit, and future career goals. This will likely mirror your essay's structure as well.",
      },
      {
        id: 'info1-sub-3',
        title: 'Read All',
        info: 'Please take your time to read all the provided information, so you can fully understand how to craft an effective graduate school essay.',
      },
    ],
  },
  {
    id: 'info2',
    value: [
      {
        id: 'info2-sub-1',
        title: 'Genuine Interest',
        info: "Clearly convey your genuine passion for the field or subject you're pursuing. It's essential to show that your interest isn't superficial but has depth, backed by experiences or persistent curiosity.",
      },
      {
        id: 'info2-sub-2',
        title: 'Personal Connection',
        info: 'Share a personal story or experience that led to your decision to pursue this particular path. This creates a personal connection and can make your motivation more relatable and compelling.',
      },
      {
        id: 'info2-sub-3',
        title: 'Future Goals',
        info: "Outline how this path aligns with your long-term goals. Demonstrating that you've thought about how this degree or position fits into your broader life plan can underscore the depth of your motivation.",
      },
    ],
  },
  {
    id: 'info3',
    value: [
      {
        id: 'info3-sub-1',
        title: 'Achievements and Outcomes',
        info: 'Detail specific accomplishments in your academic research, such as published papers, research projects, or any awards related to your field of study. These showcase your expertise and results in the domain.',
      },
      {
        id: 'info3-sub-2',
        title: 'Depth and Challenges',
        info: "Describe academic challenges you've encountered and how you overcame them. This can reflect your problem-solving skills, critical thinking, and resilience when faced with adversity.",
      },
      {
        id: 'info3-sub-3',
        title: 'Collaboration and Mentorship',
        info: "If you've collaborated with other scholars or have been mentored by a professor on a particular project, discuss these experiences. This demonstrates your ability to work in teams, engage in academic discussions, and learn and grow from others.",
      },
    ],
  },
  {
    id: 'info4',
    value: [
      {
        id: 'info4-sub-1',
        title: 'Role and Contribution',
        info: 'Specify the roles you held and the responsibilities you undertook. Highlight any significant contributions or changes you made during your tenure, demonstrating your impact and ability to add value.',
      },
      {
        id: 'info4-sub-2',
        title: 'Skills and Learnings',
        info: 'Discuss the skills you acquired and how they make you a better candidate for your desired program. Relate the learnings from these experiences to how they can be applied to future academic and professional pursuits.',
      },
      {
        id: 'info4-sub-3',
        title: 'Professional Growth and Development',
        info: 'Reflect on challenges you faced, how you addressed them, and what you learned in the process. Emphasize moments of growth, leadership opportunities, and any feedback or mentorship that helped shape your professional journey.',
      },
    ],
  },
  {
    id: 'info6',
    value: [
      {
        id: 'info6-sub-1',
        title: 'Specificity',
        info: 'Clearly define your short-term and long-term career objectives. Instead of vague aspirations, mention specific roles, industries, or areas of interest you aim to explore or contribute to.',
      },
      {
        id: 'info6-sub-2',
        title: 'Feasibility',
        info: "Ensure your goals are realistic and attainable given your past experiences and the prospective education or training from the institution to which you're applying. This showcases that you've thoughtfully considered your path.",
      },
      {
        id: 'info6-sub-3',
        title: 'Alignment with Program',
        info: "Demonstrate how the program's offerings, be it courses, faculty, or resources, will bridge the gap between your current skill set and the requirements of your desired career path. This shows that your career goals aren't just aspirations but are backed by a strategic plan.",
      },
    ],
  },
  {
    id: 'info5',
    value: [
      {
        id: 'info4-sub-1',
        title: 'How the Program Supports These Goals',
        info: "Highlight how the program you're applying to is a critical stepping stone in reaching these career objectives. Detail specific offerings of the program, such as specialized courses, internships, or networking opportunities, that will equip you with the skills and knowledge necessary to achieve your goals.",
      },
      {
        id: 'info4-sub-2',
        title: 'Specific faculty interest',
        info: 'Showcase your thorough research by mentioning specific faculty members whose work you admire or wish to collaborate with, as well as other specific research initiatives or resources that attracted you.',
      },
      {
        id: 'info4-sub-3',
        title: 'Campus Culture and Community',
        info: "Reflect on the school's culture, values, and community, explaining how they align with your own beliefs and personality. Whether through campus visits, interactions with current students, or participation in school events, convey a genuine desire to both contribute to and benefit from the school's community.",
      },
    ],
  },
];

export const ChatQuestionIdMap: Record<string, string> = {
  a6fe251ae1eb4c499283bac90d862fd5: 'Reasons for applying',
  b38def168cc94840a92f1249bd595244: 'Academic achievement',
  fe96cfa951c346b091c3d1681ad65957: 'Previous Experience',
  e1c32f5cfbfe45e6a84805a4b35aad8d: 'Reasons for Choosing this Program',
  aaef5245621e46e5bc0d285d2a464897: 'Career Goal',
};

export const messageOptions = [
  {
    id: 'chat-message-options-1',
    title: 'Internship/Work',
    icon: '/messages/briefcase.svg',
    theme: 'rgba(144, 104, 208, 0.2)',
  },
  {
    id: 'chat-message-options-2',
    title: 'Extracurricular',
    icon: '/messages/extracurricular.svg',
    theme: 'rgba(230, 138, 29, 0.2)',
  },
  {
    id: 'chat-message-options-3',
    title: 'Competition',
    icon: '/messages/trophy.svg',
    theme: 'rgba(82, 186, 105, 0.2)',
  },
  {
    id: 'chat-message-options-4',
    title: 'Volunteer',
    icon: '/messages/people.svg',
    theme: 'rgba(255, 177, 177, 0.2)',
  },
  {
    id: 'chat-message-options-5',
    title: 'Research',
    icon: '/messages/research.svg',
    theme: 'rgba(254, 202, 255, 0.2)',
  },
  {
    id: 'chat-message-options-6',
    title: 'Others',
    icon: '/messages/others.svg',
    theme: 'rgba(0, 132, 255, 0.2)',
  },
];

export const moduleExample: Record<string, string> = {
  '1': " At the age of six, the mesmerizing experience of traveling on a train from a small town to the vibrant heart of New York City might have sparked an individual's passion. The allure of the train's movement and the adventure it represented could have been the catalyst, with pages of sketches highlighting this newfound love. Such an early enchantment may very well serve as the foundation for a lifelong commitment to mechanical engineering.",
  '2': "I completed my Bachelor's of Science degree in Physics at MIT, achieving an impressive GPA of 3.8. One of the standout moments during my studies was excelling in 'Quantum Mechanics 101,' where I received an 'A' grade.",
  '3': 'During my time as an intern at BioTech Corp, I was tasked with the analysis of genetic sequences. Despite the weight of the responsibility, I streamlined the methodology, leading to a noteworthy 20% efficiency increase.',
  '5': 'After engaging with XYZ University alumni, I was drawn to the tight-knit community and the emphasis on interdisciplinary learning, which aligns with my own beliefs.',
  '4': 'I aim to become a Machine Learning Specialist, dedicated to developing algorithms that detect early signs of diseases through medical imaging.',
};

export const moduleNotes: Record<string, string> = {
  '1': "Crafting an outstanding personal statement for graduate school is pivotal, focusing on the 'why' - your motivation for applying. It's essential to convey your passion, often rooted in personal experiences. For instance, a childhood fascination with mechanical engineering might stem from a memorable train ride, sparking an enduring interest in how things move. Alternatively, a recent experience, such as being captivated by ancient recipes during a history field trip, can ignite a deep curiosity in a subject like the history of food. These moments, whether from childhood or more recent times, are vital in explaining your drive to pursue advanced studies. They form the foundation of a personal statement that genuinely reflects your aspirations and motivations for graduate study.",
  '2': 'Moving on to the second part of the essay, you want to demenstrate your skills by discussing your academic experience such as your undergraduate major and school, research project, competitions, scholarship award etc. In short, this is the section where you should highlight your educational achievements. You can begin by providing an overview of your educational history, including the institution where you obtained your degree and your major. If your GPA is 3.5 or higher, especially in a relevant field, you can mention your GPA or ranking of the class. Additionally, you could highlight any relevant courses you have completed. If you have engaged in research activities or collaborated with faculty members on projects, be sure to underscore these valuable experiences.',
  '3': 'Highlight impactful experiences in your personal statement. For instance, discuss successful contributions during an internship, skill development in workshops (e.g., mastering R programming), and overcoming challenges (e.g., project setback resolution). Emphasize dedication, adaptability, and problem-solving abilities, showcasing your potential for future success.',
  '5': "Express a thoughtful choice of program by highlighting its alignment with your aspirations, such as the Advanced Neural Studies course at XYZ University. Emphasize faculty influence, citing Professor Johnson's cognitive neuroscience research as a source of excitement. Additionally, underscore the appeal of campus culture, like the tight-knit community and emphasis on interdisciplinary learning, discovered through interactions with alumni.",
  '4': 'Craft a specific career goal, avoiding generic statements like "working in tech." For instance, aspire to be a Machine Learning Specialist focused on medical imaging. Highlight lacking skills and how the program addresses them. Portray your career goal as a guiding lighthouse, intertwining past, present, and future. A precise, realistic, and congruent goal will resonate profoundly with the admissions committee, culminating in a compelling personal statement.',
};
