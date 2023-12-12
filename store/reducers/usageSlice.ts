/**
 * 用于储存用户使用信息
 */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type RootState } from '../store';
import { IUsage } from '@/types';

const initialUsageState: IUsage = {
  first_editior: true,
  first_brainstorm: true,
  first_resume: true,
  first_activity_list: true,
};

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
