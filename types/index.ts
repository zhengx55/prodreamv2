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
    id: string;
  };

export interface IWebsiteCitation {
  abstract: string;
  access_date: {
    day: number | null;
    month: string | null;
    year: number | null;
  };
  annotation: string;
  article_title: string;
  contributors: {
    first_name?: string;
    last_name?: string;
    middle_name?: string;
  }[];
  document_id: string;
  publisher: string;
  website_title: string;
  url: string;
  reference_count: number;
  area: string[];
}

export interface IJournalCitation {
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
  publisher: string;
  citation_count: number;
  annotation: string;
  article_title: string;
  contributors: {
    first_name: string;
    last_name: string;
    middle_name: string;
    role: string;
    suffix: string;
  }[];
  document_id: string;
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
  annotation: string;
  book_title: string;
  contributors: {
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    role?: string;
    suffix?: string;
  }[];
  document_id: string;
  publication_info: {
    city?: string;
    publish_year?: number | null;
    publisher?: string;
    state?: string;
  };
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
  contributors: {
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    role?: string;
  }[];
  document_id: string;
  page_info: { end?: number | null; start?: number | null };
  publication_info: {
    city?: string;
    publish_year?: number | null;
    publisher?: string;
    state?: string;
  };
  section_title?: string;
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
  book_title: string;
  contributors: {
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    role?: string;
    suffix?: string;
  }[];
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
}

export type GetCitationDataType<T extends ICitationType> = T extends 'website'
  ? IWebsiteCitation
  : T extends 'journal'
    ? IJournalCitation
    : T extends 'whole_book'
      ? IBookCitation
      : T extends 'book_special_section'
        ? IIntroductionCitation
        : T extends 'book_section'
          ? IChapterCitation
          : never;

export type ISubscription = {
  subscription: 'basic' | 'unlimited' | 'free_trail';
  expire_time: number;
  free_times_detail: FreeTimesDetail;
  subscription_id: string;
  subscription_type: string;
};

type FreeTimesDetail = {
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
