declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_API_BASE_URL: string;
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: string;
    NEXT_PUBLIC_POSTHOG_HOST: string;
  }
}

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
  IIntroductionCitation & { id: string };

export interface IWebsiteCitation {
  access_date: {
    day?: number | null;
    month?: string | null;
    year?: number | null;
  };
  annotation?: null | string;
  article_title: string;
  contributors?:
    | {
        first_name?: null | string;
        last_name?: null | string;
        middle_name?: null | string;
      }[]
    | null;
  document_id: string;
  publisher?: null | string;
  website_title: string;
  url?: string;
}

export interface IJournalCitation {
  advanced_info?: {
    issue?: null | string;
    series?: null | string;
    volume?: null | string;
  };
  annotation?: null | string;
  article_title?: null | string;
  contributors?:
    | {
        first_name?: null | string;
        last_name?: null | string;
        middle_name?: null | string;
        /**
         * author, editor, translator, compiler
         */
        role?: null | string;
        suffix?: null | string;
      }[]
    | null;
  document_id: string;
  doi?: null | string;
  journal_title?: null | string;
  page_info?: { end?: null | string; start?: null | string };
  publish_date?: {
    day?: number | string;
    month?: string | null;
    year?: number | string;
  };
}

export interface IBookCitation {
  advanced_info?: {
    edition?: null | string;
    series?: null | string;
    total_vol?: null | string;
    vol?: null | string;
  };
  annotation?: null | string;
  book_title: null | string;
  contributors?: {
    first_name?: null | string;
    last_name?: null | string;
    middle_name?: null | string;
    role?: null | string;
    suffix?: null | string;
  }[];
  document_id: string;
  publication_info?: {
    city?: null | string;
    publish_year?: number | null;
    publisher?: null | string;
    state?: null | string;
  };
}

export interface IChapterCitation {
  advanced_info?: {
    edition?: null | string;
    series?: null | string;
    total_vol?: null | string;
    vol?: null | string;
  };
  annotation?: null | string;
  book_title: null | string;
  contributors?: {
    first_name?: null | string;
    last_name?: null | string;
    middle_name?: null | string;
    role?: null | string;
  }[];
  document_id: string;
  page_info?: { end?: number | null; start?: number | null };
  publication_info?: {
    city?: null | string;
    publish_year?: number | null;
    publisher?: null | string;
    state?: null | string;
  };
  section_title?: null | string;
}

export interface IIntroductionCitation {
  advanced_info?: {
    edition?: null | string;
    series?: null | string;
    total_vol?: null | string;
    vol?: null | string;
  };
  annotation?: null | string;
  book_title: null | string;
  contributors?: {
    first_name?: null | string;
    last_name?: null | string;
    middle_name?: null | string;
    /**
     * author, editor, translator, compiler
     */
    role?: null | string;
    suffix?: null | string;
  }[];
  document_id: string;
  page_info?: { end?: number | null; start?: number | null };
  publication_info?: {
    city?: null | string;
    publish_year?: number | null;
    publisher?: null | string;
    state?: null | string;
  };
  section_title?: null | string;
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
