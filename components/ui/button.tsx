import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex gap-x-2 items-center justify-center whitespace-nowrap rounded text-sm font-medium ring-offset-background transition-colors transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-doc-primary text-white hover:-translate-y-0.5',
        secondary: 'bg-transparent hover:-translate-y-0.5',
        outline: 'border border-gray-200 bg-white hover:-translate-y-0.5',
        ghost: 'gap-x-2 bg-white text-doc-primary hover:-translate-y-0.5',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-2',
        lg: 'h-11 px-8',
        expand: 'h-9 px-8',
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
