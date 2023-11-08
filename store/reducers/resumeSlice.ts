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
  description: '',
};

export const initialEducation: IEducationForm = {
  id: uuidv4(),
  degree_name: '',
  starts: '',
  ends: '',
  school_name: '',
  location: '',
  state: '',
  areas_of_study: '',
  related_courses: '',
  additional_info: '',
};

export const initialResearch: IResearchForm = {
  id: uuidv4(),
  starts: '',
  ends: '',
  project: '',
  role: '',
  location: '',
  state: '',
  description: '',
};
export const initialCompetition: ICompetitionForm = {
  id: uuidv4(),
  name: '',
  date: '',
  results: '',
  degree_name: '',
  location: '',
  additional: '',
};
export const initialActivity: IActivityForm = {
  id: uuidv4(),
  starts: '',
  ends: '',
  responsibility: '',
  company: '',
  location: '',
  state: '',
  description: '',
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

// Keep the field & value type in sync with CreateHandleChangeArgsWithDescriptions (components\ResumeForm\types.ts)
// export type CreateChangeActionWithDescriptions<T> = {
//   idx: number;
// } & (
//   | {
//       field: Exclude<keyof T, 'descriptions'>;
//       value: string;
//     }
//   | { field: 'descriptions'; value: string[] }
// );

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
      action: PayloadAction<{
        field: keyof IWorkForm;
        value: string;
        idx: number;
      }>
    ) => {
      const { idx, field, value } = action.payload;
      const workExperience = draft.works[idx];
      workExperience[field] = value as any;
    },

    changeEducations: (
      draft,
      action: PayloadAction<{
        field: keyof IEducationForm;
        value: string;
        idx: number;
      }>
    ) => {
      const { idx, field, value } = action.payload;
      const education = draft.educations[idx];
      education[field] = value as any;
    },

    changeCompetitions: (
      draft,
      action: PayloadAction<{
        field: keyof ICompetitionForm;
        value: string;
        idx: number;
      }>
    ) => {
      const { idx, field, value } = action.payload;
      const competition = draft.competitions[idx];
      competition[field] = value as any;
    },

    changeResearches: (
      draft,
      action: PayloadAction<{
        field: keyof IResearchForm;
        value: string;
        idx: number;
      }>
    ) => {
      const { idx, field, value } = action.payload;
      const research = draft.researches[idx];
      research[field] = value as any;
    },

    changeActivities: (
      draft,
      action: PayloadAction<{
        field: keyof IActivityForm;
        value: string;
        idx: number;
      }>
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
            structuredClone({ ...initialWorkExperience, id: uuidv4() })
          );
          return draft;
        }
        case 'educations': {
          draft.educations.push(
            structuredClone({ ...initialEducation, id: uuidv4() })
          );
          return draft;
        }
        case 'researches': {
          draft.researches.push(
            structuredClone({ ...initialResearch, id: uuidv4() })
          );
          return draft;
        }
        case 'activities': {
          draft.activities.push(
            structuredClone({ ...initialActivity, id: uuidv4() })
          );
          return draft;
        }
        case 'competitions': {
          draft.competitions.push(
            structuredClone({ ...initialCompetition, id: uuidv4() })
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
  },
});

export const {
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
