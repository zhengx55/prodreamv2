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

// ----------------------------------------------------------------
// LANDING PAGE
// ----------------------------------------------------------------
export const HeroInfo = [
  {
    id: 'hero-01',
    icon: '/landing/heros/outline.svg',
    title: 'Outlining',
    text: 'Our feature creates detailed outlines with relevant sources, ',
  },
  {
    id: 'hero-02',
    icon: '/landing/heros/editing.svg',
    title: 'Editing',
    text: 'Our feature creates detailed outlines with relevant sources, ',
  },
  {
    id: 'hero-03',
    icon: '/landing/heros/citation.svg',
    title: 'Citation',
    text: 'Our feature creates detailed outlines with relevant sources, ',
  },
  {
    id: 'hero-04',
    icon: '/landing/heros/proofread.svg',
    title: 'Proofread',
    text: 'Our feature creates detailed outlines with relevant sources, ',
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
