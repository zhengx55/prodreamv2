import { IPolishResultAData } from '@/query/type';
import {
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

type IAiEditiorContext = {
  essayRef: RefObject<HTMLDivElement>;
};

const AIEditiorContext = createContext({} as IAiEditiorContext);

export default function AIEditiorProvider({
  children,
}: {
  children: ReactNode;
}) {
  const essayRef = useRef<HTMLDivElement>(null);

  return (
    <AIEditiorContext.Provider
      value={{
        essayRef,
      }}
    >
      {children}
    </AIEditiorContext.Provider>
  );
}

export const useAiEditiorContext = () => useContext(AIEditiorContext);
