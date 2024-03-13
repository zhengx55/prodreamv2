'use client';
import { PageTrack } from '@/query/api';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';

const PageViewTrack = ({ no_route_event }: { no_route_event?: string }) => {
  const pathname = usePathname();
  const fromParam = useSearchParams().get('from');
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [delay, setDelay] = useState(0); // Initialize delay as 0 for immediate first call
  const firstCallDone = useRef(false);

  useEffect(() => {
    const callApi = async () => {
      let traffic_source: string | undefined;
      const page_name = no_route_event
        ? no_route_event
        : pathname.split('/').pop() === 'en'
          ? 'landingpage-en'
          : 'landingpage-cn';

      if (['landingpage-en', 'landingpage-cn', 'signup'].includes(page_name)) {
        if (fromParam) {
          traffic_source = fromParam;
        } else {
          traffic_source = document.referrer.includes('google')
            ? 'google'
            : document.referrer.includes('baidu')
              ? 'baidu'
              : undefined;
        }
      }
      const delay_param = delay ? (delay / 1000).toString() : '0';
      await PageTrack(page_name, delay_param, isMobile ? 1 : 0, traffic_source);
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
  }, [delay, pathname, no_route_event, fromParam]);

  useEffect(() => {
    return () => {
      setDelay(0);
      firstCallDone.current = false;
    };
  }, [pathname]);

  return <Suspense />;
};

export default PageViewTrack;
