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
  from: string;
  last_name?: string;
  password: string;
  referral: string;
}
