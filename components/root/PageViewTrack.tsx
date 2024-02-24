'use client';
import { PageTrack } from '@/query/api';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const PageViewTrack = () => {
  const pathname = usePathname();
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [delay, setDelay] = useState(0); // Initialize delay as 0 for immediate first call
  const firstCallDone = useRef(false);

  useEffect(() => {
    // Function to call the tracking API
    const callApi = async () => {
      const page_name = pathname.split('/').pop() || 'landing_page';
      const delay_param = delay ? (delay / 1000).toString() : '0';
      console.log('🚀 ~ useEffect ~ delay:', delay);

      await PageTrack(page_name, delay_param);

      if (!firstCallDone.current) {
        setDelay(2000); // Set delay to 2000ms after the first call
        firstCallDone.current = true;
      } else {
        setDelay((prevDelay) => (prevDelay < 16000 ? prevDelay * 2 : 16000)); // Double the delay until 16 seconds
      }
    };

    // Call the API immediately on the first render, then set a timeout for subsequent calls
    if (delay === 0) {
      callApi();
    } else {
      timer.current = setTimeout(callApi, delay);
    }

    // Cleanup function to clear the timeout
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [delay, pathname]); // React on changes to delay or pathname

  useEffect(() => {
    // Reset delay and firstCallDone ref when pathname changes
    return () => {
      setDelay(0);
      firstCallDone.current = false;
    };
  }, [pathname]);

  return null;
};

export default PageViewTrack;
