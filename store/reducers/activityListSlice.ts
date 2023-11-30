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
    removeActListItem: (
      draft,
      action: PayloadAction<{ dataType: string; dataId: string }>
    ) => {
      const filteredData: IActListResData = {
        [action.payload.dataType]: {
          activities: draft[action.payload.dataType].activities.filter(
            (activity) => activity.id !== action.payload.dataId
          ),
          id: draft[action.payload.dataType].id,
        },
      };
      return filteredData;
    },
  },
});
export const { setActListState, clearState, removeActListItem } =
  activityListSlice.actions;
export const selectActList = (state: RootState) => state.activityList;
export default activityListSlice.reducer;
