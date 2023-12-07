import { IBrainStormHistoryState } from '@/types';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

type IAiEditiorContext = {
  essay: string;
  setEssay: Dispatch<SetStateAction<string>>;
};

const AIEditiorContext = createContext({} as IAiEditiorContext);

export default function AIEditiorProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [essay, setEssay] = useState('');
  return (
    <AIEditiorContext.Provider
      value={{
        essay,
        setEssay,
      }}
    >
      {children}
    </AIEditiorContext.Provider>
  );
}

export const useAiEditiorContext = () => useContext(AIEditiorContext);
