import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { IActListResData } from '@/query/type';

const initialActivityListState: IActListResData = {} as any;

export const activityListSlice = createSlice({
  name: 'activityList',
  initialState: initialActivityListState,
  reducers: {
    setActListState: (_draft, action: PayloadAction<IActListResData>) => {
      return action.payload;
    },
    clearState: () => {
      return initialActivityListState;
    },
  },
});
export const { setActListState, clearState } = activityListSlice.actions;
export const selectActList = (state: RootState) => state.activityList;
export default activityListSlice.reducer;
