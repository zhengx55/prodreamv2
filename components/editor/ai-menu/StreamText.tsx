import useUnmount from 'beautiful-react-hooks/useUnmount';
import { useEffect, useRef, useState } from 'react';

type Props = {
  generatedResult: string;
  toogleTyping?: () => void;
  speed?: number;
};

const StreamText = ({ generatedResult, toogleTyping, speed = 10 }: Props) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!generatedResult) return;
    if (currentIndex < generatedResult.length) {
      timeout.current = setTimeout(() => {
        setCurrentText((prevText) => prevText + generatedResult[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, speed);
    } else {
      timeout.current && clearTimeout(timeout.current);
      if (toogleTyping) {
        toogleTyping();
      }
    }
    return () => {
      clearTimeout(timeout.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, generatedResult]);

  useUnmount(() => {
    timeout.current && clearTimeout(timeout.current);
  });
  return currentText;
};

export default StreamText;
