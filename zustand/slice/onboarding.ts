import { StateCreator } from 'zustand';

const initialState: OnboardingState = {
  currentQuestionIndex: 0,
  questionTwoAnswers: [],
  questionThreeAnswers: [],
  name: '',
  selectedAssistant: '',
};

type OnboardingState = {
  currentQuestionIndex: number;
  questionTwoAnswers: string[];
  questionThreeAnswers: string[];
  name: string;
  selectedAssistant: string;
};

type OnboardingAction = {
  setName: (name: OnboardingState['name']) => void;
  setCurrentQuestionIndex: (
    index: OnboardingState['currentQuestionIndex']
  ) => void;
  addQuestionTwoAnswer: (
    answer: OnboardingState['questionTwoAnswers'][number]
  ) => void;
  removeQuestionTwoAnswer: (
    answer: OnboardingState['questionTwoAnswers'][number]
  ) => void;
  addQuestionThreeAnswer: (
    answer: OnboardingState['questionThreeAnswers'][number]
  ) => void;
  removeQuestionThreeAnswer: (
    answer: OnboardingState['questionThreeAnswers'][number]
  ) => void;
  setSelectedAssistant: (
    assistant: OnboardingState['selectedAssistant']
  ) => void;
};

export type OnboardingStore = OnboardingState & OnboardingAction;

export const useOnboardingStore: StateCreator<OnboardingStore> = (set) => ({
  ...initialState,
  setName: (name) => set({ name }),
  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
  addQuestionTwoAnswer: (answer) =>
    set((state) => ({
      questionTwoAnswers: [...state.questionTwoAnswers, answer],
    })),
  removeQuestionTwoAnswer: (answer) =>
    set((state) => ({
      questionTwoAnswers: state.questionTwoAnswers.filter((a) => a !== answer),
    })),
  addQuestionThreeAnswer: (answer) =>
    set((state) => ({
      questionThreeAnswers: [...state.questionThreeAnswers, answer],
    })),
  removeQuestionThreeAnswer: (answer) =>
    set((state) => ({
      questionThreeAnswers: state.questionThreeAnswers.filter(
        (a) => a !== answer
      ),
    })),
  setSelectedAssistant: (assistant) => set({ selectedAssistant: assistant }),
});
