import { IBrainStormHistoryState } from '@/types';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

type IBrainStormContext = {
  historyData: IBrainStormHistoryState;
  setHistoryData: Dispatch<SetStateAction<IBrainStormHistoryState>>;
  isSubmiting: boolean;
  setIsSubmiting: Dispatch<SetStateAction<boolean>>;
  submitError: string;
  setSubmitError: Dispatch<SetStateAction<string>>;
  eassyResult: string;
  setEassyResult: Dispatch<SetStateAction<string>>;
  startTyping: boolean;
  setStartTyping: Dispatch<SetStateAction<boolean>>;
};

const BrainStormContext = createContext({} as IBrainStormContext);

export default function BrainStormProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [historyData, setHistoryData] = useState<IBrainStormHistoryState>({
    template_id: '',
    result: '',
    questionAnswerPair: {},
  });

  const [isSubmiting, setIsSubmiting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [startTyping, setStartTyping] = useState(false);
  const [eassyResult, setEassyResult] = useState('');

  return (
    <BrainStormContext.Provider
      value={{
        historyData,
        setHistoryData,
        isSubmiting,
        setIsSubmiting,
        submitError,
        setSubmitError,
        eassyResult,
        setEassyResult,
        startTyping,
        setStartTyping,
      }}
    >
      {children}
    </BrainStormContext.Provider>
  );
}

export const useBrainStormContext = () => useContext(BrainStormContext);
