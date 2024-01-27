'use client';
import { cn } from '@/lib/utils';
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
  side = 'bottom',
}: {
  side?: 'bottom' | 'top' | 'right' | 'left' | undefined;
  children: ReactNode;
  tooltipContent: string;
  contentClassname?: string;
}) => {
  return (
    <TooltipProvider delayDuration={100}>
      <UITooltip open={true}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side}>
          <p className={cn(contentClassname, 'text-regular text-white')}>
            {tooltipContent}
          </p>
        </TooltipContent>
      </UITooltip>
    </TooltipProvider>
  );
};

export default memo(Tooltip);
