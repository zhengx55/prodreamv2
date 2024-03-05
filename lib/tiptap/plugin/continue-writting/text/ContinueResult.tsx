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
import useUnmount from 'beautiful-react-hooks/useUnmount';
import { useAnimationFrame } from 'framer-motion';
import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
const ContinueResult = (props: NodeViewProps) => {
  const [showAccept, setShowAccept] = useState(false);
  const generatedResult = useAIEditor((state) => state.continueResult);
  const continueInsertPos = useAIEditor((state) => state.continueInsertPos);
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeout = useRef<NodeJS.Timeout>();
  const clearContinueRes = useAIEditor((state) => state.clearContinueRes);

  const removeNode = () => {
    clearContinueRes();
    props.deleteNode();
  };

  const handleAccept = useCallback(() => {
    removeNode();
    props.editor
      .chain()
      .focus()
      .insertContentAt(continueInsertPos ?? 0, ` ${generatedResult}`)
      .run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [continueInsertPos, generatedResult]);

  useLayoutEffect(() => {
    if (!generatedResult) {
      return;
    }
    if (currentIndex < generatedResult.length) {
      timeout.current = setTimeout(() => {
        setCurrentText((prevText) => prevText + generatedResult[currentIndex]);
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
  }, [currentIndex, generatedResult]);

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      event.preventDefault();
      if (event.key === 'Tab') {
        handleAccept();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleAccept]);

  useAnimationFrame(() => {
    if (!generatedResult) {
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
        contentEditable={false}
        className='pointer-events-none select-none text-doc-primary'
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
                className='absolute bottom-0 h-max w-max cursor-pointer rounded bg-white p-0.5 shadow-[0px_2px_4px_0px_#DEE0EF]'
              >
                <span className='rounded bg-doc-primary px-1 py-0.5'>
                  <p className='base-regular text-white'>Accept</p>
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
