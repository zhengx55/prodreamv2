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

export interface IEducationForm {
  id: string;
  starts: Date | string;
  ends: Date | string;
  school_name: string;
  degree_name: string;
  location: string;
  state: string;
  areas_of_study: string;
  related_courses: string;
  additional_info: string;
}

export interface IWorkForm {
  starts: Date;
  ends: Date;
  position: string;
  company: string;
  location: string;
  state: string;
  description: string;
}

export interface IResearchForm {
  project: string;
  role: string;
  ends: Date;
  school_name: string;
  degree_name: string;
  location: string;
  state: string;
  supervisor?: string;
  description: string;
}

export interface ICompetitionForm {
  name: string;
  date: Date;
  results: string;
  degree_name: string;
  location: string;
  additional: string;
}
export interface IActivityForm {
  starts: Date;
  ends: Date;
  responsibility: string;
  company: string;
  location: string;
  state: string;
  description: string;
}

export interface ISkillsForm {
  skills: string;
}
