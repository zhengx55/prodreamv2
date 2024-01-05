import { cn } from '@/lib/utils';
import { m } from 'framer-motion';
import { CSSProperties, memo } from 'react';
import { Button } from '../ui/button';
import Spacer from './Spacer';

type Props = {
  title: string;
  info?: string;
  button?: string;
  className?: string;
  buttonClassName?: string;
  onClickHandler?: () => void;
  arrowPosition?: 'top' | 'bottom' | 'left' | 'right';
  styles?: CSSProperties;
};

const TutCard = ({
  title,
  info,
  button,
  className,
  onClickHandler,
  arrowPosition,
  buttonClassName,
  styles,
}: Props) => {
  return (
    <m.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 0 }}
      style={styles}
      className={cn(
        className,
        'flex-center absolute z-50 flex-col gap-y-2 rounded-lg bg-black-400 p-3'
      )}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='16'
        height='8'
        viewBox='0 0 16 8'
        fill='none'
        className={`absolute ${
          arrowPosition === 'right'
            ? '-right-[12px] rotate-90'
            : arrowPosition === 'left'
              ? '-left-[12px] -rotate-90'
              : arrowPosition === 'bottom'
                ? '-bottom-[8px] rotate-180'
                : '-top-[8px]'
        } `}
      >
        <path
          d='M0 8L16 8L9.41421 1.41421C8.63317 0.633164 7.36684 0.633164 6.58579 1.41421L0 8Z'
          fill='#1D1B1E'
        />
      </svg>
      <h2 className='small-semibold self-start text-white'>{title}</h2>
      {info ? (
        <p className='subtle-regular break-words leading-4 text-white'>
          {info}
        </p>
      ) : null}
      <Spacer y='5' />
      <Button
        onClick={onClickHandler}
        className={cn(
          buttonClassName,
          'text-md h-max self-end rounded-md py-1'
        )}
      >
        {button}
      </Button>
    </m.div>
  );
};

export default memo(TutCard);
