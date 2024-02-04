import { updateUserInfo } from '@/query/api';
import { StateCreator } from 'zustand';

const initialState: UserTaskState = {
  task_step: -1,
  citation_step: 0,
  continue_writing: false,
  generate_tool: false,
  ai_copilot: false,
  citation: false,
  shouldShowGuidence: false,
  shouldShowTasks: false,
};

type UserTaskState = {
  task_step: number;
  citation_step: number;
  continue_writing: boolean;
  generate_tool: boolean;
  ai_copilot: boolean;
  citation: boolean;
  shouldShowGuidence: boolean;
  shouldShowTasks: boolean;
};

type UserTaskAction = {
  updateTaskStep: (result: number) => void;
  updateCitationStep: () => void;
  updateCompletion: (
    result: 'continue_writing' | 'generate_tool' | 'ai_copilot' | 'citation'
  ) => void;
  updateShowTask: () => Promise<void>;
  updateShowGuidence: () => Promise<void>;
};

export type UserTaskStore = UserTaskState & UserTaskAction;

export const useUserTaskStore: StateCreator<UserTaskStore> = (set, get) => ({
  ...initialState,
  updateShowGuidence: async () => {
    if (get().shouldShowTasks)
      await updateUserInfo({
        guidence: true,
      });
    set((state) => ({
      shouldShowGuidence: !state.shouldShowGuidence,
    }));
  },
  updateShowTask: async () => {
    if (get().shouldShowTasks)
      await updateUserInfo({
        guidence: true,
      });
    set((state) => ({
      shouldShowTasks: !state.shouldShowTasks,
    }));
  },
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
