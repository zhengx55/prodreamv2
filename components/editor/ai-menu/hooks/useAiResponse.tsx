import { ask, copilot } from '@/query/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useUpdateEffect from 'beautiful-react-hooks/useUpdateEffect';
import { MutableRefObject, useCallback, useState } from 'react';

const useAiResponse = (tool: MutableRefObject<string | null>) => {
  const queryClient = useQueryClient();
  const [hoverItem, setHoverItem] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [aiResult, setAiResult] = useState<string[]>([]);
  const [currentResult, setCurrentResult] = useState(0);
  const { mutateAsync: handleCopilot } = useMutation({
    mutationFn: (params: { tool: string; text: string }) => copilot(params),
    onMutate: () => {
      setGenerating(true);
      setShowTyping(true);
    },
    onSuccess: async (data: ReadableStream, variables) => {
      queryClient.invalidateQueries({ queryKey: ['membership'] });
      tool.current = variables.tool;
      const reader = data.pipeThrough(new TextDecoderStream()).getReader();
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          setHoverItem('copilot-operation-01');
          break;
        }
        handleStreamData(value);
      }
    },
    onError: async (error) => {
      const toast = (await import('sonner')).toast;
      setGenerating(false);
      toast.error(error.message);
    },
  });

  const { mutateAsync: handleAsk } = useMutation({
    mutationFn: (params: { instruction: string; text: string }) => ask(params),
    onMutate: () => {
      setGenerating(true);
    },
    onSuccess: async (data: ReadableStream) => {
      queryClient.invalidateQueries({ queryKey: ['membership'] });
      const reader = data.pipeThrough(new TextDecoderStream()).getReader();
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          setHoverItem('copilot-operation-01');
          break;
        }
        handleStreamData(value);
      }
    },

    onError: async (error) => {
      const toast = (await import('sonner')).toast;
      setGenerating(false);
      toast.error(error.message);
    },
  });

  const handleStreamData = (value: string | undefined) => {
    if (!value) return;
    const lines = value.split('\n');
    const dataLines = lines.filter(
      (line, index) =>
        line.startsWith('data:') &&
        lines.at(index - 1)?.startsWith('event: data')
    );
    const eventData = dataLines.map((line) =>
      JSON.parse(line.slice('data:'.length))
    );

    setAiResult((prev) =>
      prev.length === 0
        ? [eventData.join('')]
        : prev.length - 1 < currentResult
          ? [...prev, eventData.join('')]
          : prev.map((item, index) => {
              if (index === currentResult) {
                return item + eventData.join('');
              }
              return item;
            })
    );
  };

  useUpdateEffect(() => {
    if (aiResult[currentResult]) {
      setGenerating(false);
    }
  }, [aiResult, currentResult]);

  const toogleTyping = useCallback(() => {
    setShowTyping(false);
  }, []);

  return {
    handleCopilot,
    handleAsk,
    hoverItem,
    generating,
    aiResult,
    setHoverItem,
    currentResult,
    setCurrentResult,
    toogleTyping,
    showTyping,
  };
};
export default useAiResponse;
