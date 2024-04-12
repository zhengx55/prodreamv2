import { Button } from '@/components/ui/button';
import { findNodePos, findParagpraph } from '@/lib/tiptap/utils';
import { useMembershipInfo } from '@/query/query';
import { IDetectionResult } from '@/query/type';
import { EditorDictType } from '@/types';
import { useAIEditor } from '@/zustand/store';
import { m } from 'framer-motion';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { memo, useState } from 'react';
import { useLocalStorage } from 'react-use';
import Unlock from '../Unlock';

type Props = { t: EditorDictType };
const Suggestion = ({ t }: Props) => {
  const [expanded, setExpanded] = useState(-1);
  const { id } = useParams();
  const { data: membership } = useMembershipInfo();
  const editor = useAIEditor((state) => state.editor_instance);
  const [detectionResult, setDetectionResult, _remove] =
    useLocalStorage<IDetectionResult>(`detection_report_${id}`);

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
    detectionResult?.highlight_sentences.map((item) => {
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
    const new_storage = {
      ...detectionResult,
      highlight_sentences: [],
    };
    setDetectionResult(new_storage as IDetectionResult);
  };

  const handleDismiss = (indexToRemove: number) => {
    setExpanded(-1);
    editor?.chain().blur().setTextSelection(0).run();

    const updatedHighlightSentences =
      detectionResult?.highlight_sentences.filter(
        (_, index) => index !== indexToRemove
      );
    const updatedDetectionResult = {
      ...detectionResult,
      highlight_sentences: updatedHighlightSentences,
    };
    setDetectionResult(updatedDetectionResult as IDetectionResult);
  };

  const handleAccept = (
    item: [number[], number[], string],
    indexToRemove: number
  ) => {
    setExpanded(-1);
    editor?.chain().blur().insertContent(item[2]).run();
    const updatedHighlightSentences =
      detectionResult?.highlight_sentences.filter(
        (_, index) => index !== indexToRemove
      );
    const updatedDetectionResult = {
      ...detectionResult,
      highlight_sentences: updatedHighlightSentences,
    };
    setDetectionResult(updatedDetectionResult as IDetectionResult);
  };

  const handleRejectAll = () => {
    const new_storage = {
      ...detectionResult,
      highlight_sentences: [],
    };
    setDetectionResult(new_storage as IDetectionResult);
  };

  return (
    <div className='flex flex-1 flex-col'>
      {membership?.subscription === 'basic' ? (
        <Unlock text={'Unlock humanize suggestions with the Unlimited Plan'} />
      ) : detectionResult?.highlight_sentences.length === 0 ||
        detectionResult?.highlight_sentences.every(
          (item) => item[2] !== ''
        ) ? null : (
        <div className='flex flex-col gap-y-2'>
          <div className='flex-between'>
            <p className='base-medium'>{t.Detection.Humanizer}</p>
            <div className='flex gap-x-3'>
              <Button
                role='button'
                variant={'ghost'}
                onClick={handleAcceptAll}
                className='w-max px-0 text-stone-300 hover:text-violet-500'
              >
                {t.Utility.AcceptAll}
              </Button>
              <Button
                role='button'
                variant={'ghost'}
                onClick={handleRejectAll}
                className='w-max px-0 text-stone-300 hover:text-violet-500'
              >
                {t.Utility.DismissAll}
              </Button>
            </div>
          </div>
          {detectionResult?.highlight_sentences.map((suggestion, idx) => {
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

const Starter = memo(
  ({ start, t }: { start: () => Promise<void>; t: EditorDictType }) => {
    return (
      <div className='flex h-max w-full flex-col gap-y-4 overflow-hidden rounded border border-gray-200 px-4 py-4'>
        <Image
          src='/editor/Start.png'
          alt='Upgrade check'
          width={450}
          height={270}
          className='h-44 w-60 self-center'
          priority
        />
        <p className='text-center text-sm font-normal text-zinc-600'>
          {t.Detection.humanize_title}
        </p>
        <Button
          className='base-regular h-max w-max self-center rounded-full bg-violet-500 px-20'
          role='button'
          onClick={start}
        >
          {t.Detection.humanize_button}
        </Button>
      </div>
    );
  }
);

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
          variant={'ghost'}
          onClick={(e) => {
            e.stopPropagation();
            onDismiss();
          }}
          className='h-max w-max rounded border border-zinc-600 px-4 py-1 text-zinc-600'
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
