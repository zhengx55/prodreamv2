import { ButtonHTMLAttributes, HTMLProps, forwardRef, memo } from 'react';

import { cn } from '@/lib/utils';
import { Surface } from '../../ui/surface';
import Tooltip from './Tooltip';

export type ToolbarWrapperProps = {
  shouldShowContent?: boolean;
  isVertical?: boolean;
} & HTMLProps<HTMLDivElement>;

const ToolbarWrapper = forwardRef<HTMLDivElement, ToolbarWrapperProps>(
  (
    {
      shouldShowContent = true,
      children,
      isVertical = false,
      className,
      ...rest
    },
    ref
  ) => {
    const toolbarClassName = cn(
      'inline-flex h-full leading-none gap-0.5',
      isVertical ? 'flex-col p-2' : 'flex-row p-1 items-center',
      className
    );

    return (
      shouldShowContent && (
        <Surface withBorder className={toolbarClassName} {...rest} ref={ref}>
          {children}
        </Surface>
      )
    );
  }
);

ToolbarWrapper.displayName = 'Toolbar';

export type ToolbarDividerProps = {
  horizontal?: boolean;
} & HTMLProps<HTMLDivElement>;

const ToolbarDivider = forwardRef<HTMLDivElement, ToolbarDividerProps>(
  ({ horizontal, className, ...rest }, ref) => {
    const dividerClassName = cn(
      'bg-neutral-200 dark:bg-neutral-800',
      horizontal
        ? 'w-full min-w-[1.5rem] h-[1px] my-1 first:mt-0 last:mt-0'
        : 'h-full min-h-[1.5rem] w-[1px] mx-1 first:ml-0 last:mr-0',
      className
    );

    return <div className={dividerClassName} ref={ref} {...rest} />;
  }
);

ToolbarDivider.displayName = 'Toolbar.Divider';

export type ToolbarButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  activeClassname?: string;
  tooltip?: string;
  tooltipShortcut?: string[];
};

const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  (
    { children, className, tooltip, tooltipShortcut, activeClassname, ...rest },
    ref
  ) => {
    const buttonClass = cn('gap-1 min-w-[2rem] px-1 w-auto', className);

    const content = (
      <Button
        variant='ghost'
        className={buttonClass}
        activeClassname={activeClassname}
        ref={ref}
        {...rest}
      >
        {children}
      </Button>
    );

    if (tooltip) {
      return (
        <Tooltip title={tooltip} shortcut={tooltipShortcut}>
          {content}
        </Tooltip>
      );
    }

    return content;
  }
);

ToolbarButton.displayName = 'ToolbarButton';

type ButtonVariant = 'primary' | 'ghost';
type ButtonSize = 'medium' | 'small' | 'icon' | 'iconSmall';

type ButtonProps = {
  variant?: ButtonVariant;
  active?: boolean;
  activeClassname?: string;
  buttonSize?: ButtonSize;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      active,
      buttonSize = 'medium',
      children,
      disabled,
      variant = 'primary',
      className,
      activeClassname,
      ...rest
    },
    ref
  ) => {
    const buttonClassName = cn(
      'flex group items-center justify-center border border-transparent gap-2 text-sm font-semibold rounded-md disabled:opacity-50 whitespace-nowrap',

      variant === 'primary' &&
        cn(
          'text-white bg-black border-black dark:text-black dark:bg-white dark:border-white',
          !disabled &&
            !active &&
            'hover:bg-neutral-800 active:bg-neutral-900 dark:hover:bg-neutral-200 dark:active:bg-neutral-300',
          active && cn('bg-neutral-900 dark:bg-neutral-300', activeClassname)
        ),

      variant === 'ghost' &&
        cn(
          'bg-transparent border-transparent text-black dark:text-neutral-400',
          !disabled &&
            !active &&
            'hover:bg-black/10 hover:text-neutral-700 active:bg-black/10 active:text-neutral-800 dark:hover:bg-white/10 dark:hover:text-neutral-300 dark:active:text-neutral-200',
          active &&
            cn(
              'bg-black/10 text-neutral-800 dark:bg-white/20 dark:text-neutral-200',
              activeClassname
            )
        ),

      buttonSize === 'medium' && 'py-1 px-1.5',
      buttonSize === 'small' && 'py-1 px-2',
      buttonSize === 'icon' && 'w-8 h-8',
      buttonSize === 'iconSmall' && 'w-6 h-6',
      className
    );

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={buttonClassName}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

export const Toolbar = {
  Wrapper: ToolbarWrapper,
  Divider: ToolbarDivider,
  Button: memo(ToolbarButton),
};
