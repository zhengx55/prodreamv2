import { cn } from '@/lib/utils';
import { memo } from 'react';

type Props = { x?: string; y?: string; className?: string };

const Spacer = ({ x, y, className }: Props) => {
  const spacerStyle = {
    width: x ? `${x}px` : 'auto',
    height: y ? `${y}px` : 'auto',
  };

  return <div style={spacerStyle} className={cn(className, 'shrink-0')}></div>;
};

export default memo(Spacer);
