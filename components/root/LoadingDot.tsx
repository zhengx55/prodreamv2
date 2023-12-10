import React, { memo, useEffect, useState } from 'react';

type Props = { label: string };

const LoadingDot = ({ label }: Props) => {
  const dots = ['.', '.', '.'];
  const [dotElements, setDotElements] = useState<any>([]);
  useEffect(() => {
    const dotsWithAnimation = dots.map((dot, index) => (
      <span
        key={index}
        className='fading-dot'
        style={{ animationDelay: `${index * 0.2}s` }}
      >
        {dot}
      </span>
    ));

    setDotElements(dotsWithAnimation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <span>
      {label}&nbsp;
      {dotElements}
    </span>
  );
};

export default memo(LoadingDot);
