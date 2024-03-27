import { StateCreator } from 'zustand';

const initialState: UserTaskState = {
  task_step: -1,
  citation_step: 0,
  outline_step: 0,
  continue_step: 0,
  generate_step: 0,
  show_task_dialog: false,
};

type UserTaskState = {
  task_step: number;
  citation_step: number;
  outline_step: number;
  continue_step: number;
  generate_step: number;
  show_task_dialog: boolean;
};

type UserTaskAction = {
  updateTaskStep: (result: number) => void;
  updateCitationStep: () => void;
  resetCitationStep: () => void;
  updateOutlineStep: (result: number) => void;
  updateContinueStep: (result: number) => void;
  updateGenerateStep: (result: number) => void;
  updateShowTaskDialog: () => void;
};

export type UserTaskStore = UserTaskState & UserTaskAction;

export const useUserTaskStore: StateCreator<UserTaskStore> = (set, get) => ({
  ...initialState,
  updateShowTaskDialog: () =>
    set((state) => ({ show_task_dialog: !state.show_task_dialog })),
  updateGenerateStep: (result) => set({ generate_step: result }),
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
  updateContinueStep: (result) => set({ continue_step: result }),
});
