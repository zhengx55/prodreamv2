'use client';
import { countWords } from '@/lib/utils';
import { createDoc } from '@/query/api';
import useRootStore from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { m } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import RotbotLoader from '../root/RotbotLoader';
import { PolishNow } from '../root/SvgComponents';
import Tooltip from '../root/Tooltip';
import { Button } from '../ui/button';
import TextStreamingEffect from './TextStreamingEffect';

const OutcomePanel = ({
  printIndexRef,
  animatedWordCount,
  incrementCount,
}: {
  printIndexRef: React.MutableRefObject<number>;
  animatedWordCount: number;
  incrementCount: () => void;
}) => {
  const router = useRouter();
  const { mutateAsync: createNew } = useMutation({
    mutationFn: (params: { text?: string; file?: File }) =>
      createDoc(params.text, params.file),
    onSuccess: (data) => {
      router.push(`/writtingpal/polish/${data}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const historyData = useRootStore((state) => state.bshistoryData);
  const isSubmiting = useRootStore((state) => state.bsisSubmiting);
  const startTyping = useRootStore((state) => state.bsstartTyping);
  const eassyResult = useRootStore((state) => state.bseassyResult);
  const submitError = useRootStore((state) => state.bssubmitError);
  const handlePolish = async () => {
    if (!historyData.result && !eassyResult) {
      return;
    }
    await createNew({
      text: historyData.result ? historyData.result : eassyResult,
    });
  };
  return (
    <m.div
      key='outcome'
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className='h-full w-full overflow-hidden pb-4 pl-2'
    >
      <div className='relative h-full w-full rounded-md bg-white px-6 pb-14 pt-6 shadow-panel'>
        {submitError && !historyData.result ? (
          // todo
          <p>error</p>
        ) : (
          <>
            <div className=' h-full w-full select-text overflow-y-auto overflow-x-hidden'>
              {isSubmiting ? (
                <RotbotLoader
                  label='Branstorming'
                  labelClass='text-black-200 body-medium'
                />
              ) : (
                <p className='prose max-w-max whitespace-pre-line'>
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
              <p className='small-regular text-shadow'>
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
                      toast.success('Copy to clipboard');
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
                  <PolishNow />
                  Polish Now
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </m.div>
  );
};

export default OutcomePanel;
