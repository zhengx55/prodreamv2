'use client';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface FeatureTagProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  text: string;
  className?: string;
}

const FeatureTag: React.FC<FeatureTagProps> = ({
  icon,
  text,
  className,
  disabled,
  onClick,
  ...props
}) => {
  return (
    <button
      className={cn(
        'inline-flex items-center gap-2 rounded-lg border border-[#EDEFF5] bg-white p-2',
        'transition-all duration-200 ease-in-out',
        'hover:bg-[#F6F7FB]',
        'disabled:cursor-not-allowed',
        className
      )}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      <Image
        src={icon}
        alt={text}
        width={24}
        height={24}
        className={cn('flex-shrink-0', disabled && 'opacity-50 grayscale')}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
        }}
      />
      <span
        className={cn(
          'font-poppins text-sm font-normal leading-6 text-[#57545E]',
          disabled && 'text-[#D2D7E1]'
        )}
      >
        {text}
      </span>
    </button>
  );
};

export default FeatureTag;
