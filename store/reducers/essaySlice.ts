/**
 * 用于从brainsorm跨组件给outputpanel设置text内容
 */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { IEssay } from '@/types';

const initialEssayState: IEssay = {
  template_id: '',
  result: '',
};

export const essaySlice = createSlice({
  name: 'essage',
  initialState: initialEssayState,
  reducers: {
    setEssay: (_draft, action: PayloadAction<IEssay>) => {
      return action.payload;
    },
    clearEssay: () => {
      return { template_id: '', result: '' };
    },
  },
});

export const { setEssay, clearEssay } = essaySlice.actions;
export const selectEssay = (state: RootState) => state.essay;
export default essaySlice.reducer;
