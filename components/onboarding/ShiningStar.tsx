import Image from 'next/image';

import { FC } from 'react';

interface ShiningStarProps {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  width?: number;
  height?: number;
  scale?: number;
  twinkle?: boolean;
  twinkleDuration?: string;
}

export const ShiningStar: FC<ShiningStarProps> = ({
  top,
  left,
  right,
  bottom,
  width = 208,
  height = 200,
  scale = 1,
  twinkle = true,
  twinkleDuration = '1.5s', // 默认闪烁持续时间
}) => (
  <Image
    src='/onboarding/shining_star.png'
    alt='shining star'
    width={width}
    height={height}
    className={`absolute ${twinkle ? 'animate-twinkle' : ''}`}
    style={{
      top: top ? top : undefined,
      left: left ? left : undefined,
      right: right ? right : undefined,
      bottom: bottom ? bottom : undefined,
      transform: `scale(${scale})`,
      animationDuration: twinkle ? twinkleDuration : undefined,
    }}
  />
);
