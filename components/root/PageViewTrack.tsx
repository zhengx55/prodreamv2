'use client';
import { PageTrack } from '@/query/api';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';

const PageViewTrack = () => {
  const pathname = usePathname();
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [delay, setDelay] = useState(0); // Initialize delay as 0 for immediate first call
  const firstCallDone = useRef(false);

  useEffect(() => {
    const callApi = async () => {
      const page_name = pathname.split('/').pop() || 'landing_page';
      const delay_param = delay ? (delay / 1000).toString() : '0';
      await PageTrack(page_name, delay_param, isMobile ? 1 : 0);
      if (!firstCallDone.current) {
        setDelay(2000);
        firstCallDone.current = true;
      } else {
        setDelay((prevDelay) => (prevDelay < 16000 ? prevDelay * 2 : 16000));
      }
    };
    if (delay === 0) {
      callApi();
    } else {
      timer.current = setTimeout(callApi, delay);
    }
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [delay, pathname]);

  useEffect(() => {
    return () => {
      setDelay(0);
      firstCallDone.current = false;
    };
  }, [pathname]);

  return null;
};

export default PageViewTrack;
