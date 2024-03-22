import Tiplayout from '@/components/editor/guide/tips/Tiplayout';
import { Book } from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { CitationTooltip } from '@/constant/enum';
import { useMutateTrackInfo, useUserTrackInfo } from '@/query/query';
import { useCitation, useUserTask } from '@/zustand/store';
import useThrottledCallback from 'beautiful-react-hooks/useThrottledCallback';
import useUpdateEffect from 'beautiful-react-hooks/useUpdateEffect';
import useWindowResize from 'beautiful-react-hooks/useWindowResize';
import { AnimatePresence, m } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import dynamic from 'next/dynamic';
import { memo, useState } from 'react';
import Empty from './library/Empty';

const InTextList = dynamic(() => import('./library/InTextList'));
const LibraryList = dynamic(() => import('./library/LibraryList'));

const Mine = () => {
  const showMine = useCitation((state) => state.showMineCitation);
  const setShowMine = useCitation((state) => state.updateShowMineCitation);
  const onWindowResize = useWindowResize();
  const [height, setHeight] = useState(window.innerHeight);

  onWindowResize(
    useThrottledCallback(() => {
      setHeight(window.innerHeight);
    })
  );
  const [type, setType] = useState<number | null>(null);
  const citation_tooltip_step = useUserTask((state) => state.citation_step);
  const IndocCitationIds = useCitation((state) => state.inDocCitationIds);
  const InTextCitationIds = useCitation((state) => state.inTextCitationIds);
  const resetCitationStep = useUserTask((state) => state.resetCitationStep);
  const { data: track, isPending } = useUserTrackInfo();
  const { mutateAsync: updateTrack } = useMutateTrackInfo();

  const onPressHandler = (pressed: boolean, index: number) => {
    if (pressed) {
      setShowMine(true);
      setType(index);
    } else {
      setType(null);
    }
  };

  useUpdateEffect(() => {
    if (!showMine) setType(null);
    if (showMine && !type) setType(0);
  }, [showMine]);

  if (isPending) return null;
  return (
    <m.div
      initial={false}
      variants={{
        show: { height: '80%' },
        hide: {
          height:
            !track?.citation_empty_check &&
            citation_tooltip_step === 0 &&
            IndocCitationIds.length === 0 &&
            InTextCitationIds.length === 0
              ? height >= 800
                ? '40%'
                : '60%'
              : '40px',
        },
      }}
      transition={{ delay: 0.2 }}
      animate={showMine ? 'show' : 'hide'}
      className='absolute bottom-0 flex w-full flex-col gap-x-2 border-t border-gray-200 bg-white'
    >
      <div className='flex-between items-center py-1.5'>
        <div className='flex items-center gap-x-2'>
          <Book />
          <p
            className='small-regular cursor-pointer text-doc-primary'
            onClick={() => {
              setShowMine(true);
              setType(0);
            }}
          >
            My Library
          </p>
        </div>
        <div className='flex items-center gap-x-2'>
          <Toggle
            pressed={type === 0}
            onPressedChange={(pressed: boolean) => onPressHandler(pressed, 0)}
            className='small-regular text-doc-shadow data-[state=on]:bg-doc-primary/20 data-[state=on]:text-doc-primary'
          >
            All
          </Toggle>
          {citation_tooltip_step === 4 ? (
            <Tiplayout
              title={CitationTooltip.STEP4_TITLE}
              content={CitationTooltip.STEP4_TEXT}
              step={citation_tooltip_step}
              side='top'
              totalSteps={4}
              buttonLabel='done'
              onClickCallback={() => {
                resetCitationStep();
              }}
            >
              <Toggle
                pressed={type === 1}
                onPressedChange={(pressed: boolean) =>
                  onPressHandler(pressed, 1)
                }
                className='small-regular text-doc-shadow data-[state=on]:bg-doc-primary/20 data-[state=on]:text-doc-primary'
              >
                In this doc
              </Toggle>
            </Tiplayout>
          ) : (
            <Toggle
              pressed={type === 1}
              onPressedChange={(pressed: boolean) => onPressHandler(pressed, 1)}
              className='small-regular text-doc-shadow data-[state=on]:bg-doc-primary/20 data-[state=on]:text-doc-primary'
            >
              In this doc
            </Toggle>
          )}
          <Button
            onClick={async () => {
              setShowMine(!showMine);
              !track?.citation_empty_check &&
                (await updateTrack({
                  field: 'citation_empty_check',
                  data: true,
                }));
            }}
            className='h-max w-max rounded bg-doc-primary px-2 py-1'
          >
            <ChevronUp
              className={`${showMine && 'rotate-180 transition-transform'}`}
              size={18}
            />
          </Button>
        </div>
      </div>
      <Empty />
      <AnimatePresence>
        {showMine && (type === 0 ? <LibraryList /> : <InTextList />)}
      </AnimatePresence>
    </m.div>
  );
};
export default memo(Mine);
