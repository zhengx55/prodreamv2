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
  [key: string]: ISessionMesssageList;
}

export interface ISessionMesssageList {
  [key: string]: IChatMessage[];
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
