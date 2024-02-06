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
  text: string;
}

export interface IPolishQueryData {
  result: IPolishQueryResult[];
  status: string;
}

export interface IPolishResultA {
  // 分段或分句的数据格式响应
  result: IPolishResultAData[] | string;
  status: string;
}

export interface IPolishResultAData {
  end: number;
  data: {
    sub_str: string;
    new_str: string;
    /**
     * 0 - 无变化
     * 1 - 增
     * 2 - 删
     * 3 - 改
     *
     */
    status: 0 | 1 | 2 | 3;
  }[];
  start: number;
  expand?: boolean;
  hide?: boolean;
}

export interface IPolishQueryResult {
  end: number;
  new_sentence: NewSentence[];
  original_sentence: NewSentence[];
  start: number;
}

export interface NewSentence {
  is_identical: boolean;
  sub_str: string;
}

export interface IEssayAssessData {
  detail: Detail[];
  head: string;
  id: string;
  score: string;
}

/**
 * 该数组按Introduction、Language、Authenticity and Creativity、Fit、Organization and Flow、Grammar
 * 顺序排列
 */
export interface Detail {
  comment: Comment;
  level: string;
  score: number | number;
  title: string;
}

export interface Comment {
  evaluation: string;
  example: string;
  suggestion: string;
}

export interface IPlagiarismData {
  scores: number;
  spans: Span[];
  status: string;
}

export interface Span {
  span: number[];
  urls: string[];
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
  middle_name: null | string;
  role: string;
  suffix: null;
}

export interface PageInfo {
  end: null | string;
  start: null | string;
  [property: string]: any;
}

export interface PublishDate {
  day: number | null;
  month: number | null;
  year: number | null;
  [property: string]: any;
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
};
