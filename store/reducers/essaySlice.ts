/**
 * 用于跨页面传递essay
 */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type RootState } from '../store';

const initialUsageState = {} as { content: string };

export const essaySlice = createSlice({
  name: 'essay',
  initialState: initialUsageState,
  reducers: {
    setEssay: (_draft, action: PayloadAction<{ content: string }>) => {
      return action.payload;
    },
  },
});

export const { setEssay } = essaySlice.actions;

export const selectEssay = (state: RootState) => state.essay;

export default essaySlice.reducer;
