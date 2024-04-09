import { ask, copilot, humanize } from '@/query/api';
import { useMembershipInfo } from '@/query/query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MutableRefObject, useCallback, useState } from 'react';
import { useUpdateEffect } from 'react-use';

const useAiResponse = (tool: MutableRefObject<string | null>) => {
  const queryClient = useQueryClient();
  const { data: membership } = useMembershipInfo();
  const [hoverItem, setHoverItem] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [aiResult, setAiResult] = useState<string[]>([]);
  const [currentResult, setCurrentResult] = useState(-1);
  const [session, setSession] = useState('');
  const { mutateAsync: handleHumanize } = useMutation({
    mutationFn: (params: { text: string }) => humanize(params),
    onMutate: () => {
      setGenerating(true);
      setShowTyping(true);
    },
    onSuccess: async (data: ReadableStream) => {
      if (membership?.subscription === 'basic')
        queryClient.invalidateQueries({ queryKey: ['membership'] });
      tool.current = 'humanize';
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
      setShowTyping(false);
      toast.error(error.message);
    },
  });

  const { mutateAsync: handleCopilot } = useMutation({
    mutationFn: (params: {
      tool: string;
      text: string;
      writing_goal?: string;
    }) => copilot(params),
    onMutate: () => {
      setGenerating(true);
      setShowTyping(true);
    },
    onSuccess: async (data: ReadableStream, variables) => {
      if (membership?.subscription === 'basic')
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
      setShowTyping(false);
      toast.error(error.message);
    },
  });

  const { mutateAsync: handleAsk } = useMutation({
    mutationFn: (params: {
      instruction: string;
      text: string;
      writing_goal?: string;
      session_id?: string;
    }) => ask(params),
    onMutate: () => {
      setGenerating(true);
      setShowTyping(true);
    },
    onSuccess: async (data: ReadableStream, variables) => {
      queryClient.invalidateQueries({ queryKey: ['membership'] });
      const reader = data.pipeThrough(new TextDecoderStream()).getReader();
      tool.current = variables.text;
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
      setShowTyping(false);

      toast.error(error.message);
    },
  });

  const handleStreamData = (value: string | undefined) => {
    if (!value) return;
    const lines = value.split('\n');
    const session_raw = lines
      .filter(
        (line, index) =>
          lines.at(index - 1)?.startsWith('event: session_id') &&
          line?.startsWith('data: ')
      )
      .at(0);
    if (session_raw) {
      const session = session_raw.slice('data:'.length);
      setSession(session.replaceAll(/"/g, '').trim());
    }
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
    handleHumanize,
    session,
  };
};
export default useAiResponse;
