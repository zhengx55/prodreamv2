/**
 * 用于储存用户使用信息
 */
import { IUsage } from '@/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type RootState } from '../store';

const initialUsageState = {
  first_editior: false,
  first_brainstorm: false,
  first_resume: false,
  first_activity_list: false,
  first_activity_list_upload: false,
  first_activity_list_generate: false,
  first_activity_list_edit: false,
} as IUsage;

export const usageSlice = createSlice({
  name: 'usage',
  initialState: initialUsageState,
  reducers: {
    setUsage: (_draft, action: PayloadAction<IUsage>) => {
      return action.payload;
    },
    setSingleUsage: (draft, action: PayloadAction<keyof IUsage>) => {
      return { ...draft, [action.payload]: false };
    },
  },
});

export const { setUsage, setSingleUsage } = usageSlice.actions;

export const selectUsage = (state: RootState) => state.usage;

export default usageSlice.reducer;
