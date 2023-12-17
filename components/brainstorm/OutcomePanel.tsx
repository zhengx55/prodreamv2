'use client';
import { motion } from 'framer-motion';
import RotbotLoader from '../root/RotbotLoader';
import { Button } from '../ui/button';
import { countWords } from '@/lib/utils';
import Tooltip from '../root/Tooltip';
import TextStreamingEffect from './TextStreamingEffect';
import PanelError from '../root/PanelError';
import { useBrainStormContext } from '@/context/BrainStormProvider';
import { useToast } from '../ui/use-toast';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useAIEditorStore from '@/zustand/store';

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
  const update = useAIEditorStore((state) => state.updateEditor_html);
  const { toast } = useToast();
  const router = useRouter();
  const handlePolish = () => {
    if (!historyData.result && !eassyResult) {
      return;
    }
    update(historyData.result ? historyData.result : eassyResult);
    router.push('/writtingpal/polish');
  };
  return (
    <motion.div
      key='outcome'
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className='h-full w-full overflow-hidden pb-4 pl-2'
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
              <p
                className='small-regular text-shadow
                  '
              >
                {historyData.result
                  ? countWords(historyData.result)
                  : startTyping
                    ? animatedWordCount
                    : countWords(eassyResult)}
                &nbsp;Words
              </p>
              <div className='flex items-center gap-x-2'>
                <Tooltip tooltipContent='download'>
                  <div className='tooltip'>
                    <Image
                      src='/download.svg'
                      alt='download'
                      width={1000}
                      height={2000}
                      className='h-5 w-5'
                    />
                    Download
                  </div>
                </Tooltip>
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
                    <Image
                      src='/copy.svg'
                      alt='copy'
                      width={1000}
                      height={2000}
                      className='h-5 w-5'
                    />
                    Copy
                  </div>
                </Tooltip>
                <Button
                  onClick={handlePolish}
                  className='rounded-md'
                  size={'sm'}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M12.5025 5.32L14.0025 6L13.3225 4.5L14.0025 3L12.5025 3.68L11.0025 3L11.6825 4.5L11.0025 6L12.5025 5.32ZM18.8825 5.96L21.0025 5L20.0425 7.12L21.0025 9.24L18.8825 8.28L16.7625 9.24L17.7225 7.12L16.7625 5L18.8825 5.96ZM11.1725 8.83C12.2725 7.72 14.0625 7.72 15.1725 8.83C16.2825 9.93 16.2825 11.72 15.1725 12.83L7.8325 20.17C6.7325 21.28 4.9425 21.28 3.8325 20.17C2.7225 19.07 2.7225 17.28 3.8325 16.17L11.1725 8.83ZM11.7725 14.11L14.1225 11.76C14.6425 11.24 14.6425 10.4 14.1225 9.88C13.6025 9.36 12.7625 9.36 12.2425 9.88L9.8925 12.23C9.3725 12.75 9.3725 13.59 9.8925 14.11C10.4125 14.63 11.2525 14.63 11.7725 14.11ZM15.0025 15L18.0025 16.36L21.0025 15L19.6425 18L21.0025 21L18.0025 19.64L15.0025 21L16.3625 18L15.0025 15Z'
                      fill='white'
                    />
                  </svg>
                  Polish Now
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default OutcomePanel;
