import { cn } from '@/lib/utils';
import { HTMLProps, forwardRef } from 'react';

export type SurfaceProps = HTMLProps<HTMLDivElement> & {
  withShadow?: boolean;
  withBorder?: boolean;
};

export const Surface = forwardRef<HTMLDivElement, SurfaceProps>(
  ({ children, className, withShadow, withBorder, ...props }, ref) => {
    const surfaceClass = cn(
      className,
      'bg-white rounded z-[50]',
      withShadow ? 'shadow-sm' : '',
      withBorder ? 'border border-shadow-border dark:border-neutral-800' : ''
    );

    return (
      <div className={surfaceClass} {...props} ref={ref}>
        {children}
      </div>
    );
  }
);

Surface.displayName = 'Surface';
