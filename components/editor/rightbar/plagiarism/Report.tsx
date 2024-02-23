import Spacer from '@/components/root/Spacer';
import { Diamond } from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import { copilot } from '@/query/api';
import { useMembershipInfo } from '@/query/query';
import useAiEditor, { useAIEditor } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { m } from 'framer-motion';
import { AlertTriangle, Loader2, RefreshCcw, X } from 'lucide-react';
import { memo, useEffect, useState } from 'react';
import { v4 } from 'uuid';

export type Sentence = {
  id: string;
  text: string;
  isParaphrasing: boolean;
  expand: boolean;
  paraphrase_result: string;
  ranges: number[];
};

const Report = () => {
  const plagReport = useAiEditor((state) => state.plagiarismResult);
  const updatePlagiarismRecheck = useAiEditor(
    (state) => state.updatePlagiarismRecheck
  );
  const editor = useAiEditor((state) => state.editor_instance);
  const updatePaymentModal = useAIEditor((state) => state.updatePaymentModal);
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const { data: membership } = useMembershipInfo();
  const togglePlagiarism = useAiEditor((state) => state.togglePlagiarism);

  const { mutateAsync: handleCopilot } = useMutation({
    mutationFn: (params: { id: string; text: string }) =>
      copilot({ text: params.text, tool: 'paraphrase' }),
    onMutate(variables) {
      setSentences((prev) =>
        prev.map((prevItem) => {
          if (prevItem.id === variables.id)
            return { ...prevItem, isParaphrasing: true };
          return prevItem;
        })
      );
    },
    onSuccess: async (data: ReadableStream, variables) => {
      const reader = data.pipeThrough(new TextDecoderStream()).getReader();
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          setSentences((prev) =>
            prev.map((prevItem) => {
              if (prevItem.id === variables.id)
                return { ...prevItem, isParaphrasing: false };
              return prevItem;
            })
          );
          break;
        }
        handleStreamData(value, variables.id);
      }
    },
    onError: async (error, variables) => {
      const toast = (await import('sonner')).toast;
      setSentences((prev) =>
        prev.map((prevItem) => {
          if (prevItem.id === variables.id)
            return { ...prevItem, isParaphrasing: true };
          return prevItem;
        })
      );
      toast.error(error.message);
    },
  });

  const handleStreamData = (value: string | undefined, id: string) => {
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
    let result = '';
    eventData.forEach((word) => {
      result += word;
    });
    setSentences((prev) =>
      prev.map((prevItem) => {
        if (prevItem.id === id)
          return {
            ...prevItem,
            paraphrase_result: (prevItem.paraphrase_result += result),
          };
        return prevItem;
      })
    );
  };

  const handleParaphrase = async (item: Sentence) => {
    if (item.paraphrase_result) {
      if (!item.expand) {
        editor?.commands.setTextSelection({
          from: item.ranges[0],
          to: item.ranges[1],
        });
      } else {
        editor?.commands.setTextSelection(0);
      }
      setSentences((prev) =>
        prev.map((prevItem) => {
          if (prevItem.id === item.id)
            return { ...prevItem, expand: !prevItem.expand };
          return prevItem;
        })
      );
    } else {
      await handleCopilot({ id: item.id, text: item.text });
    }
  };

  const handleDismiss = (id: string) => {
    setSentences((prev) =>
      prev.map((prevItem) => {
        if (prevItem.id === id) return { ...prevItem, expand: false };
        return prevItem;
      })
    );
  };

  const handleAccept = (item: Sentence) => {
    const start = item.ranges[0];
    const end = item.ranges[1];
    editor
      ?.chain()
      .focus()
      .deleteRange({ from: start, to: end })
      .insertContentAt(start, item.paraphrase_result)
      .run();
    setSentences((prev) =>
      prev.filter((prevItem) => {
        return prevItem.id !== item.id;
      })
    );
  };

  useEffect(() => {
    if (plagReport && plagReport.spans.length > 0) {
      const newSentences: Sentence[] = [];
      plagReport.spans.map((item) => {
        let start = item[0];
        let end = item[1];
        newSentences.push({
          id: v4(),
          text: editor?.getText()?.substring(start, end) ?? '',
          isParaphrasing: false,
          expand: false,
          paraphrase_result: '',
          ranges: [start, end + 1],
        });
      });
      setSentences(newSentences);
    }
  }, [editor, plagReport]);
  if (!plagReport) return null;
  return (
    <m.aside
      key={'plagiarism-panel'}
      initial={{ width: 0 }}
      animate={{
        width: 400,
      }}
      exit={{
        width: 0,
      }}
      transition={{ duration: 0.2 }}
      className='flex h-full shrink-0 flex-col overflow-y-auto border-l border-shadow-border px-4 py-5'
    >
      <div className='flex-between'>
        <div className='flex items-center gap-x-5'>
          <h1 className='text-[64px] italic text-doc-primary'>
            {(plagReport.scores * 100).toFixed(0)}%
          </h1>
          <div className='flex flex-col gap-y-2'>
            <p className='small-regular'>
              {plagReport.scores * 100 > 25
                ? 'May be plagiarized'
                : 'Acceptable'}
            </p>
            <Button
              role='button'
              variant={'ghost'}
              className='h-max rounded border border-doc-primary px-4 py-1'
              onClick={() => {
                updatePlagiarismRecheck(true);
                togglePlagiarism();
              }}
            >
              <RefreshCcw size={14} className='text-doc-primary' />
              <p className='subtle-regular text-doc-primary'>Re-check</p>
            </Button>
          </div>
        </div>
        <Button
          role='button'
          onClick={() => togglePlagiarism()}
          className='h-max w-max rounded-full bg-red-400 p-0.5'
        >
          <X size={16} className='text-white' />
        </Button>
      </div>
      {membership?.subscription === 'basic' ? (
        <>
          <Spacer y='20' />
          <div className='flex flex-col gap-y-4 rounded-lg border border-shadow-border px-4 py-2'>
            <div className='flex items-center gap-x-2'>
              <AlertTriangle size={22} className='shrink-0 text-yellow-400' />
              <h1 className='base-semibold text-yellow-400'>
                Unlock paraphrase suggestions with Unlimited Plan
              </h1>
            </div>
            <p className='small-regular'>
              Move beyond viewing plagiarism percentages with the Basic plan.
              Upgrade to Unlimited for detailed, sentence-by-sentence
              paraphrasing guidance to enhance your paper.
            </p>
            <Button
              onClick={() => updatePaymentModal(true)}
              role='button'
              className='h-max w-max rounded py-1.5'
            >
              <Diamond /> Upgrade
            </Button>
          </div>
        </>
      ) : (
        <>
          <Spacer y='20' />
          <div className='flex flex-col gap-y-4'>
            {sentences.map((item) => {
              const isExpand = item.expand;
              const isParaphrasing = item.isParaphrasing;
              const hasResult = item.paraphrase_result !== '';
              return (
                <div
                  key={item.id}
                  className='rounded border border-shadow-border px-4 py-3'
                >
                  <p className='small-regular line-clamp-4'>{item.text}</p>
                  <Spacer y='20' />
                  <Button
                    disabled={isParaphrasing}
                    onClick={() => handleParaphrase(item)}
                    role='button'
                    className='h-max w-full rounded p-1'
                  >
                    {isParaphrasing ? (
                      <>
                        <Loader2
                          className=' animate-spin text-white'
                          size={18}
                        />
                        Paraphrasing
                      </>
                    ) : hasResult ? (
                      'View Paraphrase output'
                    ) : (
                      'Paraphrase Sentence'
                    )}
                  </Button>
                  {isExpand && (
                    <>
                      <Spacer y='10' />
                      <p className='small-regular line-clamp-4'>
                        {item.paraphrase_result}
                      </p>
                      <Spacer y='10' />
                      <div className='bg-[#FAFAFA] px-4 py-2'>
                        <p className='small-regular line-clamp-2'>
                          Original sentence: {item.text}
                        </p>
                      </div>
                      <Spacer y='10' />
                      <div className='flex-between'>
                        <Button
                          role='button'
                          className='h-max w-[48%] rounded p-1'
                          onClick={() => handleAccept(item)}
                        >
                          Accept
                        </Button>
                        <Button
                          role='button'
                          variant={'ghost'}
                          onClick={() => handleDismiss(item.id)}
                          className='h-max w-[48%] rounded border border-doc-primary p-1'
                        >
                          Dismiss
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </m.aside>
  );
};
export default memo(Report);
