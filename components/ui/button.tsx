import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary-200 text-white hover:bg-primary-300 hover:-translate-y-0.5',
        secondary:
          'bg-transparent text-primary-200 hover:text-primary-300 border-1 border-primary-200 hover:border-primary-300 hover:-translate-y-0.5',
        outline:
          'border border-shadow-border bg-white hover:bg-accent hover:text-accent-foreground',
        ghost: 'gap-x-2 hover:-translate-y-0.5',
        white:
          'bg-white gap-x-2 base-regular justify-start shadow-button rounded-[10px] hover:-translate-y-0.5 hover:text-primary-200',
        link: 'text-normal underline-offset-4 hover:underline hover:-translate-y-0.5',
      },
      size: {
        spaceOff: 'p-0 h-10',
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
