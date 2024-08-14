import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { findNodePos, findParagpraph } from '@/lib/tiptap/utils';
import { useBatchHumanize } from '@/query/copilot';
import { useEditor } from '@/zustand/store';
import { Loader2 } from 'lucide-react';
import { memo, useCallback, useState } from 'react';
import Starter from '../common/Starter';
import HumanizerItem from './HumanizerItem';

type Props = {
  highlight_sentences: [number[], number[], string][];
  human_percent: number;
};

const Humanize = ({ highlight_sentences, human_percent }: Props) => {
  const editor = useEditor((state) => state.editor);
  const [expanded, setExpanded] = useState(-1);
  const [showRecheck, setShowRecheck] = useState(false);
  const [suggestions, setSuggestions] = useState<
    [number[], number[], string][]
  >([]);

  const toggleExpand = useCallback(
    (item: [number[], number[], string], index: number) => {
      setExpanded(index);
      const editor_block = editor?.getJSON().content ?? [];
      const nodeText = findParagpraph(item[0], editor_block)?.text;
      const nodePos = findNodePos(editor!, nodeText!);
      const selection_range = item[1][1] - item[1][0];
      const from = nodePos.nodePos;
      const to = from + selection_range;
      editor?.chain().focus().setTextSelection({ from, to }).run();
    },
    [editor]
  );

  const { mutate, isPending } = useBatchHumanize(async (data) => {
    let resultWithSuggestion: [number[], number[], string][] = [];
    resultWithSuggestion = highlight_sentences.map((item, index) => {
      return [item[0], item[1], data[index]];
    });
    setSuggestions(resultWithSuggestion);
    toggleExpand(resultWithSuggestion[0], 0);
  });

  const handleAcceptAll = () => {
    const editor_block = editor?.getJSON().content ?? [];
    suggestions?.map((item) => {
      const nodeText = findParagpraph(item[0], editor_block)?.text;
      const nodePos = findNodePos(editor!, nodeText!);
      const selection_range = item[1][1] - item[1][0];
      const from = nodePos.nodePos;
      const to = from + selection_range;
      editor
        ?.chain()
        .focus()
        .setTextSelection({ from, to })
        .insertContent(item[2])
        .run();
    });
    setSuggestions([]);
  };

  const handleHumanize = useCallback(async () => {
    const text_array = highlight_sentences.map((item) => item[2]);
    if (!text_array) return;
    mutate(text_array);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlight_sentences]);

  const handleDismiss = (indexToRemove: number) => {
    setExpanded(-1);
    editor?.chain().blur().setTextSelection(0).run();
    const updatedHighlightSentences = suggestions?.filter(
      (_, index) => index !== indexToRemove
    );
    setSuggestions(updatedHighlightSentences);
  };

  const handleAccept = (
    item: [number[], number[], string],
    indexToRemove: number
  ) => {
    setExpanded(-1);
    editor?.chain().blur().insertContent(item[2]).run();
    const updatedHighlightSentences = suggestions?.filter(
      (_, index) => index !== indexToRemove
    );
    setSuggestions(updatedHighlightSentences);
  };

  if (suggestions.length === 0 && !isPending) {
    return (
      <>
        <h3 className='base-medium'>Humenizer</h3>
        <Spacer y='16' />
        <Starter type='humanizer' onClick={handleHumanize} />
      </>
    );
  }
  if (isPending)
    return (
      <div className='flex-center flex-1'>
        <Loader2 size={24} className='animate-spin text-indigo-500' />
      </div>
    );

  return (
    <div className='space-y-2'>
      <div className='flex-between'>
        <p className='base-medium'>Suggestions</p>
        <Button className='p-0' variant={'ghost'} onClick={handleAcceptAll}>
          Accept All
        </Button>
      </div>
      {suggestions.map((suggestion, idx) => {
        if (!suggestion[2]) return null;
        return (
          <HumanizerItem
            key={`suggestion-${idx}`}
            item={suggestion}
            isExpand={expanded === idx}
            onToggleExpand={() => toggleExpand(suggestion, idx)}
            onDismiss={() => handleDismiss(idx)}
            onAccept={() => handleAccept(suggestion, idx)}
          />
        );
      })}
    </div>
  );
};

export default memo(Humanize);
