import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface QuestionBtnProps {
  children: React.ReactNode;
  className?: string;
  outline?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const QuestionBtn: React.FC<QuestionBtnProps> = ({
  children,
  className,
  outline = false,
  onClick,
  disabled = false,
}) => {
  return (
    <Button
      variant={outline ? 'questionOutline' : 'question'}
      size='question'
      onClick={onClick}
      disabled={disabled}
      className={cn(
        className,
        'rounded-lg',
        disabled &&
          'border-[#DFE2EA] bg-[#DFE2EA] text-white hover:bg-[#DFE2EA] hover:text-white'
      )}
    >
      {children}
    </Button>
  );
};

export default QuestionBtn;
