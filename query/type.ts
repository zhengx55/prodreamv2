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
  /**
   * 是否已进行过邮箱验证
   */
  is_verified: boolean;
  last_name: string;
  /**
   * 是否已使用google登录过
   */
  linked_google: boolean;
  /**
   * 是（显示创建密码）否（显示重置密码）
   */
  no_password: boolean;
  role: string;
  traffic: string;
  user_id: number;
  [property: string]: any;
}
