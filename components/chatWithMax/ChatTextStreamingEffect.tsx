'use client';
import { IChatSessionData, Role } from '@/query/type';
import { useEffect, useRef, useState } from 'react';

type Props = {
  text?: string;
  speed: number;
  printIndexRef: React.MutableRefObject<number>;
  setAnimatedText: React.Dispatch<React.SetStateAction<string>>;
  setMessageList: React.Dispatch<React.SetStateAction<IChatSessionData[]>>;
};

const ChatTextStreamingEffect = ({
  text,
  speed,
  printIndexRef,
  setAnimatedText,
  setMessageList,
}: Props) => {
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
        printIndexRef.current = 0;
        setAnimatedText('');
        setMessageList((prev) => [
          ...prev,
          { role: Role.System, content: text, order: 1 },
        ]);
        clearInterval(intervalIdRef.current);
      }
    }, speed);

    return () => {
      clearInterval(intervalIdRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, printIndexRef]);

  return (
    <span className='base-regular whitespace-pre-line break-keep'>
      {displayedText}
    </span>
  );
};

export default ChatTextStreamingEffect;
