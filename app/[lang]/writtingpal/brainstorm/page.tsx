import List from '@/components/brainstorm/List';
import { BrainStormTypes } from '@/constant/enum';
import { IBrainsotrmCard } from '@/types';

const brainstorms_data = [
  {
    id: 'a66e53e6bb1f4391909b93378170e63c',
    name: 'Common App Prompt 1',
    description: 'Answer 6 questions quickly to write Common App prompt 1',
    tag: ['University Application', 'Inspiration'],
    icon: 'tpl01.png',
    rearrange: 0,
    word_range: [],
    has_pro: true,
    template_class: 'Common App',
    price: 2,
    practice_experience_id: '',
    start_style: false,
  },
  {
    id: 'a993bb22f1e3456187dc1b9173596ece',
    name: 'Common App Prompt 2',
    description: 'Answer 5 questions quickly to write Common App prompt 2',
    tag: ['University Application', 'Inspiration'],
    icon: 'tpl01.png',
    rearrange: 0,
    word_range: [],
    has_pro: true,
    template_class: 'Common App',
    price: 2,
    practice_experience_id: '',
    start_style: false,
  },
  {
    id: 'fab35e67d2bd409d82c9fe068e630af3',
    name: 'Common App Prompt 3',
    description: 'Answer 4 questions quickly to write Common App prompt 3',
    tag: ['University Application', 'Inspiration'],
    icon: 'tpl01.png',
    rearrange: 0,
    word_range: [],
    has_pro: true,
    template_class: 'Common App',
    price: 2,
    practice_experience_id: '',
    start_style: false,
  },
  {
    id: 'e251f333bb56473b97ebc5f5428431f7',
    name: 'Common App Prompt 4',
    description: 'Answer 4 questions quickly to write Common App prompt 4',
    tag: ['University Application', 'Inspiration'],
    icon: 'tpl01.png',
    rearrange: 0,
    word_range: [],
    has_pro: true,
    template_class: 'Common App',
    price: 2,
    practice_experience_id: '',
    start_style: false,
  },
  {
    id: 'fbe43faf9c004329ae683afbb4dae57d',
    name: 'Common App Prompt 5',
    description: 'Answer 5 questions quickly to write Common App prompt 5',
    tag: ['University Application', 'Inspiration'],
    icon: 'tpl01.png',
    rearrange: 0,
    word_range: [],
    has_pro: true,
    template_class: 'Common App',
    price: 2,
    practice_experience_id: '',
    start_style: false,
  },
  {
    id: 'a20d45a7a0ba463d89b2eb18b4ca62ae',
    name: 'Common App Prompt 6',
    description: 'Answer 5 questions quickly to write Common App prompt 6',
    tag: ['University Application', 'Inspiration'],
    icon: 'tpl01.png',
    rearrange: 0,
    word_range: [],
    has_pro: true,
    template_class: 'Common App',
    price: 2,
    practice_experience_id: '',
    start_style: false,
  },
  {
    id: 'b19aafa99d834c63bc031bba84f83de8',
    name: 'UC 1 Leadership',
    description:
      'Craft your winning application essays to the University of California schools',
    tag: ['University Application'],
    icon: 'tpl01.png',
    rearrange: 0,
    word_range: [],
    has_pro: true,
    template_class: 'UC Freshman&Transfer',
    price: 1,
    practice_experience_id: '',
    start_style: false,
  },
  {
    id: 'b77960ea4d7843f6af645514aae3c1e4',
    name: 'UC 2 Innovation/Creativity',
    description:
      'Craft your winning application essays to the University of California schools',
    tag: ['University Application'],
    icon: 'tpl01.png',
    rearrange: 0,
    word_range: [],
    has_pro: true,
    template_class: 'UC Freshman&Transfer',
    price: 1,
    practice_experience_id: '',
    start_style: false,
  },
  {
    id: 'dca455097af34ba09202b1379be8472e',
    name: 'UC 3 Talent/Skill',
    description:
      'Craft your winning application essays to the University of California schools',
    tag: ['University Application'],
    icon: 'tpl01.png',
    rearrange: 0,
    word_range: [],
    has_pro: true,
    template_class: 'UC Freshman&Transfer',
    price: 1,
    practice_experience_id: '',
    start_style: false,
  },
  {
    id: 'cc2b9456de9e46238699bf8e36274fce',
    name: 'UC 4 Educational Opportunity/Barrier',
    description:
      'Craft your winning application essays to the University of California schools',
    tag: ['University Application'],
    icon: 'tpl01.png',
    rearrange: 0,
    word_range: [],
    has_pro: true,
    template_class: 'UC Freshman&Transfer',
    price: 1,
    practice_experience_id: '',
    start_style: false,
  },
  {
    id: 'f15b2fd3df4a47d8ae8f1879125dce1e',
    name: 'UC 5 Challenge',
    description:
      'Craft your winning application essays to the University of California schools',
    tag: ['University Application'],
    icon: 'tpl01.png',
    rearrange: 0,
    word_range: [],
    has_pro: true,
    template_class: 'UC Freshman&Transfer',
    price: 1,
    practice_experience_id: '',
    start_style: false,
  },
  {
    id: 'ae37fb9f350f45dc86be9803894b2068',
    name: 'UC 6 Academic Interests',
    description:
      'Craft your winning application essays to the University of California schools',
    tag: ['University Application'],
    icon: 'tpl01.png',
    rearrange: 0,
    word_range: [],
    has_pro: true,
    template_class: 'UC Freshman&Transfer',
    price: 1,
    practice_experience_id: '',
    start_style: false,
  },
  {
    id: 'fbaf58065f644ce0a0f4041420ef1dbc',
    name: 'UC 7 Community Contribution',
    description:
      'Craft your winning application essays to the University of California schools',
    tag: ['University Application'],
    icon: 'tpl01.png',
    rearrange: 0,
    word_range: [],
    has_pro: true,
    template_class: 'UC Freshman&Transfer',
    price: 1,
    practice_experience_id: '',
    start_style: false,
  },
  {
    id: 'bc8d011895bd49a3a7781708dc06a107',
    name: 'UC Transfer Must-Use',
    description: 'One-click writing to help you transfer to UCB and UCLA.',
    tag: ['University Application'],
    icon: 'tpl01.png',
    rearrange: 0,
    word_range: [],
    has_pro: true,
    template_class: 'UC Freshman&Transfer',
    price: 1,
    practice_experience_id: '',
    start_style: false,
  },
  {
    id: 'e32c29696ffe4215a873fe4cfd86f748',
    name: 'UC & Common App Activity',
    description: 'Struggling with word limits? Leave it to us!',
    tag: ['University Application'],
    icon: 'tpl01.png',
    rearrange: 0,
    word_range: [],
    has_pro: false,
    template_class: 'Other',
    price: 1,
    practice_experience_id: '',
    start_style: false,
  },
  {
    id: 'a2b0667b93e543e69599648f9ddeb126',
    name: 'Recommendation Letter - Quick Version',
    description:
      "Need to write a letter of recommendation? Just copy and paste the student's requested recommendation letter and you're done!",
    tag: ['University Application'],
    icon: 'tpl06.png',
    rearrange: 0,
    word_range: [],
    has_pro: false,
    template_class: 'Recommendation Letter',
    price: 2,
    practice_experience_id: '',
    start_style: false,
  },
  {
    id: 'bcedc5bb249342c9bde53665fb299302',
    name: 'Recommendation Letter',
    description:
      "Need to write a letter of recommendation? Just take a few minutes to answer 5 questions and you're all set!",
    tag: ['University Application'],
    icon: 'tpl06.png',
    rearrange: 0,
    word_range: [],
    has_pro: false,
    template_class: 'Recommendation Letter',
    price: 2,
    practice_experience_id: '',
    start_style: false,
  },
  {
    id: '2f3bc28186dd4acf9deff1047d010651',
    name: 'Request for Recommendation Letter',
    description:
      'Craft  a compelling and thoughtful email to secure a strong recommendation letter from your professor',
    tag: ['University Application'],
    icon: 'tpl06.png',
    rearrange: 0,
    word_range: [],
    has_pro: false,
    template_class: 'Recommendation Letter',
    price: 1,
    practice_experience_id: '',
    start_style: false,
  },
];
export default async function Brainstorm() {
  const res = await fetch(
    'https://quickapply.app/api/ai/list_templates?lang=en',
    {
      next: { revalidate: 3600 },
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5OTI4MjQ5NCwianRpIjoiNTA0NGEzMmYtNWYwMS00ZTI2LTgzMmQtYTU5ZTUxMDcwMTM0IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJ1c2VyX2lkIjoyMTMsImdyb3VwX2lkIjoyMDJ9LCJuYmYiOjE2OTkyODI0OTQsImV4cCI6MTY5OTg4NzI5NH0.zCWZnQ_2deUqHd6IS1R31k2c1LEc9I3zcd4ttb2YjkU`,
      },
    }
  );
  const data = await res.json();

  const common_data = brainstorms_data.filter(
    (item: IBrainsotrmCard) => item.template_class === BrainStormTypes.COMMON
  );
  const uc_data = brainstorms_data.filter(
    (item: IBrainsotrmCard) => item.template_class === BrainStormTypes.UC
  );
  const other_data = brainstorms_data.filter(
    (item: IBrainsotrmCard) => item.template_class === BrainStormTypes.OTHER
  );
  const recommand_data = brainstorms_data.filter(
    (item: IBrainsotrmCard) =>
      item.template_class === BrainStormTypes.RECOMMENDATION
  );

  return (
    <section className='flex h-[calc(100%_-_68px)] w-full flex-col gap-y-4 overflow-y-auto bg-sectionBackground md:py-5 md:pl-5 md:pr-10'>
      <List title={BrainStormTypes.COMMON} cardList={common_data} />
      <List title={BrainStormTypes.UC} cardList={uc_data} />
      <List title={BrainStormTypes.OTHER} cardList={other_data} />
      <List title={BrainStormTypes.RECOMMENDATION} cardList={recommand_data} />
    </section>
  );
}
