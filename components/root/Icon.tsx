import Image from 'next/image';
import { memo } from 'react';

type IconProps = {
  src: string;
  width: number;
  height: number;
  alt?: string;
  priority?: boolean;
  className?: string;
};

const Icon = ({
  src,
  width,
  height,
  priority = false,
  alt = '',
  className,
}: IconProps) => {
  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      priority={priority}
      className={className}
    />
  );
};

export default memo(Icon);
