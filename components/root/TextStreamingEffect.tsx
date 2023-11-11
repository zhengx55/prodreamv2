'use client';
import { useEffect, useRef, useState } from 'react';

type Props = {
  text?: string;
  speed: number;
  printIndexRef: React.MutableRefObject<number>;
};

const TextStreamingEffect = ({ text, speed, printIndexRef }: Props) => {
  const [displayedText, setDisplayedText] = useState('');
  const intervalIdRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!text) return;
    let i = printIndexRef?.current;
    intervalIdRef.current = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      printIndexRef.current = i;
      if (i > text.length) {
        console.log('cleaning');
        clearInterval(intervalIdRef.current);
      }
    }, speed);

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [text, speed, printIndexRef]);

  return <span>{displayedText}</span>;
};

export default TextStreamingEffect;
