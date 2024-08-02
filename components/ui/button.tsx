import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-normal ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none gap-x-2',
  {
    variants: {
      variant: {
        default:
          'bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-500 text-white',
        secondary:
          'bg-transparent text-indigo-500 border border-indigo-500 bg-transparent hover:bg-indigo-50 active:bg-violet-200',
        outline:
          'border border-neutral-400 text-zinc-600 active:bg-violet-50 hover:bg-violet-50 active:text-zinc-800 ',
        ghost: 'bg-white hover:text-[#726fe7] hover:underline text-violet-500',
        text: 'text-zinc-600 text-2xl font-normal hover:text-violet-500 active:text-violet-600',
        icon: 'p-1 hover:bg-zinc-100 text-zinc-600 gap-1 rounded',
        question:
          'bg-[#7270E8] text-white border border-[#7270E8] hover:bg-[#5F5DD0] active:bg-[#4C4AB8]',
        questionOutline:
          'bg-white text-[#7270E8] border border-[#7270E8] hover:bg-[#F0F0FF] active:bg-[#E0E0FF]',
      },
      size: {
        default: 'px-4 py-2',
        sm: 'h-9 px-2',
        lg: 'h-11 px-8',
        expand: 'h-9 px-8',
        icon: 'h-10 w-10',
        question: 'h-[38px] px-8 py-2',
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
