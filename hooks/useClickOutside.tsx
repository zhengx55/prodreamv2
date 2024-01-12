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
      event.preventDefault();
      if (
        elementRef &&
        elementRef.current &&
        !elementRef.current.contains(event.target)
      ) {
        // Call Callback only if event happens outside element or descendent elements
        callback();
      }
      return;
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [elementRef, callback]);
}
