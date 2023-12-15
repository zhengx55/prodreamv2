import { ReactNode, createContext, useContext, useState } from 'react';
import { useAiEditiorContext } from './AIEditiorProvider';

type IAiEditiorContext = {
  history: string[];
  handleRedo: () => void;
  handleUndo: () => void;
  storeIntoHistory: (content: string) => void;
};

const AIEditiorHistoryContext = createContext({} as IAiEditiorContext);

export default function AIEditiorHistoryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [history, setHistory] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);

  const storeIntoHistory = (content: string) => {
    setHistory((prev) => [...prev.slice(0, currentStep + 1), content]);
    setCurrentStep((prev) => prev + 1);
  };

  const handleRedo = () => {
    if (currentStep < history.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handleUndo = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  return (
    <AIEditiorHistoryContext.Provider
      value={{ history, handleRedo, handleUndo, storeIntoHistory }}
    >
      {children}
    </AIEditiorHistoryContext.Provider>
  );
}

export const useAIEditiorHistoryContext = () =>
  useContext(AIEditiorHistoryContext);
