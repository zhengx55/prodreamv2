import { Button } from '@/components/ui/button';
import { findTextInDoc } from '@/lib/tiptap/utils';
import { useMembershipInfo } from '@/query/query';
import { EditorDictType, Sentence } from '@/types';
import { useAIEditor } from '@/zustand/store';
import { m } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { memo } from 'react';
import Unlock from '../Unlock';
import useSuggestion from './hooks/useSuggestion';

type Props = { suggestions: [number[]]; t: EditorDictType };
const Suggestion = ({ suggestions, t }: Props) => {
  const { data: membership } = useMembershipInfo();
  const editor = useAIEditor((state) => state.editor_instance);
  const { sentences, setSentences, generating, humanize } =
    useSuggestion(suggestions);

  const toggleExpand = (item: Sentence) => {
    const { id } = item;
    if (!item.expand) {
      const title = editor?.getJSON().content?.at(0)?.content?.at(0)?.text;
      const editor_text = editor?.getText();
      const index = editor_text?.indexOf(item.text) ?? 0;
      let from = index + 1;
      if (!title) from = from += 1;
      const to = from + item.text.length + 1;
      editor?.chain().focus().setTextSelection({ from, to }).run();
    }
    setSentences((prev) =>
      prev.map((prevItem) => {
        if (prevItem.id === id)
          return { ...prevItem, expand: !prevItem.expand };
        else {
          return { ...prevItem, expand: false };
        }
      })
    );
  };

  const handleAcceptAll = () => {
    sentences.map((item) => {
      const { from, to } = findTextInDoc(item.text, editor!);
      editor
        ?.chain()
        .focus()
        .setTextSelection({ from, to })
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

  const handleHumanize = async () => {
    await humanize();
  };

  const handleAccept = (item: Sentence) => {
    editor?.chain().blur().insertContent(item.result).run();
    setSentences((prev) =>
      prev.filter((prevItem) => {
        return prevItem.id !== item.id;
      })
    );
  };

  const handleRejectAll = () => {
    setSentences([]);
  };

  return (
    <div className='flex flex-1 flex-col'>
      {membership?.subscription === 'basic' ? (
        <Unlock text={'Unlock humanize suggestions with the Unlimited Plan'} />
      ) : sentences.length === 0 ? (
        generating ? (
          <div className='flex-center flex-1'>
            <Loader2 className='animate-spin text-violet-500' />
          </div>
        ) : (
          <div className='flex flex-col gap-y-2'>
            <h2 className='base-medium'>{t.Detection.Humanizer}</h2>
            <Starter start={handleHumanize} t={t} />
          </div>
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
  item: Sentence;
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
    key={item.id}
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
      className={`base-regular text-zinc-600 ${isExpand ? '' : 'line-clamp-3'}`}
    >
      {item.result}
    </p>
    {isExpand && (
      <div className='my-4 flex justify-end gap-x-2'>
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
  </m.div>
);

export default Suggestion;
