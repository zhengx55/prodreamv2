'use client';
import { motion } from 'framer-motion';
import RotbotLoader from '../root/RotbotLoader';
import { Button } from '../ui/button';
import { Copy, Download, Trophy } from 'lucide-react';
import { countWords } from '@/lib/utils';
import Tooltip from '../root/Tooltip';
import TextStreamingEffect from './TextStreamingEffect';
import PanelError from '../root/PanelError';
import { useBrainStormContext } from '@/context/BrainStormProvider';
import { useToast } from '../ui/use-toast';

const OutcomePanel = ({
  printIndexRef,
  animatedWordCount,
  incrementCount,
}: {
  printIndexRef: React.MutableRefObject<number>;
  animatedWordCount: number;
  incrementCount: () => void;
}) => {
  const { historyData, startTyping, eassyResult, isSubmiting, submitError } =
    useBrainStormContext();
  const { toast } = useToast();

  return (
    <motion.div
      key='outcome'
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className='h-full w-full overflow-hidden py-4 pl-2 pr-6'
    >
      <div className='relative h-full w-full rounded-md bg-white px-6 pb-14 pt-6 shadow-panel'>
        {submitError && !historyData.result ? (
          <PanelError />
        ) : (
          <>
            <div className=' h-full w-full select-text overflow-y-auto overflow-x-hidden'>
              {isSubmiting ? (
                <RotbotLoader
                  label='Branstorming'
                  labelClass='text-black-200 body-medium'
                />
              ) : (
                <p className='small-normal whitespace-pre-line'>
                  {historyData.result ? (
                    historyData.result
                  ) : startTyping ? (
                    <TextStreamingEffect
                      setWorkCount={incrementCount}
                      printIndexRef={printIndexRef}
                      text={eassyResult}
                      speed={10}
                    />
                  ) : (
                    eassyResult
                  )}
                </p>
              )}
            </div>

            <div className='flex-between absolute bottom-2 left-0 flex h-12 w-full px-6'>
              <div className='flex items-center gap-x-2'>
                <div className='tooltip'>
                  <p className='small-semibold'>
                    {historyData.result
                      ? countWords(historyData.result)
                      : startTyping
                        ? animatedWordCount
                        : countWords(eassyResult)}
                    &nbsp;Words
                  </p>
                </div>
                <Tooltip tooltipContent='copy'>
                  <div
                    onClick={() => {
                      navigator.clipboard.writeText(
                        historyData.result ? historyData.result : eassyResult
                      );
                      toast({
                        variant: 'default',
                        description: 'Copy to clipboard',
                      });
                    }}
                    className='tooltip'
                  >
                    <Copy size={18} />
                  </div>
                </Tooltip>
                <Tooltip tooltipContent='download'>
                  <div className='tooltip'>
                    <Download size={18} />
                  </div>
                </Tooltip>
                <Tooltip tooltipContent='Rating'>
                  <div className='tooltip'>
                    <Trophy size={18} />
                  </div>
                </Tooltip>
                <Button size={'sm'}>Polish Now</Button>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default OutcomePanel;
