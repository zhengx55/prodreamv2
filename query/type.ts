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

export interface IBriansotrmReq {
  pro_mode: boolean;
  template_id: string;
  word_nums: string;
  texts: string[];
  types: string[];
  user_id: number;
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
  first_name?: string;
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
  institution_id?: string;
  /**
   * 不传该参数时，默认为英文版
   */
  language?: Language;
  /**
   * 用户所选系统下题目的ID。（2级）
   */
  prompt_id?: string;
  /**
   * 文书
   */
  text: string;
}

/**
 * 不传该参数时，默认为英文版
 */
export enum Language {
  Chinese = 'Chinese',
  English = 'English',
}

export interface SupportDetailData {
  id: string;
  prompts: Prompt[];
  title: string;
}

export interface Prompt {
  detail: string;
  id: string;
  title: string;
}

export interface IChatHistoryData {
  create_time: number;
  session_id: string;
  topic: string;
  func_type: 1 | 2;
}

export interface IChatSessionData {
  content: string;
  order: number;
  role: Role;
  status?: 'loading';
}

export enum Role {
  System = 'system',
  User = 'user',
}

export interface IChatRequest {
  /**
   * 1: 学校规划， 2： Max聊天
   */
  func_type: number;
  /**
   * 用户在聊天框输入的内容
   */
  query: string;
  /**
   * 如果是新创建的会话，请传空串
   */
  session_id: string;
}

export interface IGenerateActListParams {
  lengths: number[];
  mode: Mode;
  power_up: boolean;
  texts: string[];
}

export enum Mode {
  Generate = 'generate',
  Optimize = 'optimize',
}

export interface IActHistoryData {
  activities: ActivityHistory[];
  create_time: number;
  id: string;
  type: number;
  update_time: number;
}

export interface ActivityHistory {
  id: string;
  original_text: string;
  text: string;
  title: string;
}

export interface IActListResData {
  [key: string]: ActListData;
}
export interface ActData {
  result?: string;
  title: string;
  id: string;
  original_text?: string;
  text?: string;
}
export interface ActListData {
  activities: ActData[];
  id: string;
}

export interface INotificationData {
  content?: string;
  create_time?: string;
  has_read?: number;
  id?: number;
  notice_id?: number;
  title?: string;
  updete_time?: string;
  user_id?: number;
}

export interface IPolishParams {
  /**
   * 0: 全文, 1: 分段, 2:分句
   */
  granularity?: number;
  /**
   * 场景更换
   */
  scenario?: number;
  /**
   * 润色内容
   */
  text: string;
  /**
   * 更换语调
   */
  tone?: string | number;
  /**
   * 内容量控制
   */
  volume_control?: number;
  /**
   * 目标字数
   */
  volume_target?: number;
  instruction?: string | number;
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
  [property: string]: any;
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
