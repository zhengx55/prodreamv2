import React, { memo } from 'react';

type Props = { x?: string; y?: string };

const Spacer = ({ x, y }: Props) => {
  const spacerStyle = {
    width: x ? `${x}px` : 'auto',
    height: y ? `${y}px` : 'auto',
  };

  return <div style={spacerStyle} className='shrink-0'></div>;
};

export default memo(Spacer);
