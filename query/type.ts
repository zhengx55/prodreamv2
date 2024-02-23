import type { JSONContent } from '@tiptap/react';

export interface LoginResponse {
  code: number;
  data: LoginData;
  msg: string;
}

export interface LoginData {
  avatar: string;
  create_time: number;
  email: string;
  first_name: string;
  last_name: string;
  update_time: number;
  user_id: string;
  is_google: boolean;
  is_verified: boolean;
}

export interface ISigunUpRequest {
  email: string;
  first_name: string;
  referral?: string;
  last_name?: string;
  password: string;
  is_mobile?: boolean;
}

export interface IResetParams {
  email: string;
  password: string;
  verification_code: string;
}

export interface IVerifyEmail {
  email: string;
  type: '1' | '0';
  code: string;
}

export interface IPolishParams {
  block: JSONContent[];
}
export interface IGrammarResult {
  index: number[];
  diff: {
    expand: boolean;
    data: IDiffObject[];
  }[];
}

export type IGrammarResponse = {
  index: number[];
  diff: IDiffObject[][];
};

export interface IDiffObject {
  sub_str: string;
  new_str: string;
  status: number;
}

export interface IPlagiarismData {
  scores: number;
  spans: number[][];
  status: string;
}

export type IDocDetail = {
  id: string;
  title: string;
  create_time: number;
  update_time: number;
  in_text_citations: string[];
  content: string;
  citation_candidates: string[];
};

export interface ICitation {
  abstract: string;
  advanced_info: AdvancedInfo;
  area: string[];
  article_title: string;
  authors: Author[];
  citation_count: number;
  doi: null;
  publisher: string;
  tldr: string;
  influential_citation_count: number;
  journal_title: null | string;
  page_info: PageInfo;
  pdf_url: null | string;
  publish_date: PublishDate;
  reference_count: number;
}

interface AdvancedInfo {
  issue: null;
  series: string | null;
  volume: null | string;
}

interface Series {
  end: null;
  start: null;
}

interface Author {
  first_name: string;
  last_name: string;
  middle_name: string;
  role: string;
  suffix: string;
}

export interface PageInfo {
  end: string;
  start: string;
}

export interface PublishDate {
  day: number | null;
  month: number | null;
  year: number | null;
}

export type UserTrackData = {
  guidence?: string;
  continue_writing_task?: string;
  ai_copilot_task?: string;
  generate_tool_task?: string;
  citation_task?: string;
  tasks?: string;
  citation_empty_check?: string;
  outline_tip_task?: string;
  continue_tip_task?: string;
  highlight_task?: string;
  grammar_task?: string;
  basic_task?: string;
};

const test = [
  {
    index: [0, 0],
    diff: [
      [
        {
          sub_str: 'In America, the right to bear arms ',
          new_str: ' ',
          status: 0,
        },
        {
          sub_str: 'delivered ',
          new_str: 'has created ',
          status: 3,
        },
        {
          sub_str: 'a phenomenon called the ',
          new_str: ' ',
          status: 0,
        },
        {
          sub_str: '“gun culture”. ',
          new_str: '"gun culture. ',
          status: 3,
        },
        {
          sub_str: 'The title was founded by ',
          new_str: ' ',
          status: 0,
        },
        {
          sub_str: 'historian, ',
          new_str: 'historian ',
          status: 3,
        },
        {
          sub_str: 'Richard ',
          new_str: ' ',
          status: 0,
        },
        {
          sub_str: 'Hofstadter ',
          new_str: 'Hofstadter, ',
          status: 3,
        },
        {
          sub_str: 'in which he describes ',
          new_str: ' ',
          status: 0,
        },
        {
          sub_str: 'America’s ',
          new_str: "America's ",
          status: 3,
        },
        {
          sub_str: 'heritage and affection for weapons.',
          new_str: '',
          status: 0,
        },
      ],
      [
        {
          sub_str:
            'Gun culture has not only become an inseparable part of American democracy but',
          new_str: '',
          status: 0,
        },
        {
          sub_str: ' ',
          new_str: 'is ',
          status: 1,
        },
        {
          sub_str: 'also considered ',
          new_str: ' ',
          status: 0,
        },
        {
          sub_str: 'to be ',
          new_str: ' ',
          status: 2,
        },
        {
          sub_str:
            'equivalent to independence and freedom, which are important values for ',
          new_str: ' ',
          status: 0,
        },
        {
          sub_str: 'the ',
          new_str: ' ',
          status: 2,
        },
        {
          sub_str: 'society in America.',
          new_str: '',
          status: 0,
        },
      ],
      [
        {
          sub_str:
            'Although this so-called gun culture plays an important role in',
          new_str: '',
          status: 0,
        },
        {
          sub_str: 'today’s ',
          new_str: "today's ",
          status: 3,
        },
        {
          sub_str: 'politics, schools in the country ',
          new_str: ' ',
          status: 0,
        },
        {
          sub_str: 'has ',
          new_str: 'have ',
          status: 3,
        },
        {
          sub_str: 'become perilous places in the 20th century.',
          new_str: '',
          status: 0,
        },
      ],
      [
        {
          sub_str: 'Mass shootings have been taking place all over',
          new_str: '',
          status: 0,
        },
        {
          sub_str: 'America ',
          new_str: 'America, ',
          status: 3,
        },
        {
          sub_str: 'and these incidents are leading to one or more deaths. ',
          new_str: ' ',
          status: 0,
        },
      ],
    ],
  },
  {
    index: [1, 0],
    diff: [
      [
        {
          sub_str: 'Many of ',
          new_str: ' ',
          status: 0,
        },
        {
          sub_str: 'us ',
          new_str: 'us, ',
          status: 3,
        },
        {
          sub_str: 'as ',
          new_str: ' ',
          status: 0,
        },
        {
          sub_str: 'individuals ',
          new_str: 'individuals, ',
          status: 3,
        },
        {
          sub_str: 'when we think of school shootings, our minds ',
          new_str: ' ',
          status: 0,
        },
        {
          sub_str: 'would ',
          new_str: ' ',
          status: 2,
        },
        {
          sub_str: 'immediately go back to the Columbine ',
          new_str: ' ',
          status: 0,
        },
        {
          sub_str: 'high school ',
          new_str: 'High School ',
          status: 3,
        },
        {
          sub_str: 'shooting.',
          new_str: '',
          status: 0,
        },
      ],
      [
        {
          sub_str: 'According to',
          new_str: '',
          status: 0,
        },
        {
          sub_str: ' ',
          new_str: 'the ',
          status: 1,
        },
        {
          sub_str: 'encyclopaedia, ',
          new_str: 'encyclopedia, ',
          status: 3,
        },
        {
          sub_str:
            'the occurrence was one of the deadliest mass shootings in United States history. 13 people were killed and more than 20 were wounded until the Parkland shooting ',
          new_str: ' ',
          status: 0,
        },
        {
          sub_str: 'occurred ',
          new_str: 'occurred, ',
          status: 3,
        },
        {
          sub_str:
            'and is now known to be the deadliest high school shooting in which 17 people were killed.',
          new_str: '',
          status: 0,
        },
      ],
      [
        {
          sub_str: 'In the article published by The Atlantic',
          new_str: '',
          status: 0,
        },
        {
          sub_str: 'on ',
          new_str: 'in ',
          status: 3,
        },
        {
          sub_str: '2017, ',
          new_str: ' ',
          status: 0,
        },
        {
          sub_str: ' ',
          new_str: 'titled ',
          status: 1,
        },
        {
          sub_str: '“The ',
          new_str: '"The ',
          status: 3,
        },
        {
          sub_str: 'Righteous Anger of the Parkland Shooting’s Teen ',
          new_str: ' ',
          status: 0,
        },
        {
          sub_str: 'Survivors” ',
          new_str: 'Survivors" and ',
          status: 3,
        },
        {
          sub_str:
            'written by Robinson Meyer, we see how juveniles in today’s society are becoming more knowledgeable ',
          new_str: ' ',
          status: 0,
        },
        {
          sub_str: 'of ',
          new_str: 'about ',
          status: 3,
        },
        {
          sub_str: 'the real issues in ',
          new_str: ' ',
          status: 0,
        },
        {
          sub_str: ' ',
          new_str: 'the ',
          status: 1,
        },
        {
          sub_str: 'USA and ',
          new_str: ' ',
          status: 0,
        },
        {
          sub_str: 'explores ',
          new_str: 'exploring ',
          status: 3,
        },
        {
          sub_str: 'political activism in response to gun control issues. ',
          new_str: ' ',
          status: 0,
        },
      ],
    ],
  },
  {
    index: [2, 0],
    diff: [
      [
        {
          sub_str:
            'Robinson Meyer is the writer of the article "The Righteous Anger of the Parkland Shooting\'s Teen Survivors," who is a part of the staff at the American ',
          new_str: ' ',
          status: 0,
        },
        {
          sub_str: 'magazine ',
          new_str: 'magazine, ',
          status: 3,
        },
        {
          sub_str: 'However, the text is also available online,',
          new_str: '',
          status: 0,
        },
        {
          sub_str: ' ',
          new_str: 'making ',
          status: 1,
        },
        {
          sub_str: 'which makes ',
          new_str: ' ',
          status: 2,
        },
        {
          sub_str: 'it accessible ',
          new_str: ' ',
          status: 0,
        },
        {
          sub_str: 'for ',
          new_str: 'to ',
          status: 3,
        },
        {
          sub_str: 'all international English-speaking readers.',
          new_str: '',
          status: 0,
        },
      ],
      [
        {
          sub_str:
            'Still, Meyer follows the typical structure of a modern feature',
          new_str: '',
          status: 0,
        },
        {
          sub_str: 'article ',
          new_str: 'article, ',
          status: 3,
        },
        {
          sub_str:
            "in which he analyzes survivors' reactions to the school shooting.",
          new_str: '',
          status: 0,
        },
      ],
      [
        {
          sub_str: 'This will be discussed',
          new_str: '',
          status: 0,
        },
        {
          sub_str: 'later ',
          new_str: 'later. ',
          status: 3,
        },
        {
          sub_str: 'on. ',
          new_str: ' ',
          status: 2,
        },
      ],
    ],
  },
];
