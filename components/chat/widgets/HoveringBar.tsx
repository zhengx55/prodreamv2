'use client';
import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface HoveringBarProps {
  showCopy?: boolean;
  showRegeneration?: boolean;
  showLike?: boolean;
  showDislike?: boolean;
  onCopy?: () => void;
  onRegeneration?: () => void;
  onLike?: () => void;
  onDislike?: () => void;
  alignment?: 'left' | 'right'; // Added alignment prop
}

interface HoveringBarItemProps {
  icon: string;
  hoverIcon: string;
  filledIcon?: string;
  text?: string;
  onClick?: () => void;
  canFill?: boolean;
}

const HoveringBarItem: React.FC<HoveringBarItemProps> = ({
  icon,
  hoverIcon,
  filledIcon,
  text,
  onClick,
  canFill = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleClick = () => {
    if (canFill) {
      setIsFilled(!isFilled);
    }
    if (onClick) {
      onClick();
    }
  };

  const currentIcon = isFilled ? filledIcon : isHovered ? hoverIcon : icon;

  return (
    <button
      className={cn(
        'flex items-center px-2 py-1 transition-colors duration-200',
        isHovered || isFilled ? 'text-[#7270E8]' : 'text-[#9F9DA3]'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <Image
        src={currentIcon || icon}
        alt={text || 'icon'}
        width={16}
        height={16}
        className='mr-1 h-[16px] w-[16px]'
      />
      {text && (
        <span className='font-poppins text-xs font-normal leading-5'>
          {text}
        </span>
      )}
    </button>
  );
};

const HoveringBar: React.FC<HoveringBarProps> = ({
  showCopy = true,
  showRegeneration = true,
  showLike = true,
  showDislike = true,
  onCopy,
  onRegeneration,
  onLike,
  onDislike,
  alignment = 'left', // Default alignment is left
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className='relative h-10 w-full' // Adjust height as needed
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div
        className={cn(
          'absolute left-0 right-0 top-0 flex items-center bg-white px-4 py-2 transition-all duration-200',
          isVisible ? 'visible opacity-100' : 'invisible opacity-0',
          alignment === 'right' ? 'justify-end' : 'justify-start' // Align based on alignment prop
        )}
      >
        {showCopy && (
          <HoveringBarItem
            icon='/workbench/hovering_copy.svg'
            hoverIcon='/workbench/hovering_copy_hovered.svg'
            text='copy'
            onClick={onCopy}
          />
        )}
        {showRegeneration && (
          <HoveringBarItem
            icon='/workbench/hovering_regeneration.svg'
            hoverIcon='/workbench/hovering_regeneration_hovered.svg'
            text='regeneration'
            onClick={onRegeneration}
          />
        )}
        {showLike && (
          <>
            {showRegeneration && <div className='mx-2 h-5 w-px bg-[#C9CFDC]' />}
            <HoveringBarItem
              icon='/workbench/hovering_like.svg'
              hoverIcon='/workbench/hovering_like_hovered.svg'
              filledIcon='/workbench/hovering_like_filled.svg'
              onClick={onLike}
              canFill={true}
            />
          </>
        )}
        {showDislike && (
          <HoveringBarItem
            icon='/workbench/hovering_dislike.svg'
            hoverIcon='/workbench/hovering_dislike_hovered.svg'
            filledIcon='/workbench/hovering_dislike_filled.svg'
            onClick={onDislike}
            canFill={true}
          />
        )}
      </div>
    </div>
  );
};

export default HoveringBar;
