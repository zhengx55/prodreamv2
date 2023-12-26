'use client';
import { queryPolish, submitPolish } from '@/query/api';
import { IPolishParams } from '@/query/type';
import useRootStore from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import useDebouncedCallback from 'beautiful-react-hooks/useDebouncedCallback';
import useToggle from 'beautiful-react-hooks/useToggle';
import { AnimatePresence } from 'framer-motion';
import { SetStateAction, memo, useCallback, useRef, useState } from 'react';
import { toast } from 'sonner';
import useDeepCompareEffect from 'use-deep-compare-effect';
import Spacer from '../../root/Spacer';
import PresetOptions from '../rightbar/PresetOptions';
import ChatEditInputField from './ChatEditInputField';
import ChatEditResItem from './ChatEditResItem';

type IChatEditItem = {
  original: string;
  result: string;
  instruction: string | number;
  expand: boolean;
};

type Range = {
  from: number;
  to: number;
};

const ChatEditPanel = () => {
  const [isPolishing, setIsPolishing] = useToggle(false);
  const [hasHighLight, toggleHasHighlight] = useToggle(false);
  const [polishResult, setPolishResult] = useState<IChatEditItem[]>([]);
  const [range, setRange] = useState<Range | null>(null);
  const [selectedText, setSelectedText] = useState('');
  const listRef = useRef<HTMLUListElement>(null);
  const reqTimer = useRef<NodeJS.Timeout | undefined>();
  const editor_instance = useRootStore((state) => state.editor_instance);
  const setSelectedTextHanlder = useDebouncedCallback((value: string) => {
    setSelectedText(value);
  });
  editor_instance?.on('focus', ({ editor }) => {
    if (hasHighLight) {
      toggleHasHighlight();
      editor_instance
        ?.chain()
        .setTextSelection({ from: range!.from, to: range!.to })
        .unsetHighlight()
        .setTextSelection(editor.state.selection.from)
        .run();
      setRange(null);
    }
    return;
  });

  editor_instance?.on('selectionUpdate', ({ editor }) => {
    const { from, to } = editor?.state.selection;
    if (from !== to) {
      setSelectedTextHanlder(editor.getText().substring(from - 1, to));
      setRange({ from, to });
    }
  });

  const memoRemoveSelectedText = useCallback(() => {
    setSelectedText('');
  }, []);

  const memoRemoveRange = useCallback(() => {
    setRange(null);
  }, []);

  const scrollToBottom = () => {
    if (listRef.current) {
      listRef.current.scrollTop =
        listRef.current.scrollHeight - listRef.current.clientHeight;
    }
  };

  useDeepCompareEffect(() => {
    scrollToBottom();
  }, [polishResult]);

  const memoSetPolishResult = useCallback(
    (newItem: SetStateAction<IChatEditItem[]>) => {
      setPolishResult(newItem);
    },
    []
  );

  const { mutateAsync: polish } = useMutation({
    mutationFn: (params: IPolishParams) => submitPolish(params),
    onMutate: () => {
      setIsPolishing();
      toggleHasHighlight();
    },
    onError: (err) => {
      setIsPolishing();
      toast.error(err.message);
    },
    onSuccess: (data, variables) => {
      reqTimer.current = setInterval(async () => {
        try {
          const res = await queryPolish({ task_id: data });
          if (res.status === 'done') {
            setIsPolishing();
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
            if (!editor_instance) return;
            editor_instance
              .chain()
              .setTextSelection({ from: range!.from, to: range!.to })
              .setHighlight({ color: '#E9DAFF' })
              .run();
            toggleHasHighlight();
            clearInterval(reqTimer.current);
          }
        } catch (error: any) {
          toast.error(error.message);
          clearInterval(reqTimer.current);
        }
      }, 2000);
    },
  });

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
              <ChatEditResItem
                key={`chat-edit-${idx}`}
                isExpand={isExpand}
                item={result}
                range={range}
                idx={idx}
                setPolishResult={memoSetPolishResult}
                resetRange={memoRemoveRange}
                polish={polish}
              />
            );
          })}
        </AnimatePresence>
      </ul>
      <Spacer y='10' />
      <PresetOptions
        isPolishing={isPolishing}
        polish={polish}
        selectedText={selectedText}
        removeSelected={memoRemoveSelectedText}
      />
      <Spacer y='10' />
      <ChatEditInputField selectedText={selectedText} handleSubmit={polish} />
    </div>
  );
};

export default memo(ChatEditPanel);
