'use client';
import { ReactNode, memo } from 'react';
import {
  TooltipContent,
  Tooltip as UITooltip,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { cn } from '@/lib/utils';

const Tooltip = ({
  children,
  tooltipContent,
  contentClassname,
}: {
  children: ReactNode;
  tooltipContent: string;
  contentClassname?: string;
}) => {
  return (
    <TooltipProvider delayDuration={100}>
      <UITooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p className={cn(contentClassname, 'text-regular text-white')}>
            {tooltipContent}
          </p>
        </TooltipContent>
      </UITooltip>
    </TooltipProvider>
  );
};

export default memo(Tooltip);
