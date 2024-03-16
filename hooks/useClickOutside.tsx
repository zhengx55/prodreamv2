import React, { RefObject } from 'react';

export default function useClickOutside(
  elementRef: RefObject<HTMLElement>,
  callback: Function
) {
  React.useEffect(() => {
    const handleClickOutside = (event: {
      preventDefault: () => void;
      target: any;
    }) => {
      if (
        elementRef &&
        elementRef.current &&
        !elementRef.current.contains(event.target)
      ) {
        callback();
      }
      return;
    };
    document.addEventListener('mousedown', handleClickOutside, true);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  }, [elementRef, callback]);
}
