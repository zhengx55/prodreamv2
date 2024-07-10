import { StateCreator } from 'zustand';

const initialState: OnboardingState = {
  currentQuestionIndex: 0,
  answers: [],
  name: '',
};

type OnboardingState = {
  currentQuestionIndex: number;
  answers: string[];
  name: string;
};

type OnboardingAction = {
    setName: (name: OnboardingState['name']) => void;
    setCurrentQuestionIndex: (index: OnboardingState['currentQuestionIndex']) => void;
    addAnswer: (answer: OnboardingState['answers'][number]) => void;
    removeAnswer: (answer: OnboardingState['answers'][number]) => void;
};

export type OnboardingStore = OnboardingState & OnboardingAction;

export const useOnboardingStore: StateCreator<OnboardingStore> = (set) => ({
  ...initialState,
  setName: (name) => set({ name }),
  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
  addAnswer: (answer) => set((state) => ({ answers: [...state.answers, answer] })),
  removeAnswer: (answer) => set((state) => ({ answers: state.answers.filter(a => a !== answer) })),
});