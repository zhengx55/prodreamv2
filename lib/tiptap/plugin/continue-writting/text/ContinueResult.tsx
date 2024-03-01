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
import { CornerDownLeft } from 'lucide-react';
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
        <Button
          role='button'
          onClick={handleAccept}
          className='absolute bottom-0 h-6 w-6 cursor-pointer rounded bg-white px-0 shadow-[0px_2px_4px_0px_#DEE0EF]'
        >
          <TooltipProvider>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <span className='rounded bg-doc-primary'>
                  <CornerDownLeft className='text-white' size={18} />
                </span>
              </TooltipTrigger>
              <TooltipContent className='py-2'>
                <p>Accept</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Button>
      )}
    </NodeViewWrapper>
  );
};
export default memo(ContinueResult);
