import { Locale } from '@/i18n-config';
import { type getDictionary } from '@/lib/get-dictionary';

declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_API_BASE_URL: string;
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: string;
    NEXT_PUBLIC_POSTHOG_HOST: string;
  }
}

export type IGuidence = {
  show_guidence: boolean;
};

export type InputProps = {
  value: string;
  disable: boolean;
};

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
};

export type DocSortingMethods = 'lastOpenedTime' | 'title';

export type HomePageDicType = {
  t: Awaited<ReturnType<typeof getDictionary>>['Homepage'];
  lang: Locale;
};

export type AuthPageDicType = {
  t: Awaited<ReturnType<typeof getDictionary>>['Auth'];
  lang: Locale;
};

export type DocPageDicType = {
  t: Awaited<ReturnType<typeof getDictionary>>['Editor'];
  lang: Locale;
};

export type EditorDictType = Awaited<
  ReturnType<typeof getDictionary>
>['Editor'];

export type Sentence = {
  id: string;
  text: string;
  expand: boolean;
  ranges?: number[];
  result: string;
};

interface ICitationBase {
  id: string;
  reference_count: number;
  area: string[];
  abstract: string;
  annotation: string;
  contributors: IContributors[];
  document_id: string;
  manual_create: boolean;
}

export type ICitationType =
  | 'BookSection'
  | 'WholeBook'
  | 'Website'
  | 'BookSpecialSection'
  | 'Journal';

export type ICitationData = IWebsiteCitation &
  IJournalCitation &
  IBookCitation &
  IChapterCitation &
  IIntroductionCitation & {
    in_text_pos?: number;
    in_text_rank?: number;
    bibtex: string;
  };

export type IContributors = {
  first_name: string;
  last_name: string;
  middle_name: string;
  role: string;
  suffix: string;
};

export interface IWebsiteCitation {
  abstract: string;
  access_date: {
    day: string;
    month: string;
    year: string;
  };
  annotation: string;
  article_title: string;
  contributors: IContributors[];
  document_id: string;
  publisher: string;
  website_title: string;
  url: string;
  reference_count: number;
  area: string[];
  manual_create: boolean;
  id: string;
}

export interface IJournalCitation {
  id: string;
  reference_count: number;
  area: string[];
  pdf_url: string;
  abstract: string;
  advanced_info: {
    issue?: string;
    series?: string;
    volume?: string;
  };
  tldr: string;
  manual_create: boolean;
  publisher: string;
  citation_count: number;
  annotation: string;
  article_title: string;
  contributors: IContributors[];
  document_id: string;
  influential_citation_count: number;
  doi: string;
  journal_title?: string;
  page_info: { end?: string; start?: string };
  publish_date?: {
    day: number | string;
    month: string | null;
    year: number | string;
  };
}

export interface IBookCitation {
  reference_count: number;
  area: string[];
  abstract: string;
  advanced_info: {
    edition?: string;
    series?: string;
    total_vol?: string;
    vol?: string;
  };
  manual_create: boolean;
  annotation: string;
  book_title: string;
  contributors: IContributors[];
  document_id: string;
  publication_info: {
    city?: string;
    publish_year?: number | null;
    publisher?: string;
    state?: string;
  };
  id: string;
}

export interface IChapterCitation {
  reference_count: number;
  area: string[];
  abstract: string;
  advanced_info: {
    edition?: string;
    series?: string;
    total_vol?: string;
    vol?: string;
  };
  annotation: string;
  book_title: string;
  contributors: IContributors[];
  document_id: string;
  manual_create: boolean;
  page_info: { end?: number | null; start?: number | null };
  publication_info: {
    city?: string;
    publish_year?: number | null;
    publisher?: string;
    state?: string;
  };
  section_title?: string;
  id: string;
}

export interface IIntroductionCitation {
  reference_count: number;
  area: string[];
  abstract: string;
  advanced_info: {
    edition?: string;
    series?: string;
    total_vol?: string;
    vol?: string;
  };
  annotation: string;
  manual_create: boolean;
  book_title: string;
  contributors: IContributors[];
  document_id: string;
  page_info: { end?: number | null; start?: number | null };
  publication_info: {
    city?: string;
    publish_year?: number | null;
    publisher?: string;
    state?: string;
  };
  section_title?: string;
  special_section_type?: string;
  id: string;
}

export type ISubscription = {
  subscription: 'basic' | 'unlimited' | 'free_trail';
  expire_time: number;
  free_times_detail: FreeTimesDetail;
  subscription_id: string;
  subscription_type: string;
};

export type IDiscount = {
  discount: number | null;
  expire_at: number | null;
};

export type FreeTimesDetail = {
  Copilot: number | null;
  Generate: number | null;
  Grammar: number | null;
  Document: number | null;
};

export type ISubsciptionHistory = {
  id: number;
  user_id: string;
  product_id: string;
  price: number;
  start_date: number;
  end_date: number;
  finished: boolean;
  subscription_id: string;
  mode: string;
  canceled: boolean;
};

export type AIResearchMessage = {
  query: string;
  message: string;
  reference: AIResearchMessageRef[];
  id: string;
};

export type AIResearchMessageRef = {
  title: string;
  link: string;
  date?: string;
  position: string;
  snippet: string;
};

export type PdfResult = {
  prob: number;
  link: string;
  score: string;
  results: string;
  total_words: string;
};
