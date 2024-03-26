import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { useMembershipInfo } from '@/query/query';
import { EdtitorDictType, Sentence } from '@/types';
import { useAIEditor } from '@/zustand/store';
import { m } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import Unlock from '../Unlock';
import useSuggestion from './hooks/useSuggestion';

type Props = { suggestions: [number[]]; t: EdtitorDictType };
const Suggestion = ({ suggestions, t }: Props) => {
  const { data: membership } = useMembershipInfo();
  const editor = useAIEditor((state) => state.editor_instance);
  const { sentences, setSentences, isPending, isError } =
    useSuggestion(suggestions);

  const toggleExpand = (item: Sentence) => {
    const { id, ranges } = item;
    if (!item.expand) {
      editor
        ?.chain()
        .focus()
        .setTextSelection({ from: ranges[0] + 1, to: ranges[1] })
        .run();
      setSentences((prev) =>
        prev.map((prevItem) => {
          if (prevItem.id === id) return { ...prevItem, expand: true };
          else {
            return { ...prevItem, expand: false };
          }
        })
      );
    }
  };

  const handleAcceptAll = () => {
    sentences.map((item) => {
      const start = item.ranges[0];
      const end = item.ranges[1];
      editor
        ?.chain()
        .blur()
        .setTextSelection({ from: start + 1, to: end })
        .insertContent(item.result)
        .run();
    });
    setSentences([]);
  };

  const handleDismiss = (item: Sentence) => {
    editor?.chain().blur().setTextSelection(0).run();
    setSentences((prev) =>
      prev.filter((prevItem) => {
        return prevItem.id !== item.id;
      })
    );
  };

  const handleAccept = (item: Sentence) => {
    const start = item.ranges[0];
    const end = item.ranges[1];
    editor
      ?.chain()
      .blur()
      .setTextSelection({ from: start + 1, to: end })
      .insertContent(item.result)
      .run();
    setSentences((prev) =>
      prev.filter((prevItem) => {
        return prevItem.id !== item.id;
      })
    );
  };

  return (
    <div className='flex flex-1 flex-col'>
      {membership?.subscription === 'basic' ? (
        <Unlock text={'Unlock humanize suggestions with the Unlimited Plan'} />
      ) : isError ? (
        <p className='small-medium text-red-400'>
          Something went wrong, please try again later
        </p>
      ) : isPending ? (
        <div className='flex-center flex-1'>
          <Loader2 className='animate-spin text-violet-500' />
        </div>
      ) : (
        <>
          <div className='flex-between'>
            <p className='small-medium'>{t.Detection.Humanizer}</p>
            <div className='flex gap-x-3'>
              <Button
                role='button'
                onClick={() => {}}
                className='h-max w-max rounded py-1'
              >
                {t.Utility.AcceptAll}
              </Button>
            </div>
          </div>
          <Spacer y='10' />
          {sentences.map((sentence) => {
            return (
              <SentenceItem
                t={t}
                key={sentence.id}
                item={sentence}
                isExpand={sentence.expand}
                onToggleExpand={() => toggleExpand(sentence)}
                onDismiss={() => handleDismiss(sentence)}
                onAccept={() => handleAccept(sentence)}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

interface SentenceItemProps {
  item: Sentence;
  isExpand: boolean;
  onToggleExpand: () => void;
  onDismiss: () => void;
  onAccept: () => void;
  t: EdtitorDictType;
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
    key={item.id}
    initial={false}
    animate={isExpand ? 'expand' : 'collapse'}
    variants={{
      expand: { height: 'auto' },
      collapse: { height: '87px' },
    }}
    transition={{ duration: 0.3 }}
    onClick={onToggleExpand}
    className='cursor-pointer overflow-hidden rounded border border-gray-200 px-4 hover:shadow-md'
  >
    <Spacer y='15' />
    <p className={`base-medium ${isExpand ? '' : 'line-clamp-1'}`}>
      {item.result}
    </p>
    <Spacer y='10' />
    <div className='w-full rounded bg-neutral-50 p-2'>
      <p
        className={`${isExpand ? '' : 'line-clamp-1'} w-full text-sm font-normal leading-snug text-zinc-600`}
      >
        {item.text}
      </p>
    </div>
    {isExpand && (
      <div className='mt-2 flex justify-end gap-x-2'>
        <Button
          role='button'
          variant={'ghost'}
          onClick={onDismiss}
          className='h-max w-max rounded border border-zinc-600 px-4 py-1 text-zinc-600'
        >
          {t.Utility.Dismiss}
        </Button>
        <Button
          role='button'
          className='h-max w-max rounded border border-transparent px-4 py-1'
          onClick={onAccept}
        >
          {t.Utility.Accept}
        </Button>
      </div>
    )}
    <Spacer y='15' />
  </m.div>
);

export default Suggestion;
