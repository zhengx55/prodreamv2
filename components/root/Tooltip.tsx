'use client';
import { cn } from '@/lib/utils';
import { TooltipArrow } from '@radix-ui/react-tooltip';
import { ReactNode, memo } from 'react';
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip as UITooltip,
} from '../ui/tooltip';

const Tooltip = ({
  children,
  tooltipContent,
  contentClassname,
  defaultOpen,
  side = 'bottom',
}: {
  side?: 'bottom' | 'top' | 'right' | 'left' | undefined;
  children: ReactNode;
  defaultOpen?: boolean;
  tooltipContent: string;
  contentClassname?: string;
}) => {
  return (
    <TooltipProvider delayDuration={100}>
      <UITooltip open={defaultOpen}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side}>
          <TooltipArrow />
          <p className={cn(contentClassname, 'text-xs text-white')}>
            {tooltipContent}
          </p>
        </TooltipContent>
      </UITooltip>
    </TooltipProvider>
  );
};

export default memo(Tooltip);
