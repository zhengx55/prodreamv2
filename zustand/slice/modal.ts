import { StateCreator } from 'zustand';

const initialState: ModalState = {
  feedbackModal: false,
};

type ModalState = {
  feedbackModal: boolean;
};

type ModalAction = {
  updateFeedbackModal: (result: ModalState['feedbackModal']) => void;
};

export type ModalStore = ModalState & ModalAction;

export const useModalStore: StateCreator<ModalStore> = (set, get) => ({
  ...initialState,
  updateFeedbackModal(result) {
    set({ feedbackModal: result });
  },
});
