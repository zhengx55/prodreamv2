import Image from 'next/image';
import { memo } from 'react';

type IconProps = {
  src: string;
  width: number;
  height: number;
  alt?: string;
  priority?: boolean;
};

const Icon = ({
  src,
  width,
  height,
  priority = false,
  alt = '',
}: IconProps) => {
  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      priority={priority}
    />
  );
};

export default memo(Icon);
