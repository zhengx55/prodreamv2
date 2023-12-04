'use client';
import { useEffect, useRef, useState } from 'react';

type Props = {
  text?: string;
  speed: number;
  printIndexRef: React.MutableRefObject<number>;
  setWorkCount?: () => void;
  turnOffAnimation: () => void;
};

const TextStreamingEffect = ({
  text,
  speed,
  printIndexRef,
  setWorkCount,
  turnOffAnimation,
}: Props) => {
  const [displayedText, setDisplayedText] = useState('');
  const intervalIdRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    if (!text) return;
    let i = printIndexRef?.current;
    intervalIdRef.current = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      if (
        (text.charAt(i) === ' ' && !/[.,;?!]/.test(text.charAt(i - 1))) ||
        /[.,;?!]/.test(text.charAt(i))
      ) {
        // Check for space or common punctuation to increment word count
        setWorkCount && setWorkCount();
      }
      i++;
      printIndexRef.current = i;
      if (i > text.length) {
        turnOffAnimation();
        clearInterval(intervalIdRef.current);
      }
    }, speed);

    return () => {
      clearInterval(intervalIdRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, printIndexRef]);

  return <span>{displayedText}</span>;
};

export default TextStreamingEffect;
