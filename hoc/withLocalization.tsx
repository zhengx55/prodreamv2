// hoc/withLocalization.tsx

import { useEffect, FC } from 'react';
import { usePathname } from 'next/navigation';

const withLocalization = <P extends object>(WrappedComponent: FC<P>) => {
  const WithLocalization: FC<P> = (props) => {
    const pathname = usePathname();

    useEffect(() => {
      const language = pathname.split('/')[1];
      const localizedUrl = `/${language}${pathname}`;
      window.history.replaceState({}, '', localizedUrl);
    }, [pathname]);

    return <WrappedComponent {...props} />;
  };

  return WithLocalization;
};

export default withLocalization;
