export interface IBrainstormHistory {
  data: {
    template_id: string;
    create_time: string;
    question_ids: string[];
    answers: string[];
    result: string;
    word_num: string;
  }[];
}

export interface ISessionId {
  [key: string]: { session_id: string; step: number };
}

export type ChatPage =
  | 'startup'
  | 'informations'
  | 'introductions'
  | 'chatPanel';

export interface IChatMessage {
  from: 'mine' | 'robot';
  message: string;
}

export interface IChatMesssageList {
  [key: string]: IPreExpMessageList;
}

export interface IPreExpMessageList {
  [key: string]: {
    title: string;
    message: IChatMessage[];
  };
}

export interface IBrainStormSection {
  id: string;
  name: string;
  description: string;
  tag: string[];
  icon: string;
  rearrange: number;
  word_range: any[];
  has_pro: boolean;
  template_class: string;
  price: number;
  practice_experience_id: string;
  start_style: boolean;
  modules: Module[];
}

export interface Module {
  id: string;
  name: string;
  description: string;
  multiple: number;
  optional: number;
  question: Question[];
}

export interface Question {
  id: string;
  text: string;
  notice: string;
  example: string;
  answer_template: string;
  optional: number;
}

export interface LoginResponse {
  code: number;
  data: LoginData;
  msg: string;
  [property: string]: any;
}

export interface LoginData {
  access_token: string;
  avatar: string;
  email: string;
  first_name: string;
  group_id: number;
  is_verified: boolean;
  last_name: string;
  linked_google: boolean;
  no_password: boolean;
  role: string;
  traffic: string;
  user_id: number;
}

export interface ISigunUpRequest {
  email: string;
  first_name: string;
  from?: string;
  last_name?: string;
  password: string;
  referral?: string;
}

export interface IResetParams {
  email: string;
  password: string;
  confirm: string;
}

export interface IVerifyEmail {
  email: string;
  type: '1' | '0';
  code: string;
}

export interface IOptRequest {
  /**
   * 希望优化到的字数
   */
  lengths: number[];
  text: string;
}

export interface IActivityHistoryResponse {
  code: number;
  data: Datum[];
  msg: string;
  [property: string]: any;
}

export interface Datum {
  /**
   * UTC时间戳
   */
  create_time?: number;
  lengths?: number[];
  result?: Result[];
  text?: string;
  [property: string]: any;
}

interface Result {
  actual_length: number;
  result: string;
  target: number;
  [property: string]: any;
}

export interface IEssayAssessRequest {
  /**
   * 通常该值为False，只有当第一次报10x的错后，用户确认继续再传True，这样会跳过问题检测，直接评估
   */
  direct?: boolean;
  /**
   * 用户所选Institution的ID(1级）
   */
  institution_id: string;
  /**
   * 不传该参数时，默认为英文版
   */
  language: Language;
  /**
   * 用户所选系统下题目的ID。（2级）
   */
  prompt_id: string;
  /**
   * 文书
   */
  text: string;
  [property: string]: any;
}

/**
 * 不传该参数时，默认为英文版
 */
export enum Language {
  Chinese = 'Chinese',
  English = 'English',
}

export interface IessayAssessData {
  detail: Detail[];
  head: string;
  /**
   * report id, 点赞/踩时可用
   */
  id: string;
  score: string;
  [property: string]: any;
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
  [property: string]: any;
}

export interface Comment {
  evaluation: string;
  example: string;
  suggestion: string;
  [property: string]: any;
}

export interface SupportDetailData {
  id: string;
  prompts: Prompt[];
  title: string;
  [property: string]: any;
}

export interface Prompt {
  detail: string;
  id: string;
  title: string;
  [property: string]: any;
}

export interface IChatHistoryData {
  create_time: number;
  session_id: string;
  topic: string;
  fun_type: 1 | 2;
}

export interface IChatSessionData {
  message: string;
  order: number;
  role: Role;
}

export enum Role {
  System = 'system',
  User = 'user',
}
