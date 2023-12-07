import { IBrainStormHistoryState } from '@/types';
import {
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  createContext,
  useContext,
  useRef,
  useState,
} from 'react';

type IAiEditiorContext = {
  essayRef: RefObject<HTMLDivElement>;
  taskId: string | undefined;
  setTaskId: Dispatch<SetStateAction<string | undefined>>;
};

const AIEditiorContext = createContext({} as IAiEditiorContext);

export default function AIEditiorProvider({
  children,
}: {
  children: ReactNode;
}) {
  const essayRef = useRef<HTMLDivElement>(null);
  const [taskId, setTaskId] = useState<string | undefined>();
  return (
    <AIEditiorContext.Provider
      value={{
        essayRef,
        taskId,
        setTaskId,
      }}
    >
      {children}
    </AIEditiorContext.Provider>
  );
}

export const useAiEditiorContext = () => useContext(AIEditiorContext);
