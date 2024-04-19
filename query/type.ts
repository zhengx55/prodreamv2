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
  first_name?: string;
  referral?: string;
  last_name?: string;
  password: string;
  is_mobile?: boolean;
  traffic_source?: string;
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

export type IDetectionResult = {
  prob: number;
  class_probabilities: {
    ai: number;
    human: number;
    mixed: number;
  };
  message: string;
  highlight_sentences: [number[], number[], string][];
};

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
  pdf: string;
}

export type IDocDetail = {
  id: string;
  title: string;
  create_time: number;
  update_time: number;
  in_text_citations: string[];
  content: string;
  citation_candidates: string[];
  brief_description?: string;
};

export interface ICitation {
  abstract: string;
  contributors: Author[];
  advanced_info: AdvancedInfo;
  area: string[];
  article_title: string;
  authors?: Author[];
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
  current_coupon_code?: string;
  guidence?: string;
  continue_writing_task?: string;
  ai_copilot_task?: string;
  generate_tool_task?: string;
  citation_task?: string;
  tasks?: string;
  outline_tip_task?: string;
  continue_tip_task?: string;
  highlight_task?: string;
  grammar_task?: string;
  basic_task?: string;
  has_referral_code?: string;
  show_referral_dialog?: string;
  close_checkList?: string;
};

export type ReferenceType = 'mla' | 'apa' | 'ieee' | 'chicago';

export type UploadChatPdfResponse = {
  id: string;
  filename: string;
  size: number;
};

export interface ChatResponse {
  id: string;
  title: string;
  create_time: number;
  update_time: number;
  document_id: string;
  first_message: string;
}

export interface ResearchChatResponse {
  response: string;
  thread_id: string;
}
