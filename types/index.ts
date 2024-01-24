import { ICitationType } from '@/query/type';

export interface IUsage {
  /**
   * 是否是以第一次使用ai editor
   * 以此类推
   */
  first_editior: boolean;
  first_brainstorm: boolean;
  first_resume: boolean;
  first_activity_list: boolean;
  first_activity_list_upload: boolean;
  first_activity_list_generate: boolean;
  first_activity_list_edit: boolean;
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
    day?: number | null;
    month?: string | null;
    year?: number | null;
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

export type GetCitationDataType<T extends ICitationType> = T extends 'Website'
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
