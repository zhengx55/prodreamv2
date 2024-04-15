import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex gap-x-2 items-center justify-center whitespace-nowrap rounded text-sm font-medium ring-offset-background transition-colors transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default:
          'bg-violet-500 text-white active:bg-violet-600 hover:bg-[#9966FF]',
        secondary:
          'bg-transparent border border-violet-500 bg-transparent hover:bg-violet-50 hover:shadow-lg',
        outline:
          'border border-neutral-400 text-zinc-600 active:bg-violet-50 hover:bg-violet-50 active:text-zinc-800 ',
        ghost:
          'gap-x-2 bg-white hover:text-[#9A66FF] hover:underline active:text-[#7B52CC] text-violet-500',
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
