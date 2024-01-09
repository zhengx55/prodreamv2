import { IActListResData } from '@/query/type';
import { Draft, produce } from 'immer';
import { StateCreator } from 'zustand';

export type ActivityListStore = {
  alhistoryData: IActListResData;
  setalHistoryData: (data: IActListResData) => void;
  algeneratedData: IActListResData;
  setalGeneratedData: (data: IActListResData) => void;
  handlealDelete: (
    id: string,
    type: string,
    dataType: 'generated' | 'history'
  ) => void;
  handlealSave: (
    id: string,
    title: string,
    text: string,
    type: string,
    dataType: 'generated' | 'history'
  ) => void;
  showalGenerateTut: boolean;
  setShowalGenerateTut: (value: boolean) => void;
  showalEditTut: boolean;
  setShowalEditTut: (value: boolean) => void;
  clearalData: () => void;
};

export const useActListStore: StateCreator<ActivityListStore> = (set) => ({
  alhistoryData: {},
  setalHistoryData: (data) => set({ alhistoryData: data }),
  algeneratedData: {},
  setalGeneratedData: (data) => set({ algeneratedData: data }),
  handlealDelete: (id, type, dataType) => {
    set((state) =>
      produce(state, (draft: Draft<ActivityListStore>) => {
        const data =
          dataType === 'generated'
            ? draft.algeneratedData
            : draft.alhistoryData;
        data[type].activities = data[type].activities.filter(
          (activity) => activity.id !== id
        );
      })
    );
  },
  handlealSave: (id, title, text, type, dataType) => {
    set((state) =>
      produce(state, (draft: Draft<ActivityListStore>) => {
        const data =
          dataType === 'generated'
            ? draft.algeneratedData
            : draft.alhistoryData;
        const activities = data[type].activities;
        const index = activities.findIndex((activity) => activity.id === id);

        if (index !== -1) {
          activities[index] = {
            ...activities[index],
            title,
            result: dataType === 'generated' ? text : text,
          };
        }
      })
    );
  },
  showalGenerateTut: false,
  setShowalGenerateTut: (value) => set({ showalGenerateTut: value }),
  showalEditTut: false,
  setShowalEditTut: (value) => set({ showalEditTut: value }),
  clearalData: () =>
    set({
      alhistoryData: {},
      algeneratedData: {},
    }),
});
