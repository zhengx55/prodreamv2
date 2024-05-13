'use client';
import { PageTrack } from '@/query/api';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';

const PageViewTrack = ({ no_route_event }: { no_route_event?: string }) => {
  const pathname = usePathname();
  const fromParam = useSearchParams().get('from');
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [delay, setDelay] = useState(0); // Initialize delay as 0 for immediate first call
  const firstCallDone = useRef(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }
    const getPageName = () => {
      if (no_route_event) return no_route_event;

      const lastPathSegment = pathname.split('/').pop();
      switch (lastPathSegment) {
        case 'en':
          return 'landingpage-en';
        case 'cn':
          return 'landingpage-cn';
        default:
          return lastPathSegment;
      }
    };

    const getTrafficSource = () => {
      if (fromParam) return fromParam;
      if (document.referrer.includes('google')) return 'google';
      if (document.referrer.includes('baidu')) return 'baidu';
      return undefined;
    };

    const callApi = async () => {
      const page_name = getPageName();
      if (!page_name) return;
      let traffic_source: string | undefined;
      if (['landingpage-en', 'landingpage-cn', 'signup'].includes(page_name)) {
        traffic_source = getTrafficSource();
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

  return null;
};

export default PageViewTrack;
