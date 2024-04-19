import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useAIEditor } from '@/zustand/store';
import { NodeViewContent, NodeViewProps, NodeViewWrapper } from '@tiptap/react';
import { useAnimationFrame } from 'framer-motion';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useUnmount } from 'react-use';
const ContinueResult = (props: NodeViewProps) => {
  const [showAccept, setShowAccept] = useState(false);
  const continueResult = useAIEditor((state) => state.continueResult);
  const continueInsertPos = useAIEditor((state) => state.continueInsertPos);
  const clearContinueRes = useAIEditor((state) => state.clearContinueRes);
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeout = useRef<NodeJS.Timeout>();

  const handleAccept = useCallback(() => {
    props.deleteNode();
    props.editor
      .chain()
      .focus()
      .insertContentAt(continueInsertPos ?? 0, ` ${continueResult}`)
      .run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [continueInsertPos, continueResult, props]);

  useEffect(() => {
    if (!continueResult) {
      return;
    }
    if (currentIndex < continueResult.length) {
      timeout.current = setTimeout(() => {
        setCurrentText((prevText) => prevText + continueResult[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 10);
    } else {
      setShowAccept(true);
      timeout.current && clearTimeout(timeout.current);
    }
    return () => {
      clearTimeout(timeout.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, continueResult]);

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        event.preventDefault();
        handleAccept();
      } else {
        props.deleteNode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleAccept]);

  useAnimationFrame(() => {
    if (!continueResult) {
      props.deleteNode();
    }
  });

  useUnmount(() => {
    clearContinueRes();
  });

  return (
    <NodeViewWrapper as={'span'} className='relative'>
      <NodeViewContent
        as='span'
        className='pointer-events-none select-none text-violet-500'
      >
        &nbsp;{currentText}
      </NodeViewContent>
      {showAccept && (
        <TooltipProvider>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <Button
                role='button'
                onClick={handleAccept}
                className='absolute -bottom-1 ml-1 h-max w-max cursor-pointer rounded bg-white p-0.5 shadow-[0px_2px_4px_0px_#DEE0EF]'
              >
                <span className='rounded bg-violet-500 px-1 py-0.5'>
                  <p className='small-regular text-white'>Accept</p>
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent className='rounded-lg py-2'>
              <div className='flex items-center gap-x-2'>
                <span className='small-regular rounded bg-[#64626A] px-2 py-1 text-white'>
                  tab
                </span>
                <p className='small-regular text-[#64626A]'>
                  for accept shortcut
                </p>
              </div>
              <Spacer y='10' />
              <div className='flex items-center gap-x-2'>
                <span className='small-regular rounded bg-[#64626A] px-2 py-1 text-white'>
                  delete
                </span>
                <p className='small-regular text-[#64626A]'>to discard</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </NodeViewWrapper>
  );
};
export default memo(ContinueResult);
