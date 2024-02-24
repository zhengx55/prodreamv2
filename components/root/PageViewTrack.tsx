'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const PageViewTrack = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    const url = pathname + searchParams.toString();
    console.log(url);
  }, [pathname, searchParams]);
  return null;
};
export default PageViewTrack;
