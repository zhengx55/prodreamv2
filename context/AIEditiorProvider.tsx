import { IPolishResultAData } from '@/query/type';
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
  polishResult: IPolishResultAData[];
  setPolishResult: Dispatch<SetStateAction<IPolishResultAData[]>>;
  polishResultB: string;
  setPolishResultB: Dispatch<SetStateAction<string>>;
  isPolishing: boolean;
  setIsPolishing: Dispatch<SetStateAction<boolean>>;
  chatEditMode: boolean;
  setChatEditMode: Dispatch<SetStateAction<boolean>>;
  selectText: string;
  setSelectText: Dispatch<SetStateAction<string>>;
  isEvaluationOpen: boolean;
  setIsEvaluationOpen: Dispatch<SetStateAction<boolean>>;
  isPlagiarismOpen: boolean;
  setIsPlagiarismOpen: Dispatch<SetStateAction<boolean>>;
};

const AIEditiorContext = createContext({} as IAiEditiorContext);

export default function AIEditiorProvider({
  children,
}: {
  children: ReactNode;
}) {
  const essayRef = useRef<HTMLDivElement>(null);
  const [polishResult, setPolishResult] = useState<IPolishResultAData[]>([]);
  const [polishResultB, setPolishResultB] = useState<string>('');
  const [isPolishing, setIsPolishing] = useState(false);
  const [chatEditMode, setChatEditMode] = useState(false);
  const [selectText, setSelectText] = useState('');
  const [isEvaluationOpen, setIsEvaluationOpen] = useState(false);
  const [isPlagiarismOpen, setIsPlagiarismOpen] = useState(false);
  return (
    <AIEditiorContext.Provider
      value={{
        essayRef,
        polishResult,
        setPolishResult,
        polishResultB,
        setPolishResultB,
        isPolishing,
        setIsPolishing,
        chatEditMode,
        setChatEditMode,
        selectText,
        setSelectText,
        isEvaluationOpen,
        setIsEvaluationOpen,
        isPlagiarismOpen,
        setIsPlagiarismOpen,
      }}
    >
      {children}
    </AIEditiorContext.Provider>
  );
}

export const useAiEditiorContext = () => useContext(AIEditiorContext);
