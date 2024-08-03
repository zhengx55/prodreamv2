import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-normal ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:bg-zinc-200 disabled:pointer-events-none gap-x-2',
  {
    variants: {
      variant: {
        default:
          'bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-500 text-white',
        secondary:
          'bg-transparent text-indigo-500 border border-indigo-500 bg-transparent hover:bg-indigo-50 active:bg-violet-200 disabled:bg-slate-50 disabled:border-gray-300',
        outline: 'border bg-white border-gray-300 gap-x-1 text-zinc-600',
        ghost: 'bg-white hover:text-[#726fe7] hover:underline text-violet-500',
        text: 'text-zinc-600 text-2xl font-normal hover:text-violet-500 active:text-violet-600',
        icon: 'hover:bg-zinc-100 text-zinc-600 gap-1 rounded disabled:bg-transparent',
      },
      size: {
        default: 'px-4 py-2 size-max',
        sm: 'h-9 px-2',
        lg: 'h-11 px-8',
        icon: 'size-10',
        expand: 'h-9 px-8',
        send: 'p-1.5 size-max',
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
