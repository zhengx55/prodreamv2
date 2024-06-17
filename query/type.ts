import { AIResearchMessageRef } from '@/types';
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

export interface ILoginWithPhoneNumberAndPasswordCN {
  emailOrPhone: string;
  password: string;
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
  abstract: null;
  advanced_info: AdvancedInfo;
  area: null;
  article_title: string;
  contributors: [
    {
      first_name: string;
      last_name: string;
      middle_name: string;
      role: string;
      suffix: string;
    },
  ];
  authors: Author[];
  bibtex: null;
  citation_count: number;
  citation_id: string;
  doi: null;
  influential_citation_count: null;
  journal_title: null;
  page_info: PageInfo;
  pdf_url: string;
  publication: string;
  publish_date: PublishDate;
  publisher: null;
  reference_count: null;
  snippet: string;
  tldr: null;
}

interface AdvancedInfo {
  issue: null;
  series: string | null;
  volume: null | string;
}

interface Author {
  first_name: string;
  last_name: string;
  middle_name: string;
  role: string;
  suffix: string;
}

interface AdvancedInfo {
  issue: null;
  series: string | null;
  volume: null | string;
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
  notification_read?: string;
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
  first_response: string;
}

export interface ResearchChatResponse {
  response: string;
  thread_id: string;
}

export type AiResearchItemResponse = {
  id: string;
  user_id: string;
  title: string;
  create_time: number;
  update_time: number;
  history: ItemHistory[];
  _history: [string, string][];
  attachments: any[];
  document_id: string;
};

interface ItemHistory {
  role: 'user' | 'assistant';
  content: string;
  create_time: number;
  id: string;
  attachment: null;
  contexts: AIResearchMessageRef[] | null;
  feedback: null;
  favorite: boolean;
}
