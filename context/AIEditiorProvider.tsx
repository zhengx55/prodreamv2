import { IPolishQueryResult } from '@/query/type';
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
  polishResult: IPolishQueryResult[];
  setPolishResult: Dispatch<SetStateAction<IPolishQueryResult[]>>;
  isPolishing: boolean;
  setIsPolishing: Dispatch<SetStateAction<boolean>>;
  markStart: number;
  markEnd: number;
  setMarkStart: Dispatch<SetStateAction<number>>;
  setMarkEnd: Dispatch<SetStateAction<number>>;
};

const AIEditiorContext = createContext({} as IAiEditiorContext);

export default function AIEditiorProvider({
  children,
}: {
  children: ReactNode;
}) {
  const essayRef = useRef<HTMLDivElement>(null);
  const [markStart, setMarkStart] = useState(0);
  const [markEnd, setMarkEnd] = useState(0);
  const [polishResult, setPolishResult] = useState<IPolishQueryResult[]>([]);
  const [isPolishing, setIsPolishing] = useState(false);
  return (
    <AIEditiorContext.Provider
      value={{
        essayRef,
        polishResult,
        setPolishResult,
        isPolishing,
        setIsPolishing,
        markStart,
        markEnd,
        setMarkStart,
        setMarkEnd,
      }}
    >
      {children}
    </AIEditiorContext.Provider>
  );
}

export const useAiEditiorContext = () => useContext(AIEditiorContext);
