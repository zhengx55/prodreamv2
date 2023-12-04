export interface IBrainsotrmCard {
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
}

export interface IBrainStormHistoryState {
  template_id: string;
  result: string;
  questionAnswerPair: Record<string, string>;
}

export type CreateHandleChangeArgsWithDescription<T> =
  | [field: Exclude<keyof T, 'description'>, value: string]
  | [field: 'description', value: string[]];

export type CreateHandleChangeArgsWithAdditional<T> =
  | [field: Exclude<keyof T, 'additional_info'>, value: string]
  | [field: 'additional_info', value: string[]];

export interface Resume {
  profile: IResumeProfile;
  educations: IEducationForm[];
  works: IWorkForm[];
  researches: IResearchForm[];
  competitions: ICompetitionForm[];
  activities: IActivityForm[];
}

export type ResumeKey = keyof Resume;

export interface IResumeProfile {
  lastname: string;
  firstname: string;
  email: string;
  number: string;
  linkedin: string;
  website?: string;
  location: string;
}

export interface IEducationForm {
  id: string;
  starts: string;
  ends: string;
  expand: 'expand' | 'collapse';
  school_name: string;
  degree_name: string;
  location: string;
  state: string;
  areas_of_study: string;
  related_courses: string;
  additional_info: string[];
}

export interface IWorkForm {
  id: string;
  starts: string;
  ends: string;
  expand: 'expand' | 'collapse';
  position: string;
  company: string;
  location: string;
  state: string;
  description: string[];
}

export interface IResearchForm {
  id: string;
  starts: string;
  ends: string;
  expand: 'expand' | 'collapse';
  project: string;
  role: string;
  location: string;
  state: string;
  supervisor?: string;
  description: string[];
}

export interface ICompetitionForm {
  id: string;
  name: string;
  date: string;
  results: string;
  expand: 'expand' | 'collapse';
  location: string;
  additional_info: string[];
}
export interface IActivityForm {
  id: string;
  starts: string;
  ends: string;
  responsibility: string;
  company: string;
  expand: 'expand' | 'collapse';
  location: string;
  state: string;
  description: string[];
}

export interface ISkillsForm {
  skills: string;
}

export interface AnswerRequestParam {
  /**
   * 填表的结果
   */
  formQuestionAnswer: FormAnswer[];
  /**
   * 用户输入
   */
  message: string;
  /**
   * 该模版前面几个问题引导时的session_id
   */
  previousSessionids: string[];
  /**
   * 问题id
   */
  questionid: string;
  /**
   * 新开始一次会话时传null
   */
  sessionid: string | null;
  /**
   * 模版id
   */
  templateid: string;
  [property: string]: any;
}

export interface FormQuestionResponse {
  /**
   * 不进行引导，而是让用户直接填答案的问题
   */
  form_question: FormQuestion[];
  /**
   * 有序数组，需要按顺序对问题进行引导
   */
  questions: Question[];
  [property: string]: any;
}

/**
 * 第一个是问题名，第二个是id
 */
export interface FormQuestion {
  question: string;
  question_id: string;
  [property: string]: any;
}

export interface FormAnswer {
  answer: string;
  question_id: string;
  [property: string]: any;
}

export interface Question {
  /**
   * 问题
   */
  question: string;
  /**
   * 问题id
   */
  question_id: string;
  /**
   * 欢迎语
   */
  welcome: string;
  [property: string]: any;
}
