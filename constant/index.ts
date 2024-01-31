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
