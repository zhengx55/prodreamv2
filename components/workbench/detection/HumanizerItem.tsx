import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { memo } from 'react';

type Props = {
  item: [number[], number[], string];
  isExpand: boolean;
  onToggleExpand: () => void;
  onDismiss: () => void;
  onAccept: () => void;
};

const HumanizerItem = ({
  item,
  isExpand,
  onToggleExpand,
  onDismiss,
  onAccept,
}: Props) => {
  return (
    <motion.div
      initial={false}
      animate={isExpand ? 'expand' : 'collapse'}
      variants={{
        expand: { height: 'auto' },
        collapse: { height: '86px' },
      }}
      transition={{ duration: 0.3 }}
      onClick={onToggleExpand}
      className='cursor-pointer overflow-hidden rounded-lg border border-gray-300 bg-white px-4 py-3 hover:shadow-md'
    >
      <p
        className={`small-regular text-zinc-600 ${isExpand ? '' : 'line-clamp-3'}`}
      >
        {item[2]}
      </p>
      {isExpand && (
        <div className='mt-2 flex gap-x-2'>
          <Button
            role='button'
            variant={'outline'}
            className='w-1/2'
            onClick={(e) => {
              e.stopPropagation();
              onDismiss();
            }}
          >
            Dismiss
          </Button>
          <Button
            role='button'
            className='w-1/2'
            onClick={(e) => {
              e.stopPropagation();
              onAccept();
            }}
          >
            Accept
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default memo(HumanizerItem);
