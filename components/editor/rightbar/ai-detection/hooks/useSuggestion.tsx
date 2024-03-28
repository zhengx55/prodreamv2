import { batchHumanize } from '@/query/api';
import { Sentence } from '@/types';
import { useAIEditor } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { v4 } from 'uuid';

export default function useSuggestion(suggestions: [number[]]) {
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [generating, setGenerating] = useState(false);
  const editor = useAIEditor((state) => state.editor_instance);
  const texts = useMemo(() => {
    if (!editor) return [];
    let editor_text: string | undefined;
    const title = editor?.getJSON().content?.at(0)?.content?.at(0)?.text;
    editor_text = editor?.getText()?.replace(title!, '').trimStart();
    return suggestions.map(([start, end]) => {
      return editor_text.slice(start, end).trim();
    });
  }, [editor, suggestions]);

  const { mutateAsync: humanize } = useMutation({
    mutationFn: () => batchHumanize(texts),
    onMutate: () => {
      setGenerating(true);
    },
    onSuccess: async (data) => {
      if (data) {
        const reader = data.pipeThrough(new TextDecoderStream()).getReader();
        let finalValue = [];
        while (true) {
          const { value, done } = await reader.read();
          if (value) {
            finalValue.push(value);
          }
          if (done) {
            handleStreamData(finalValue.join('\n'));
            break;
          }
        }
      }
    },
    onSettled: () => {
      setGenerating(false);
    },
  });

  const handleStreamData = useCallback(
    (value: string) => {
      if (!value) return;
      const lines = value.split('\n');
      const eventData = lines
        .filter((line) => line.startsWith('data:'))
        .map((line) => JSON.parse(line.slice('data:'.length)));
      const sentences = eventData.map((item, index) => {
        return {
          id: v4(),
          expand: false,
          text: texts[index],
          result: item,
        };
      });
      setSentences(sentences);
    },
    [texts]
  );

  return { sentences, setSentences, generating, humanize };
}
