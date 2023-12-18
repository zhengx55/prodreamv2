'use client';
import { SetStateAction, memo, useCallback, useRef, useState } from 'react';
import Spacer from '../../root/Spacer';
import { usePreDefinedOptions } from '@/query/query';
import ChatEditInputField from './ChatEditInputField';
import { useMutation } from '@tanstack/react-query';
import { queryPolish, submitPolish } from '@/query/api';
import { IPolishParams } from '@/query/type';
import { toast } from 'sonner';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { AnimatePresence } from 'framer-motion';
import EditiorLoading from '../EditiorLoading';
import dynamic from 'next/dynamic';
import ChatEditResItem from './ChatEditResItem';
import useDebouncedCallback from 'beautiful-react-hooks/useDebouncedCallback';
import useRootStore from '@/zustand/store';

const PresetOptions = dynamic(() => import('../rightbar/PresetOptions'), {
  ssr: false,
});

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
  const [isPolishing, setIsPolishing] = useState(false);
  const [polishResult, setPolishResult] = useState<IChatEditItem[]>([]);
  const [range, setRange] = useState<Range>({ from: 0, to: 0 });
  const [selectedText, setSelectedText] = useState('');
  const listRef = useRef<HTMLUListElement>(null);
  const reqTimer = useRef<NodeJS.Timeout | undefined>();

  const { data: options, isPending: isOptionsLoading } = usePreDefinedOptions();

  const editor_instance = useRootStore((state) => state.editor_instance);

  const setSelectedTextHanlder = useDebouncedCallback((value: string) => {
    setSelectedText(value);
  });

  editor_instance?.on('selectionUpdate', ({ editor }) => {
    const { from, to } = editor?.state.selection;
    if (from !== to) {
      setSelectedTextHanlder(editor.getText().substring(from - 1, to));
      setRange({ from, to });
      editor.commands.setHighlight();
    }
  });

  const memoRemoveSelectedText = useCallback(() => {
    setSelectedText('');
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
      setIsPolishing(true);
    },
    onError: (err) => {
      setIsPolishing(false);
      toast.error(err.message);
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
            editor_instance
              ?.chain()
              .setTextSelection({ from: range.from, to: range.to })
              .setHighlight()
              .run();
            clearInterval(reqTimer.current);
          }
        } catch (error: any) {
          toast.error(error.message);
          clearInterval(reqTimer.current);
        }
      }, 2000);
    },
  });

  if (isOptionsLoading) return <EditiorLoading />;
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
                idx={idx}
                setPolishResult={memoSetPolishResult}
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
        options={options}
        selectedText={selectedText}
        removeSelected={memoRemoveSelectedText}
      />
      <Spacer y='10' />
      <ChatEditInputField selectedText={selectedText} handleSubmit={polish} />
    </div>
  );
};

export default memo(ChatEditPanel);
