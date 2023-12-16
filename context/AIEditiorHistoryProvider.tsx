import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAiEditiorContext } from './AIEditiorProvider';

type IAiEditiorContext = {
  history: string[];
  handleRedo: () => void;
  handleUndo: () => void;
  storeIntoHistory: (content: string) => void;
  currentStep: number;
};

const AIEditiorHistoryContext = createContext({} as IAiEditiorContext);

export default function AIEditiorHistoryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [history, setHistory] = useState<string[]>([]);
  const { essayRef } = useAiEditiorContext();
  const [currentStep, setCurrentStep] = useState(0);

  const storeIntoHistory = (content: string) => {
    setHistory((prev) => [...prev, content]);
    setCurrentStep((prev) => prev + 1);
  };

  const handleRedo = useCallback(() => {
    if (!essayRef.current) return;
    if (currentStep < history.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
      essayRef.current.innerHTML = history[currentStep + 1];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, history]);

  const handleUndo = useCallback(() => {
    if (!essayRef.current) return;
    if (currentStep > 0) {
      console.log(currentStep);
      console.log(history);
      setCurrentStep((prevStep) => prevStep - 1);
      essayRef.current.innerHTML = history[currentStep - 1];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, history]);

  // useEffect(() => {
  //   // 监听键盘事件，实现 Ctrl + Z 和 Ctrl + Y 的撤销和重做
  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
  //       event.preventDefault();
  //       handleUndo();
  //     } else if ((event.ctrlKey || event.metaKey) && event.key === 'y') {
  //       event.preventDefault();
  //       handleRedo();
  //     }
  //   };
  //   document.addEventListener('keydown', handleKeyDown);
  //   return () => {
  //     document.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, [handleRedo, handleUndo]);

  return (
    <AIEditiorHistoryContext.Provider
      value={{ history, handleRedo, handleUndo, storeIntoHistory, currentStep }}
    >
      {children}
    </AIEditiorHistoryContext.Provider>
  );
}

export const useAIEditiorHistoryContext = () =>
  useContext(AIEditiorHistoryContext);
