import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import {
  IActivityForm,
  ICompetitionForm,
  IEducationForm,
  IResearchForm,
  IResumeProfile,
  IWorkForm,
  Resume,
} from '@/types';
import { v4 as uuidv4 } from 'uuid';

export const initialProfile: IResumeProfile = {
  lastname: '',
  firstname: '',
  email: '',
  linkedin: '',
  number: '',
  website: '',
  location: '',
};

export const initialWorkExperience: IWorkForm = {
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

export const initialEducation: IEducationForm = {
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

export const initialResearch: IResearchForm = {
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
export const initialCompetition: ICompetitionForm = {
  id: uuidv4(),
  name: '',
  date: '',
  results: '',
  location: '',
  additional_info: [],
  expand: 'expand',
};
export const initialActivity: IActivityForm = {
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

// export const initialFeaturedSkill: FeaturedSkill = { skill: '', rating: 4 };
// export const initialFeaturedSkills: FeaturedSkill[] = Array(6).fill({
//   ...initialFeaturedSkill,
// });
// export const initialSkills: ResumeSkills = {
//   featuredSkills: initialFeaturedSkills,
//   descriptions: [],
// };

export const initialCustom = {
  descriptions: [],
};

type FormType = keyof Resume;

export const initialResumeState: Resume = {
  profile: initialProfile,
  works: [initialWorkExperience],
  educations: [initialEducation],
  activities: [initialActivity],
  competitions: [initialCompetition],
  researches: [initialResearch],
};

/**
 * 用来处理包含textarea bullet point的数据管理
 */
export type CreateChangeActionWithDescriptions<T> = {
  idx: number;
} & (
  | {
      field: Exclude<keyof T, 'description'>;
      value: string;
    }
  | { field: 'description'; value: string[] }
);

export type CreateChangeActionWithAdditional<T> = {
  idx: number;
} & (
  | {
      field: Exclude<keyof T, 'additional_info'>;
      value: string;
    }
  | { field: 'additional_info'; value: string[] }
);

export const resumeSlice = createSlice({
  name: 'resume',
  initialState: initialResumeState,
  reducers: {
    changeProfile: (
      draft,
      action: PayloadAction<{ field: keyof IResumeProfile; value: string }>
    ) => {
      const { field, value } = action.payload;
      draft.profile[field] = value;
    },
    changeWorkExperiences: (
      draft,
      action: PayloadAction<CreateChangeActionWithDescriptions<IWorkForm>>
    ) => {
      const { idx, field, value } = action.payload;
      const workExperience = draft.works[idx];
      workExperience[field] = value as any;
    },

    changeEducations: (
      draft,
      action: PayloadAction<CreateChangeActionWithAdditional<IEducationForm>>
    ) => {
      const { idx, field, value } = action.payload;
      const education = draft.educations[idx];
      education[field] = value as any;
    },

    changeCompetitions: (
      draft,
      action: PayloadAction<CreateChangeActionWithAdditional<ICompetitionForm>>
    ) => {
      const { idx, field, value } = action.payload;
      const competition = draft.competitions[idx];
      competition[field] = value as any;
    },

    changeResearches: (
      draft,
      action: PayloadAction<CreateChangeActionWithDescriptions<IResearchForm>>
    ) => {
      const { idx, field, value } = action.payload;
      const research = draft.researches[idx];
      research[field] = value as any;
    },

    changeActivities: (
      draft,
      action: PayloadAction<CreateChangeActionWithDescriptions<IActivityForm>>
    ) => {
      const { idx, field, value } = action.payload;
      const activity = draft.activities[idx];
      activity[field] = value as any;
    },

    addSectionInForm: (draft, action: PayloadAction<{ form: FormType }>) => {
      const { form } = action.payload;
      switch (form) {
        case 'works': {
          draft.works.push(
            structuredClone({
              ...initialWorkExperience,
              id: uuidv4(),
              expand: 'collapse',
            })
          );
          return draft;
        }
        case 'educations': {
          draft.educations.push(
            structuredClone({
              ...initialEducation,
              id: uuidv4(),
              expand: 'collapse',
            })
          );
          return draft;
        }
        case 'researches': {
          draft.researches.push(
            structuredClone({
              ...initialResearch,
              id: uuidv4(),
              expand: 'collapse',
            })
          );
          return draft;
        }
        case 'activities': {
          draft.activities.push(
            structuredClone({
              ...initialActivity,
              id: uuidv4(),
              expand: 'collapse',
            })
          );
          return draft;
        }
        case 'competitions': {
          draft.competitions.push(
            structuredClone({
              ...initialCompetition,
              id: uuidv4(),
              expand: 'collapse',
            })
          );
          return draft;
        }
      }
    },

    deleteSectionInFormByIdx: (
      draft,
      action: PayloadAction<{ form: FormType; idx: number }>
    ) => {
      const { form, idx } = action.payload;
      if (form !== 'profile') draft[form].splice(idx, 1);
    },

    setResume: (draft, action: PayloadAction<Resume>) => {
      return action.payload;
    },
    setEducations: (draft, action: PayloadAction<IEducationForm[]>) => {
      draft.educations = action.payload;
    },
    setWorks: (draft, action: PayloadAction<IWorkForm[]>) => {
      draft.works = action.payload;
    },
    setResearches: (draft, action: PayloadAction<IResearchForm[]>) => {
      draft.researches = action.payload;
    },
    setActivities: (draft, action: PayloadAction<IActivityForm[]>) => {
      draft.activities = action.payload;
    },
    setCompetitions: (draft, action: PayloadAction<ICompetitionForm[]>) => {
      draft.competitions = action.payload;
    },
  },
});

export const {
  setEducations,
  setWorks,
  setResearches,
  setActivities,
  setCompetitions,
  changeProfile,
  changeWorkExperiences,
  changeEducations,
  changeResearches,
  changeActivities,
  deleteSectionInFormByIdx,
  addSectionInForm,
  changeCompetitions,
  setResume,
} = resumeSlice.actions;

export const selectResume = (state: RootState) => state.resume;
export const selectProfile = (state: RootState) => state.resume.profile;
export const selectWorkExperiences = (state: RootState) => state.resume.works;
export const selectEducations = (state: RootState) => state.resume.educations;
export const selectResearches = (state: RootState) => state.resume.researches;
export const selectActivities = (state: RootState) => state.resume.activities;
export const selectCompetitions = (state: RootState) =>
  state.resume.competitions;

export default resumeSlice.reducer;
