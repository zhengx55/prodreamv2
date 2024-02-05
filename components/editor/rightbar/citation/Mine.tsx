import Tiplayout from '@/components/polish/guide/tips/Tiplayout';
import { Book } from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { CitationTooltip } from '@/constant/enum';
import { useUserTrackInfo } from '@/query/query';
import useAiEditor, { useUserTask } from '@/zustand/store';
import useUpdateEffect from 'beautiful-react-hooks/useUpdateEffect';
import { AnimatePresence, m } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import dynamic from 'next/dynamic';
import { memo, useState } from 'react';
import Empty from './Empty';

const InTextList = dynamic(() => import('./InTextList'));
const LibraryList = dynamic(() => import('./LibraryList'));

const Mine = () => {
  const [showMine, setShowMine] = useState(false);
  const [type, setType] = useState<number | null>(null);
  const citation_tooltip_step = useUserTask((state) => state.citation_step);
  const IndocCitationIds = useAiEditor((state) => state.inDocCitationIds);
  const InTextCitationIds = useAiEditor((state) => state.inTextCitationIds);
  const resetCitationStep = useUserTask((state) => state.resetCitationStep);
  const { data: track, isPending } = useUserTrackInfo();

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
            IndocCitationIds.length === 0 &&
            InTextCitationIds.length === 0
              ? '40%'
              : '40px',
        },
      }}
      transition={{ delay: 0.2 }}
      animate={showMine ? 'show' : 'hide'}
      className='absolute bottom-0 flex w-full flex-col gap-x-2 border-t border-shadow-border bg-white'
    >
      <div className='flex-between items-center py-1.5'>
        <div className='flex items-center gap-x-2'>
          <Book />
          <p className='small-regular text-doc-primary'>My Libary</p>
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
            onClick={() => setShowMine((prev) => !prev)}
            className='h-max w-max rounded bg-doc-primary px-2 py-1'
          >
            <ChevronUp
              className={`${showMine && 'rotate-180 transition-transform'}`}
              size={18}
            />
          </Button>
        </div>
      </div>
      <Empty
        show={
          !track?.citation_empty_check &&
          IndocCitationIds.length === 0 &&
          InTextCitationIds.length === 0
        }
      />
      <AnimatePresence>
        {showMine && (type === 0 ? <LibraryList /> : <InTextList />)}
      </AnimatePresence>
    </m.div>
  );
};
export default memo(Mine);
