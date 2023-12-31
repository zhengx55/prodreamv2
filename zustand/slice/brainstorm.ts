import { StateCreator } from 'zustand';
import {
  InputProps as BrainStormInput,
  IBrainStormHistoryState,
} from '../../types/index';

type BrianStormState = {
  bshistoryData: IBrainStormHistoryState;
  bsisSubmiting: boolean;
  bssubmitError: string;
  bseassyResult: string;
  bsstartTyping: boolean;
  bstutorial: Record<string, BrainStormInput>;
};

const initialState: BrianStormState = {
  bshistoryData: { template_id: '', result: '', questionAnswerPair: {} },
  bsisSubmiting: false,
  bsstartTyping: false,
  bseassyResult: '',
  bssubmitError: '',
  bstutorial: {},
};

type BrianStormAction = {
  updatebsHistoryData: (result: BrianStormState['bshistoryData']) => void;
  updatebsIsSubmiting: (result: boolean) => void;
  updatebsSubmitError: (result: string) => void;
  updatebsEassyResult: (result: string) => void;
  updatebsStartTyping: (result: boolean) => void;
  updatebsTutorial: (result: BrianStormState['bstutorial']) => void;
  resetbsHistoryData: () => void;
  resetbsData: () => void;
};

export type BrainstormStore = BrianStormState & BrianStormAction;

export const useBrainStorm: StateCreator<BrainstormStore> = (set) => ({
  ...initialState,
  updatebsEassyResult: (result) =>
    set(() => ({
      bseassyResult: result,
    })),
  updatebsIsSubmiting: (result) =>
    set(() => ({
      bsisSubmiting: result,
    })),
  updatebsStartTyping: (result) =>
    set(() => ({
      bsstartTyping: result,
    })),
  updatebsHistoryData: (result) =>
    set(() => ({
      bshistoryData: result,
    })),
  updatebsTutorial: (result) =>
    set(() => ({
      bstutorial: result,
    })),
  updatebsSubmitError: (result) =>
    set(() => ({
      bssubmitError: result,
    })),
  resetbsHistoryData: () =>
    set(() => ({
      bshistoryData: { template_id: '', result: '', questionAnswerPair: {} },
      bseassyResult: '',
    })),
  resetbsData: () => {
    set(initialState);
  },
});
