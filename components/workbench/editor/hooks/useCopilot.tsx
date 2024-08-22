import { ask, copilot, humanize } from '@/query/api';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useRef, useState } from 'react';

export default function useCopilot() {
  const [state, setState] = useState({
    aiResult: [] as string[],
    hoverItem: null as string | null,
    currentResult: -1,
    session: '',
    isWaiting: false,
  });

  const tool = useRef<string | null>(null);

  const handleStreamData = (value: string | undefined) => {
    if (!value) return;

    const lines = value.split('\n');
    let sessionId: string | undefined;
    const eventData = lines.reduce((acc, line, index) => {
      if (lines[index - 1]?.startsWith('event: session_id')) {
        sessionId = line.replace('data: ', '').replace(/"/g, '').trim();
      }
      if (
        line.startsWith('data:') &&
        lines[index - 1]?.startsWith('event: data')
      ) {
        acc.push(JSON.parse(line.slice(5)));
      }
      return acc;
    }, [] as string[]);

    if (sessionId) {
      setState((prevState) => ({
        ...prevState,
        session: sessionId || '',
      }));
    }

    setState((prevState) => {
      const newResult =
        prevState.aiResult.length === 0 ||
        prevState.aiResult.length - 1 < prevState.currentResult
          ? [...prevState.aiResult, eventData.join('')]
          : prevState.aiResult.map((item, index) =>
              index === prevState.currentResult
                ? item + eventData.join('')
                : item
            );

      return {
        ...prevState,
        aiResult: newResult,
        isWaiting: false,
      };
    });
  };

  // 提取 onMutate 函数
  const handleOnMutate = () => {
    setState((prev) => ({
      ...prev,
      currentResult: prev.currentResult + 1,
      isWaiting: true,
    }));
  };

  // 提取 onSuccess 函数
  const handleOnSuccess = async (
    body: ReadableStream,
    toolName: string,
    variables: any
  ) => {
    tool.current = toolName === 'humanize' ? toolName : variables.tool;
    const reader = body.pipeThrough(new TextDecoderStream()).getReader();
    let firstChunk = true;
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        setState((prevState) => ({
          ...prevState,
          hoverItem: 'copilot-operation-01',
        }));
        break;
      }
      if (firstChunk) {
        setState((prevState) => ({
          ...prevState,
          isWaiting: false,
        }));
        firstChunk = false;
      }
      handleStreamData(value);
    }
  };

  // 提取 onError 函数
  const handleOnError = async (error: unknown) => {
    setState((prevState) => ({
      ...prevState,
      isWaiting: false,
      currentResult: prevState.currentResult - 1,
    }));
    const { toast } = await import('sonner');
    toast.error((error as Error).message);
  };

  const { mutate: handleCopilot } = useMutation({
    mutationFn: copilot,
    onError: handleOnError,
    onMutate: handleOnMutate,
    onSuccess: (body, variables) => handleOnSuccess(body, 'copilot', variables),
  });

  const { mutate: handleHumanize } = useMutation({
    mutationFn: humanize,
    onError: handleOnError,
    onMutate: handleOnMutate,
    onSuccess: (body) => handleOnSuccess(body, 'humanize', {}),
  });

  const { mutate: handleAsk } = useMutation({
    mutationFn: ask,
    onError: handleOnError,
    onMutate: handleOnMutate,
    onSuccess: (body, variables) => handleOnSuccess(body, 'ask', variables),
  });

  const nextResult = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      currentResult:
        prevState.currentResult === prevState.aiResult.length - 1
          ? prevState.currentResult
          : prevState.currentResult + 1,
    }));
  }, []);

  const prevResult = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      currentResult:
        prevState.currentResult === 0 ? 0 : prevState.currentResult - 1,
    }));
  }, []);

  const hasResult = state.aiResult.length > 0;

  return {
    ...state,
    setAiResult: (aiResult: string[]) =>
      setState((prevState) => ({ ...prevState, aiResult })),
    setHoverItem: (hoverItem: string | null) =>
      setState((prevState) => ({ ...prevState, hoverItem })),
    setSession: (session: string) =>
      setState((prevState) => ({ ...prevState, session })),
    tool,
    handleCopilot,
    handleHumanize,
    handleAsk,
    hasResult,
    nextResult,
    prevResult,
  };
}
