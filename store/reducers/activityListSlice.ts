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
        ...draft,
        [action.payload.dataType]: {
          activities: draft[action.payload.dataType].activities.filter(
            (activity) => activity.id !== action.payload.dataId
          ),
          id: draft[action.payload.dataType].id,
        },
      };
      return filteredData;
    },
    updateActListItem: (
      draft,
      action: PayloadAction<{
        dataType: string;
        dataId: string;
        dataTitle: string;
        dataText: string;
      }>
    ) => {
      const updatedData: IActListResData = {
        ...draft,
        [action.payload.dataType]: {
          activities: draft[action.payload.dataType].activities.map(
            (activity) => {
              if (activity.id === action.payload.dataId) {
                return {
                  ...activity,
                  title: action.payload.dataTitle,
                  ...(activity.text !== undefined
                    ? { text: action.payload.dataText }
                    : { result: action.payload.dataText }),
                };
              }
              return activity;
            }
          ),
          id: draft[action.payload.dataType].id,
        },
      };
      return updatedData;
    },
  },
});
export const {
  setActListState,
  clearState,
  removeActListItem,
  updateActListItem,
} = activityListSlice.actions;
export const selectActList = (state: RootState) => state.activityList;
export default activityListSlice.reducer;
