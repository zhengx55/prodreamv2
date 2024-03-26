import { batchHumanize } from '@/query/api';
import { Sentence } from '@/types';
import { useAIEditor } from '@/zustand/store';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { v4 } from 'uuid';

export default function useSuggestion(suggestions: [number[]]) {
  const [result, setResult] = useState<string[]>([]);
  const [sentences, setSentences] = useState<Sentence[]>([]);

  const editor = useAIEditor((state) => state.editor_instance);
  const texts = useMemo(() => {
    if (!editor) return [];
    return suggestions.map(([start, end]) =>
      editor.getText().slice(start, end)
    );
  }, [editor, suggestions]);

  const {
    data: humanize_result,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['humanize', texts],
    queryFn: () => batchHumanize(texts),
    staleTime: 1000 * 60 * 60 * 24,
    enabled: texts.length > 0,
  });

  const handleStreamData = useCallback((value: string) => {
    if (!value) return;
    const lines = value.split('\n');
    const eventData = lines
      .filter((line) => line.startsWith('data:'))
      .map((line) => JSON.parse(line.slice('data:'.length)))[0];
    setResult((prev) => [...prev, eventData]);
  }, []);

  useEffect(() => {
    async function batchRequest() {
      if (humanize_result) {
        const reader = humanize_result
          .pipeThrough(new TextDecoderStream())
          .getReader();
        let finalValue = [];

        while (true) {
          const { value, done } = await reader.read();
          if (value) {
            finalValue.push(value);
          }
          if (done) {
            break;
          }
        }
        handleStreamData(finalValue.join('\n'));
      }
    }
    batchRequest();
  }, [handleStreamData, humanize_result]);

  useEffect(() => {
    if (result.length > 0) {
      const sentences = suggestions.map((suggestion, index) => {
        return {
          id: v4(),
          expand: false,
          text: texts[index],
          result: result[index],
          ranges: [suggestion[0], suggestion[1] + 1],
        };
      });
      setSentences(sentences);
    }
  }, [result, suggestions, texts]);

  return { sentences, setSentences, isPending, isError };
}
