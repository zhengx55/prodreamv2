import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { findTextInDoc } from '@/lib/tiptap/utils';
import { batchParaphrase } from '@/query/api';
import { useMembershipInfo } from '@/query/query';
import { IPlagiarismData } from '@/query/type';
import { EditorDictType, Sentence } from '@/types';
import { useAIEditor } from '@/zustand/store';
import { useQuery } from '@tanstack/react-query';
import { m } from 'framer-motion';
import { Loader2, RefreshCcw } from 'lucide-react';
import dynamic from 'next/dynamic';
import { memo, useEffect, useState } from 'react';
import { v4 } from 'uuid';

const Unlock = dynamic(() => import('../Unlock'));

const Report = ({
  report,
  recheck,
  t,
}: {
  report: Omit<IPlagiarismData, 'status'>;
  recheck: () => Promise<void>;
  t: EditorDictType;
}) => {
  const editor = useAIEditor((state) => state.editor_instance);
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [texts, setTexts] = useState<string[]>([]);
  const { data: membership } = useMembershipInfo();

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

  useEffect(() => {
    if (report && report.spans.length > 0) {
      let text_array: string[] = [];
      report.spans.map((item) => {
        let start = item[0];
        let end = item[1];
        let text = editor?.getText()?.substring(start, end) ?? '';
        text_array = [...text_array, text];
      });
      setTexts(text_array);
    }
  }, [editor, report]);

  const {
    data: suggestions,
    isPending,
    isError,
  } = useQuery({
    queryFn: () => batchParaphrase(texts),
    queryKey: ['batchParaphrase', texts],
    enabled: texts.length > 0,
  });

  useEffect(() => {
    if (suggestions) {
      const newSentences: Sentence[] = [];
      report.spans.map((item, index) => {
        let start = item[0];
        let end = item[1];
        let text = editor?.getText()?.substring(item[0], item[1]) ?? '';
        newSentences.push({
          id: v4(),
          text,
          expand: false,
          result: suggestions[index],
          ranges: [start, end + 1],
        });
      });
      setSentences(newSentences);
    }
  }, [editor, report, suggestions]);

  const handleRejectAll = () => {
    setSentences([]);
  };

  const handleAccept = (item: Sentence) => {
    editor?.chain().insertContent(item.result).run();
    setSentences((prev) =>
      prev.filter((prevItem) => {
        return prevItem.id !== item.id;
      })
    );
  };

  const toggleExpand = (item: Sentence) => {
    const { id } = item;
    if (!item.expand) {
      const title = editor?.getJSON().content?.at(0)?.content?.at(0)?.text;
      const editor_text = editor?.getText();
      const index = editor_text?.indexOf(item.text) ?? 0;
      let from = index + 1;
      if (!title) from = from += 1;
      const to = from + item.text.length;
      editor?.chain().focus().setTextSelection({ from, to }).run();

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

  return (
    <m.div
      key={'plagiarism-panel'}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className='flex flex-1 flex-col overflow-y-auto'
    >
      <div className='flex items-center gap-x-5'>
        <h1 className='text-[64px] italic text-violet-500'>
          {(report.scores * 100).toFixed(0)}%
        </h1>
        <div className='flex flex-col gap-y-2'>
          <p className='small-regular'>
            {report.scores * 100 > 0
              ? t.Plagiarism.Result
              : t.Plagiarism.Result_good}
          </p>
          <Button
            role='button'
            variant={'ghost'}
            className='h-max rounded border border-violet-500 px-4 py-1'
            onClick={recheck}
          >
            <RefreshCcw size={14} className='text-violet-500' />
            <p className='subtle-regular text-violet-500'>
              {t.Plagiarism.recheck}
            </p>
          </Button>
        </div>
      </div>
      {membership?.subscription === 'basic' ? (
        <Unlock
          text={'Unlock paraphrase suggestions with the Unlimited Plan'}
        />
      ) : (
        <div className='flex flex-col gap-y-4'>
          <div className='flex-between'>
            <p className='small-medium'>
              {sentences.length} {t.Plagiarism.Suggestions}
            </p>
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
          {report.spans.length === 0 ? null : isError ? (
            <p className='small-medium text-red-400'>
              Something went wrong, please try again later
            </p>
          ) : isPending ? (
            <div className='flex-center flex-1'>
              <Loader2 className='animate-spin text-violet-500' />
            </div>
          ) : (
            sentences.map((item) => {
              return (
                <SentenceItem
                  key={item.id}
                  item={item}
                  acceptLable={t.Utility.Accept}
                  dismissLable={t.Utility.Dismiss}
                  isExpand={item.expand}
                  onToggleExpand={() => toggleExpand(item)}
                  onDismiss={() => handleDismiss(item)}
                  onAccept={() => handleAccept(item)}
                />
              );
            })
          )}
        </div>
      )}
    </m.div>
  );
};
interface SentenceItemProps {
  item: Sentence;
  isExpand: boolean;
  onToggleExpand: () => void;
  onDismiss: () => void;
  onAccept: () => void;
  acceptLable: string;
  dismissLable: string;
}
const SentenceItem = ({
  item,
  isExpand,
  onToggleExpand,
  onDismiss,
  onAccept,
  acceptLable,
  dismissLable,
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
          onClick={onAccept}
          className='h-max w-max rounded border border-zinc-600 px-4 py-1 text-zinc-600'
        >
          {acceptLable}
        </Button>
        <Button
          role='button'
          className='h-max w-max rounded border border-transparent px-4 py-1'
          onClick={onDismiss}
        >
          {dismissLable}
        </Button>
      </div>
    )}
    <Spacer y='15' />
  </m.div>
);

export default memo(Report);
