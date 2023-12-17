import { IBrainStormHistoryState, InputProps } from '@/types';
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
  tutorial: Record<string, InputProps>;
  setTutorial: Dispatch<SetStateAction<Record<string, InputProps>>>;
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
  const [tutorial, setTutorial] = useState<Record<string, InputProps>>({});
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
        tutorial,
        setTutorial,
      }}
    >
      {children}
    </BrainStormContext.Provider>
  );
}

export const useBrainStormContext = () => useContext(BrainStormContext);
