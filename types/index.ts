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
