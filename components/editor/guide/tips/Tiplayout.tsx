import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { TooltipArrow } from '@radix-ui/react-tooltip';
import { ReactNode, useState } from 'react';

type Props = {
  title: string;
  content: string;
  step?: number;
  totalSteps?: number;
  buttonLabel?: string;
  children: ReactNode;
  side?: 'left' | 'top' | 'right' | 'bottom';
  onClickCallback?: () => void;
};
const Tiplayout = ({
  children,
  title,
  content,
  step,
  totalSteps,
  buttonLabel,
  side,
  onClickCallback,
}: Props) => {
  const [show, setShow] = useState(true);
  const buttonHandler = () => {
    if (onClickCallback) {
      onClickCallback();
    }
    setShow(false);
  };
  return (
    <TooltipProvider>
      <Tooltip open={show}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          sideOffset={10}
          side={side}
          className='min-w-[320px] rounded-lg bg-black-100 p-3'
        >
          <TooltipArrow />
          <div className='flex flex-col'>
            <div className='flex-between'>
              <h1 className='small-semibold text-white'>{title}</h1>
            </div>
            <Spacer y='5' />
            <p className='subtle-regular text-white'>{content}</p>
            <Spacer y='10' />
            <div className='flex-between'>
              {step ? (
                <p className='subtle-regular text-white'>
                  {step}/{totalSteps}
                </p>
              ) : (
                <span />
              )}
              <Button
                className='h-max w-max rounded bg-doc-primary py-1 capitalize'
                role='button'
                onClick={buttonHandler}
              >
                {buttonLabel}
              </Button>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default Tiplayout;
