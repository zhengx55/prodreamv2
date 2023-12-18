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
import useAIEditorStore from '@/zustand/store';

const PresetOptions = dynamic(() => import('../rightbar/PresetOptions'), {
  ssr: false,
});

type IChatEditItem = {
  original: string;
  result: string;
  instruction: string | number;
  expand: boolean;
};

const ChatEditPanel = () => {
  const editor_instance = useAIEditorStore((state) => state.editor_instance);
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
      />
      <Spacer y='10' />
      <ChatEditInputField handleSubmit={polish} />
    </div>
  );
};

export default memo(ChatEditPanel);
