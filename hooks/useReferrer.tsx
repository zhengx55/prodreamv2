import { useEffect } from 'react';

const useReferrer = () => {
  useEffect(() => {
    const referrer = document.referrer;
    if (referrer.includes('google')) {
      console.log('google');
    }
  }, []);

  return null;
};

export default useReferrer;
