import type {
  IActivityForm,
  ICompetitionForm,
  IEducationForm,
  IResearchForm,
  IResumeProfile,
  IWorkForm,
  Resume,
} from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { StateCreator } from 'zustand';

type ResumeWithoutProfile = Omit<Resume, 'profile'>;
type KeysWithoutProfile = keyof ResumeWithoutProfile;

type ResumeState = {
  profile: IResumeProfile;
  works: IWorkForm[];
  educations: IEducationForm[];
  activities: IActivityForm[];
  competitions: ICompetitionForm[];
  researches: IResearchForm[];
};

type ResumeAction = {
  addSectionInForm: (form: KeysWithoutProfile) => void;
  deleteSectionInFormByIdx: (form: KeysWithoutProfile, idx: number) => void;
  changeProfile: (field: keyof IResumeProfile, value: string) => void;
  changeWorkExperiences: (
    idx: number,
    field: keyof IWorkForm,
    value: string | string[]
  ) => void;
  changeEducations: (
    idx: number,
    field: keyof IEducationForm,
    value: string | string[]
  ) => void;
  changeCompetitions: (
    idx: number,
    field: keyof ICompetitionForm,
    value: string | string[]
  ) => void;
  changeResearches: (
    idx: number,
    field: keyof IResearchForm,
    value: string | string[]
  ) => void;
  changeActivities: (
    idx: number,
    field: keyof IActivityForm,
    value: string | string[]
  ) => void;
  setResume: (resume: Resume) => void;
  setEducations: (educations: IEducationForm[]) => void;
  setWorks: (works: IWorkForm[]) => void;
  setResearches: (researches: IResearchForm[]) => void;
  setActivities: (activities: IActivityForm[]) => void;
  setCompetitions: (competitions: ICompetitionForm[]) => void;
};

export const initialProfile: IResumeProfile = {
  lastname: '',
  firstname: '',
  email: '',
  linkedin: '',
  number: '',
  website: '',
  location: '',
};

export const initialWorks: IWorkForm = {
  id: uuidv4(),
  starts: '',
  ends: '',
  position: '',
  company: '',
  location: '',
  state: '',
  description: [],
  expand: 'expand',
};

export const initialEducations: IEducationForm = {
  id: uuidv4(),
  degree_name: '',
  starts: '',
  expand: 'expand',
  ends: '',
  school_name: '',
  location: '',
  state: '',
  areas_of_study: '',
  related_courses: '',
  additional_info: [],
};

export const initialResearches: IResearchForm = {
  id: uuidv4(),
  starts: '',
  ends: '',
  project: '',
  role: '',
  location: '',
  state: '',
  expand: 'expand',

  description: [],
};
export const initialCompetitions: ICompetitionForm = {
  id: uuidv4(),
  name: '',
  date: '',
  results: '',
  location: '',
  additional_info: [],
  expand: 'expand',
};
export const initialActivities: IActivityForm = {
  id: uuidv4(),
  starts: '',
  ends: '',
  responsibility: '',
  company: '',
  location: '',
  state: '',
  expand: 'expand',
  description: [],
};

export type ResumeStore = ResumeState & ResumeAction;

export const useResumeStore: StateCreator<ResumeStore> = (set) => ({
  profile: initialProfile,
  works: [initialWorks],
  educations: [initialEducations],
  activities: [initialActivities],
  competitions: [initialCompetitions],
  researches: [initialResearches],

  addSectionInForm: (form) => {
    set((state) => {
      const initialForm = eval(
        `initial${form.charAt(0).toUpperCase() + form.slice(1)}`
      );
      return {
        [form]: [
          ...state[form],
          {
            ...initialForm,
            id: uuidv4(),
            expand: 'collapse',
          },
        ],
      };
    });
  },

  deleteSectionInFormByIdx: (form, idx) => {
    set((state) => ({
      [form]: state[form].filter((_, index) => index !== idx),
    }));
  },

  changeProfile: (field, value) => {
    set((state) => ({ profile: { ...state.profile, [field]: value } }));
  },

  changeWorkExperiences: (idx, field, value) => {
    set((state) => {
      const works = [...state.works];
      works[idx] = { ...works[idx], [field]: value };
      return { works };
    });
  },

  changeEducations: (idx, field, value) => {
    set((state) => {
      const educations = [...state.educations];
      educations[idx] = { ...educations[idx], [field]: value };
      return { educations };
    });
  },

  changeCompetitions: (idx, field, value) => {
    set((state) => {
      const competitions = [...state.competitions];
      competitions[idx] = { ...competitions[idx], [field]: value };
      return { competitions };
    });
  },

  changeResearches: (idx, field, value) => {
    set((state) => {
      const researches = [...state.researches];
      researches[idx] = { ...researches[idx], [field]: value };
      return { researches };
    });
  },

  changeActivities: (idx, field, value) => {
    set((state) => {
      const activities = [...state.activities];
      activities[idx] = { ...activities[idx], [field]: value };
      return { activities };
    });
  },

  setResume: (resume) => set({ ...resume }),
  setEducations: (educations) => set({ educations }),
  setWorks: (works) => set({ works }),
  setResearches: (researches) => set({ researches }),
  setActivities: (activities) => set({ activities }),
  setCompetitions: (competitions) => set({ competitions }),
});
