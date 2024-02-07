import { useEffect, useRef } from 'react';

const useScrollIntoView = () => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }, []);

  return ref;
};

export default useScrollIntoView;
