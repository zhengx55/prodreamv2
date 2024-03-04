import { useEffect, useRef, useState } from 'react';
import { clearTimeout, setTimeout } from 'worker-timers';

type Props = {
  generatedResult: string;
  toogleTyping?: () => void;
  speed?: number;
};

const StreamText = ({ generatedResult, toogleTyping, speed = 10 }: Props) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeout = useRef<number>();

  useEffect(() => {
    if (!generatedResult) return;
    if (currentIndex < generatedResult.length) {
      timeout.current = setTimeout(() => {
        setCurrentText((prevText) => prevText + generatedResult[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, speed);
    } else {
      if (toogleTyping) {
        toogleTyping();
      }
    }
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current as number);
        timeout.current = undefined;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, generatedResult, speed]);

  return currentText;
};

export default StreamText;
