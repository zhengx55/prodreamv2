import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { findNodePos, findParagpraph } from '@/lib/tiptap/utils';
import { batchHumanize } from '@/query/api';
import { useMembershipInfo } from '@/query/query';
import { EditorDictType } from '@/types';
import { useAIEditor } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { m } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { memo, useCallback, useState } from 'react';

const Unlock = dynamic(() => import('../Unlock'));

type Props = {
  t: EditorDictType;
  highlight_sentences: [number[], number[], string][];
};
const Suggestion = ({ t, highlight_sentences }: Props) => {
  const [expanded, setExpanded] = useState(-1);
  const { id } = useParams();
  const { data: membership } = useMembershipInfo();
  const [showRecheck, setShowRecheck] = useState(false);
  const [suggestion, setSuggestion] =
    useState<[number[], number[], string][]>();
  const editor = useAIEditor((state) => state.editor_instance);

  const { mutateAsync: humanize, isPending } = useMutation({
    mutationFn: (params: string[]) => batchHumanize(params),
    onSuccess: async (data) => {
      let resultWithSuggestion: [number[], number[], string][] = [];
      resultWithSuggestion = highlight_sentences.map((item, index) => {
        return [item[0], item[1], data[index]];
      });
      setSuggestion(resultWithSuggestion);
      toggleExpand(resultWithSuggestion[0], 0);
    },
    onError: async (error) => {
      const { toast } = await import('sonner');
      toast.error(error.message);
    },
  });

  const handleHumanize = useCallback(async () => {
    const text_array = highlight_sentences.map((item) => item[2]);
    if (!text_array) return;
    await humanize(text_array);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlight_sentences]);

  const toggleExpand = (item: [number[], number[], string], index: number) => {
    setExpanded(index);
    const editor_block = editor?.getJSON().content ?? [];
    const nodeText = findParagpraph(item[0], editor_block)?.text;
    const nodePos = findNodePos(editor!, nodeText!);
    const selection_range = item[1][1] - item[1][0];
    const from = nodePos.nodePos;
    const to = from + selection_range;
    editor?.chain().focus().setTextSelection({ from, to }).run();
  };

  const handleAcceptAll = () => {
    const editor_block = editor?.getJSON().content ?? [];
    suggestion?.map((item) => {
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
    setSuggestion([]);
    setShowRecheck(true);
  };

  const handleDismiss = (indexToRemove: number) => {
    setExpanded(-1);
    editor?.chain().blur().setTextSelection(0).run();
    const updatedHighlightSentences = suggestion?.filter(
      (_, index) => index !== indexToRemove
    );
    if (updatedHighlightSentences?.length === 0) setShowRecheck(true);
    setSuggestion(updatedHighlightSentences);
  };

  const handleAccept = (
    item: [number[], number[], string],
    indexToRemove: number
  ) => {
    setExpanded(-1);
    editor?.chain().blur().insertContent(item[2]).run();
    const updatedHighlightSentences = suggestion?.filter(
      (_, index) => index !== indexToRemove
    );
    if (updatedHighlightSentences?.length === 0) setShowRecheck(true);
    setSuggestion(updatedHighlightSentences);
  };

  const handleRejectAll = () => {
    setSuggestion([]);
    setShowRecheck(true);
  };

  return (
    <div className='flex flex-1 flex-col'>
      {membership?.subscription === 'basic' ? (
        <Unlock text={'Unlock humanize suggestions with the Unlimited Plan'} />
      ) : highlight_sentences.length === 0 ? (
        <FullHuman t={t} />
      ) : !suggestion ? (
        isPending ? (
          <div className='flex-center flex-1'>
            <Loader2 className='animate-spin text-violet-500' size={24} />
          </div>
        ) : showRecheck ? (
          <Recheck t={t} recheck={handleHumanize} />
        ) : (
          <Starter t={t} start={handleHumanize} />
        )
      ) : (
        <div className='flex flex-col gap-y-2'>
          <div className='flex-between'>
            <p className='base-medium'>{t.Detection.Humanizer}</p>
            <div className='flex gap-x-3'>
              <Button
                role='button'
                variant={'ghost'}
                onClick={handleAcceptAll}
                className='w-max px-0 text-violet-400 hover:text-violet-500'
              >
                {t.Utility.AcceptAll}
              </Button>
              <Button
                role='button'
                variant={'ghost'}
                onClick={handleRejectAll}
                className='w-max px-0 text-neutral-400 hover:text-violet-500'
              >
                {t.Utility.DismissAll}
              </Button>
            </div>
          </div>
          {suggestion.map((suggestion, idx) => {
            if (!suggestion[2]) return null;
            return (
              <SentenceItem
                t={t}
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
      )}
    </div>
  );
};

const Recheck = memo(
  ({ t, recheck }: { t: EditorDictType; recheck: () => void }) => {
    return (
      <div className='flex flex-1 flex-col'>
        <p className='base-medium'>{t.Detection.Humanizer}</p>
        <Spacer y='14' />
        <div className='flex h-max w-full flex-col gap-y-4 overflow-hidden rounded border border-gray-200 px-4 py-4'>
          <Image
            src='/editor/Detection-recheck.png'
            alt='Upgrade check'
            width={200}
            height={200}
            className='size-44 self-center'
          />
          <p className='text-center text-sm font-normal text-zinc-600'>
            {t.Detection.recheck_title}
          </p>
          <Button
            className='base-regular h-max w-max self-center rounded-lg px-8'
            role='button'
            onClick={recheck}
          >
            {t.Detection.recheck_button}
          </Button>
        </div>
      </div>
    );
  }
);

const FullHuman = memo(({ t }: { t: EditorDictType }) => {
  return (
    <div className='flex flex-1 flex-col'>
      <div className='flex h-max w-full flex-col gap-y-4 overflow-hidden rounded border border-gray-200 px-4 py-4'>
        <Image
          src='/editor/FullHuman.png'
          alt='Upgrade check'
          width={200}
          height={200}
          className='size-44 self-center'
        />
        <p className='text-center text-sm font-normal text-zinc-600'>
          {t.Detection.full_human_title}
        </p>
      </div>
    </div>
  );
});

const Starter = memo(
  ({ start, t }: { start: () => Promise<void>; t: EditorDictType }) => {
    return (
      <div className='flex flex-1 flex-col'>
        <p className='base-medium'>{t.Detection.Humanizer}</p>
        <Spacer y='14' />
        <div className='flex h-max w-full flex-col gap-y-4 overflow-hidden rounded border border-gray-200 px-4 py-4'>
          <Image
            src='/editor/Start.png'
            alt='Upgrade check'
            width={450}
            height={270}
            className='h-44 w-60 self-center'
          />
          <p className='text-center text-sm font-normal text-zinc-600'>
            {t.Detection.humanize_title}
          </p>
          <Button
            className='base-regular h-max w-max self-center rounded-lg px-8'
            role='button'
            onClick={start}
          >
            {t.Detection.humanize_button}
          </Button>
        </div>
      </div>
    );
  }
);
Recheck.displayName = 'Recheck';
FullHuman.displayName = 'FullHuman';
Starter.displayName = 'Starter';

interface SentenceItemProps {
  item: [number[], number[], string];
  isExpand: boolean;
  onToggleExpand: () => void;
  onDismiss: () => void;
  onAccept: () => void;
  t: EditorDictType;
}
const SentenceItem = ({
  item,
  isExpand,
  onToggleExpand,
  onDismiss,
  onAccept,
  t,
}: SentenceItemProps) => (
  <m.div
    initial={false}
    animate={isExpand ? 'expand' : 'collapse'}
    variants={{
      expand: { height: 'auto' },
      collapse: { height: '86px' },
    }}
    transition={{ duration: 0.3 }}
    onClick={onToggleExpand}
    className='cursor-pointer overflow-hidden rounded border border-gray-200 px-4 py-2 hover:shadow-md'
  >
    <p
      className={`small-regular text-zinc-600 ${isExpand ? '' : 'line-clamp-3'}`}
    >
      {item[2]}
    </p>
    {isExpand && (
      <div className='my-4 flex justify-end gap-x-2'>
        <Button
          role='button'
          variant={'outline'}
          onClick={(e) => {
            e.stopPropagation();
            onDismiss();
          }}
          className='h-max w-max rounded border px-4 py-1'
        >
          {t.Utility.Dismiss}
        </Button>
        <Button
          role='button'
          className='h-max w-max rounded border border-transparent px-4 py-1'
          onClick={(e) => {
            e.stopPropagation();
            onAccept();
          }}
        >
          {t.Utility.Accept}
        </Button>
      </div>
    )}
  </m.div>
);

export default Suggestion;
