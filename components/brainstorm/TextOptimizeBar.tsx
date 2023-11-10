import dynamic from 'next/dynamic';
import React, { memo, useState } from 'react';
import { Variants, motion } from 'framer-motion';
import Image from 'next/image';
import { useToast } from '../ui/use-toast';
import { useAnswerOptimize } from '@/query/query';

type Props = {
  questionId: string;
  value: string;
  onChangeHanlder: (fileld: string, value: string) => void;
  setDisableHandler: (field: string, value: boolean) => void;
  mode: 0 | 1;
};

const IconLoading = () => {
  return (
    <div className='flex-center relative h-fit w-fit'>
      <div className='h-[30px] w-[30px] animate-spin rounded-full border-[2px]  border-b-primary-200' />
      <Image
        src='/optimize_active.svg'
        alt='loading'
        width={16}
        height={16}
        className='absolute animate-pulse'
      />
    </div>
  );
};

const OptimizeBar = ({
  questionId,
  value,
  mode,
  setDisableHandler,
  onChangeHanlder,
}: Props) => {
  const { toast } = useToast();
  const { isPending: isOptPending, mutateAsync: OptimizeAnswer } =
    useAnswerOptimize();
  const [hover, setHover] = useState(false);
  const handleOptimze = async () => {
    if (!value) {
      toast({
        variant: 'destructive',
        title: 'Please type something.',
      });
      return;
    }
    setDisableHandler(questionId, true);
    const res = await OptimizeAnswer({
      question_id: questionId,
      answer: value,
      type: mode,
    });
    onChangeHanlder(questionId, res);
    setDisableHandler(questionId, false);
  };
  const menuVariants: Variants = {
    show: { width: '110px' },
    hide: { width: '40px', transition: { delay: 0.05 } },
  };

  const iconVariants: Variants = {
    show: { width: '30px' },
    hide: { width: '0px' },
  };

  return (
    <div className='absolute bottom-0 right-0 z-10 flex h-12 justify-end rounded-lg px-2 py-1'>
      <motion.div
        onMouseEnter={() => {
          if (isOptPending) return;
          setHover(true);
        }}
        onMouseLeave={() => {
          if (isOptPending) return;
          setHover(false);
        }}
        initial='false'
        animate={hover ? 'show' : 'hide'}
        variants={menuVariants}
        className='flex-center h-full cursor-pointer gap-x-1 rounded-t-full rounded-bl-full border border-shadow-border bg-white'
      >
        {isOptPending ? (
          <IconLoading />
        ) : (
          <>
            {hover && (
              <>
                <motion.div
                  initial={'false'}
                  animate={hover ? 'show' : 'hide'}
                  variants={iconVariants}
                  className='flex-center bg-primary h-[30px] rounded-full bg-shadow-100 hover:bg-primary-200'
                >
                  <Image src='/reply.svg' alt='reply' width={24} height={24} />
                </motion.div>
                <motion.div
                  initial={'false'}
                  animate={hover ? 'show' : 'hide'}
                  variants={iconVariants}
                  className='flex-center bg-primary h-[30px] rounded-full bg-shadow-100 hover:bg-primary-200'
                >
                  <Image
                    onClick={handleOptimze}
                    src='/optimize.svg'
                    alt='polish'
                    width={20}
                    height={20}
                  />
                </motion.div>
              </>
            )}
            <div className='flex-center bg-primary h-[30px] w-[30px] rounded-full bg-primary-200'>
              <Image
                src='/robotoutline.png'
                alt='robot'
                width={24}
                height={24}
                priority
              />
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

const TextOptimizeBar = dynamic(() => Promise.resolve(OptimizeBar), {
  ssr: false,
});
const MemoizedTextOptimizeBar = memo(TextOptimizeBar);

export { MemoizedTextOptimizeBar as TextOptimizeBar };
