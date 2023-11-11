/**
 * 用于从brainsorm跨组件给outputpanel设置text内容
 */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { IEssay } from '@/types';

const initialEssayState: IEssay = {
  task_id: '',
};

export const essaySlice = createSlice({
  name: 'essage',
  initialState: initialEssayState,
  reducers: {
    setTaskId: (draft, action: PayloadAction<string>) => {
      draft.task_id = action.payload;
    },
    clearEssay: () => {
      return initialEssayState;
    },
  },
});

export const { setTaskId, clearEssay } = essaySlice.actions;
export const selectEssay = (state: RootState) => state.essay;
export const selectTaskId = (state: RootState) => state.essay.task_id;
export default essaySlice.reducer;
