import { StateCreator } from 'zustand';

const initialState: UserTaskState = {
  task_step: -1,
  citation_step: 0,
  outline_step: 0,
};

type UserTaskState = {
  task_step: number;
  citation_step: number;
  outline_step: number;
};

type UserTaskAction = {
  updateTaskStep: (result: number) => void;
  updateCitationStep: () => void;
  resetCitationStep: () => void;
  updateOutlineStep: (result: number) => void;
};

export type UserTaskStore = UserTaskState & UserTaskAction;

export const useUserTaskStore: StateCreator<UserTaskStore> = (set, get) => ({
  ...initialState,
  updateTaskStep: (result) => set({ task_step: result }),
  updateCitationStep: () =>
    set((state) => ({
      citation_step: state.citation_step + 1,
    })),
  resetCitationStep: () =>
    set(() => ({
      citation_step: 0,
    })),
  updateOutlineStep: (result) => set({ outline_step: result }),
});
