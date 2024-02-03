import { StateCreator } from 'zustand';

const initialState: UserTaskState = {
  task_step: -1,
  citation_step: 1,
  continue_writing: false,
  generate_tool: false,
  ai_copilot: false,
  citation: false,
};

type UserTaskState = {
  task_step: number;
  citation_step: number;
  continue_writing: boolean;
  generate_tool: boolean;
  ai_copilot: boolean;
  citation: boolean;
};

type UserTaskAction = {
  updateTaskStep: (result: number) => void;
  updateCitationStep: () => void;
  updateCompletion: (
    result: 'continue_writing' | 'generate_tool' | 'ai_copilot' | 'citation'
  ) => void;
};

export type UserTaskStore = UserTaskState & UserTaskAction;

export const useUserTaskStore: StateCreator<UserTaskStore> = (set, get) => ({
  ...initialState,
  updateTaskStep: (result) => set({ task_step: result }),
  updateCitationStep: () =>
    set((state) => ({
      citation_step: state.citation_step + 1,
    })),

  updateCompletion: (result) =>
    set((state) => ({
      [result]: !state[result],
    })),
});
