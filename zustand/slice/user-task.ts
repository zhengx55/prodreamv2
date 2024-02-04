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
    result: 'continue_writing' | 'generate_tool' | 'ai_copilot' | 'citation',
    status: boolean
  ) => Promise<void>;
  updateShowTask: (result: boolean) => Promise<void>;
  updateShowGuidence: (result: boolean) => Promise<void>;
};

export type UserTaskStore = UserTaskState & UserTaskAction;

export const useUserTaskStore: StateCreator<UserTaskStore> = (set, get) => ({
  ...initialState,
  updateShowGuidence: async (result) => {
    if (result === false)
      await updateUserInfo({
        field: 'guidence',
        data: true,
      });
    set((state) => ({
      shouldShowGuidence: result,
    }));
  },
  updateShowTask: async (result) => {
    if (result === false)
      await updateUserInfo({
        field: 'tasks',
        data: true,
      });
    set(() => ({
      shouldShowTasks: result,
    }));
  },
  updateTaskStep: (result) => set({ task_step: result }),
  updateCitationStep: () =>
    set((state) => ({
      citation_step: state.citation_step + 1,
    })),

  updateCompletion: async (result, status) => {
    const { citation, generate_tool, continue_writing, ai_copilot } = get();
    if (result === 'ai_copilot') {
      if (!ai_copilot && generate_tool && continue_writing && citation) {
        await updateUserInfo({
          field: 'tasks',
          data: true,
        });
        set(() => ({
          shouldShowTasks: false,
        }));
      } else {
        set(() => ({
          [result]: status,
        }));
      }
    } else if (result === 'citation') {
      if (ai_copilot && generate_tool && continue_writing && !citation) {
        await updateUserInfo({
          field: 'tasks',
          data: true,
        });
        set(() => ({
          shouldShowTasks: false,
        }));
      } else {
        set(() => ({
          [result]: status,
        }));
      }
    } else if (result === 'generate_tool') {
      if (ai_copilot && !generate_tool && continue_writing && citation) {
        await updateUserInfo({
          field: 'tasks',
          data: true,
        });
        set(() => ({
          shouldShowTasks: false,
        }));
      } else {
        set(() => ({
          [result]: status,
        }));
      }
    } else {
      if (ai_copilot && generate_tool && !continue_writing && citation) {
        await updateUserInfo({
          field: 'tasks',
          data: true,
        });
        set(() => ({
          shouldShowTasks: false,
        }));
      } else {
        set(() => ({
          [result]: status,
        }));
      }
    }
  },
});
