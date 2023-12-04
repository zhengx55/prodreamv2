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
  taskId: string;
  setTaskId: Dispatch<SetStateAction<string>>;
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

  const [taskId, setTaskId] = useState<string>('');

  return (
    <BrainStormContext.Provider
      value={{
        historyData,
        setHistoryData,
        taskId,
        setTaskId,
      }}
    >
      {children}
    </BrainStormContext.Provider>
  );
}

export const useBrainStormContext = () => useContext(BrainStormContext);
