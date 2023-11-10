import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { IBrainStormHistoryState } from '@/types';

/**
 * 用于存储history部分数据进行跨组件调用
 */
const initialBrainStormState: IBrainStormHistoryState = {
  template_id: '',
  result: '',
  questionAnswerPair: {},
};

export const brainStormHistorySlice = createSlice({
  name: 'brainstorm',
  initialState: initialBrainStormState,
  reducers: {
    setBrainstormHistoryHistory: (
      _draft,
      action: PayloadAction<IBrainStormHistoryState>
    ) => {
      return action.payload;
    },
    clearHistory: () => {
      return { template_id: '', result: '', questionAnswerPair: {} };
    },
  },
});

export const { clearHistory, setBrainstormHistoryHistory } =
  brainStormHistorySlice.actions;

export const selectBrainStormHistory = (state: RootState) =>
  state.brainStormHistory;
export default brainStormHistorySlice.reducer;
