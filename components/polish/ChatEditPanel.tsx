'use client';
import { memo, useRef, useState } from 'react';
import Spacer from '../root/Spacer';
import { useAiEditiorContext } from '@/context/AIEditiorProvider';
import { usePreDefinedOptions } from '@/query/query';
import ChatEditInputField from './ChatEditInputField';
import { ChevronUp, Loader2, RefreshCwIcon, Trash2 } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { queryPolish, submitPolish } from '@/query/api';
import { IPolishParams } from '@/query/type';
import { useToast } from '../ui/use-toast';
import { PresetInstructions } from '@/constant';
import { Button } from '../ui/button';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { AnimatePresence, motion } from 'framer-motion';

type IChatEditItem = {
  original: string;
  result: string;
  instruction: string | number;
  expand: boolean;
};

const ChatEditPanel = () => {
  const { essayRef, selectedRange, cursorIndex, selectText, setSelectText } =
    useAiEditiorContext();
  const { toast } = useToast();
  const reqTimer = useRef<NodeJS.Timeout | undefined>();
  const [isPolishing, setIsPolishing] = useState(false);
  const [polishResult, setPolishResult] = useState<IChatEditItem[]>([]);
  const listRef = useRef<HTMLUListElement>(null);
  const { data: options, isPending: isOptionsLoading } = usePreDefinedOptions();

  const scrollToBottom = () => {
    if (listRef.current) {
      listRef.current.scrollTop =
        listRef.current.scrollHeight - listRef.current.clientHeight;
    }
  };

  useDeepCompareEffect(() => {
    scrollToBottom();
  }, [polishResult]);

  const handleDismiss = (index: number) => {
    setPolishResult((prev) => {
      return prev.filter((_item, idx) => idx !== index);
    });
  };

  const { mutateAsync: polish } = useMutation({
    mutationFn: (params: IPolishParams) => submitPolish(params),
    onMutate: () => {
      setIsPolishing(true);
    },
    onError: (err) => {
      setIsPolishing(false);
      toast({
        variant: 'destructive',
        description: err.message,
      });
    },
    onSuccess: (data, variables) => {
      reqTimer.current = setInterval(async () => {
        try {
          const res = await queryPolish({ task_id: data });
          if (res.status === 'done') {
            setIsPolishing(false);
            const polishData = res.result as string;
            setPolishResult((prev) => [
              ...prev,
              {
                original: variables.text,
                result: polishData,
                instruction: variables.instruction!,
                expand: false,
              },
            ]);
            clearInterval(reqTimer.current);
          }
        } catch (error: any) {
          toast({
            description: error.message,
            variant: 'destructive',
          });
          clearInterval(reqTimer.current);
        }
      }, 2000);
    },
  });

  const handleInsert = (target: IChatEditItem) => {
    if (!essayRef.current) return;
    const eassyContent = essayRef.current.innerText;
    if (cursorIndex) {
      console.log(cursorIndex);
      // handle insert after current cursor
      const updateEassyContent = `${eassyContent.slice(0, cursorIndex)}${
        target.result
      }${eassyContent.slice(cursorIndex)}`;
      essayRef.current.innerHTML = `<span>${updateEassyContent}</span>`;
    }

    if (selectedRange) {
      console.log(
        '🚀 ~ file: ChatEditPanel.tsx:103 ~ handleInsert ~ selectedRange:',
        selectedRange
      );
      // handle substitude the current selection range
      const updateEassyContent = `${eassyContent.slice(0, selectedRange[0])}${
        target.result
      }${eassyContent.slice(selectedRange[1])}`;
      essayRef.current.innerHTML = `<span>${updateEassyContent}</span>`;
    }
    // if both conditions are false, insert to the original text positions and replace the original text
  };

  const handlePolishSubmit = async (option: string | number) => {
    if (!selectText) {
      toast({
        variant: 'destructive',
        description: 'no content selected',
      });
      return;
    }
    await polish({ instruction: option, text: selectText });
  };

  const handleRegenerate = async (item: IChatEditItem) => {
    await polish({ instruction: item.instruction, text: item.original });
  };
  if (isOptionsLoading) return null;
  return (
    <div className='relative flex min-h-full w-1/2 flex-col justify-between overflow-y-hidden'>
      <ul
        ref={listRef}
        className='flex h-full w-full flex-col gap-y-4 overflow-y-auto'
      >
        <AnimatePresence mode='sync'>
          {polishResult.map((result, idx) => {
            const isExpand = result.expand;
            return (
              <motion.li
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                layout='size'
                data-state={isExpand ? 'open' : 'close'}
                style={{ height: isExpand ? 'auto' : '90px' }}
                className='flex shrink-0 select-none flex-col gap-y-2 rounded-lg border border-shadow-border px-4 py-2 hover:bg-black-400/10 '
                key={`chat-edit-${idx}`}
              >
                <div
                  data-state={isExpand ? 'open' : 'close'}
                  className='flex-between [&[data-state=open]>svg]:rotate-180'
                >
                  <p className='subtle-regular text-shadow'>
                    {PresetInstructions[result.instruction.toString()] ??
                      result.instruction}
                  </p>
                  <ChevronUp
                    size={18}
                    onClick={() =>
                      setPolishResult((prev) => {
                        return prev.map((el, el_index) =>
                          el_index === idx ? { ...el, expand: !el.expand } : el
                        );
                      })
                    }
                    className='shrink-0 cursor-pointer text-shadow transition-transform duration-200'
                  />
                </div>

                {isExpand && (
                  <>
                    <p className='small-regular'>{result.result}</p>
                    <Button
                      variant={'ghost'}
                      className='subtle-regular flex w-max cursor-pointer items-center gap-x-2 px-0 text-shadow'
                      aria-label='regenerate'
                      onClick={() => handleRegenerate(result)}
                    >
                      <RefreshCwIcon size={18} className='text-shadow' />
                      Regenerate
                    </Button>
                    <Spacer y='10' />
                    <div className='flex items-start gap-x-2'>
                      <Button
                        onClick={() => handleInsert(result)}
                        className='rounded-md'
                      >
                        Insert
                      </Button>
                      <Button
                        onClick={() => handleDismiss(idx)}
                        variant={'ghost'}
                        className='text-shadow'
                      >
                        Dismiss
                      </Button>
                    </div>
                  </>
                )}
                {!isExpand && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.1 }}
                    className='small-regular line-clamp-2'
                  >
                    {result.result}
                  </motion.p>
                )}
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>

      <Spacer y='10' />
      {isPolishing ? (
        <div className='flex w-full shrink-0 gap-x-2 rounded-lg border border-shadow-border px-3 py-2 '>
          <h2 className='base-semibold'>Polishing:</h2>
          <Loader2 className='animate-spin' />
        </div>
      ) : (
        <div className='flex w-full shrink-0 flex-col gap-y-2 rounded-lg border border-shadow-border px-3 py-2 '>
          <h2 className='base-semibold'>Polishing:</h2>
          <div className='flex-between items-start'>
            <p className='base-regular line-clamp-4 w-11/12'>{selectText}</p>
            <Trash2
              onClick={() => setSelectText('')}
              className='cursor-pointer hover:text-shadow-100'
            />
          </div>
          <div className='flex flex-wrap gap-2'>
            {Object.keys(options).map((option, idx) => {
              return (
                <div
                  onClick={() => handlePolishSubmit(idx + 1)}
                  className='cursor-pointer rounded-lg border border-shadow-border px-4  py-1 hover:opacity-50'
                  key={option}
                >
                  {option}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <Spacer y='10' />
      <ChatEditInputField />
    </div>
  );
};

export default memo(ChatEditPanel);
