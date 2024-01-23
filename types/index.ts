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
    month?: number | null;
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
