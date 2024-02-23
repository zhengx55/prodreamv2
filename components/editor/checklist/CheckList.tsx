import Spacer from '@/components/root/Spacer';
import { Feedback } from '@/components/root/SvgComponents';
import { Checkbox } from '@/components/ui/checkbox';
import { findFirstParagraph } from '@/lib/tiptap/utils';
import { copilot } from '@/query/api';
import { useMutateTrackInfo, useUserTrackInfo } from '@/query/query';
import useAiEditor, { useAIEditor, useUserTask } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { AnimatePresence, Variants, m } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { usePostHog } from 'posthog-js/react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

const variants: Variants = {
  hide: { width: 200, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 },
  show: { width: 300, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
};

const CheckList = () => {
  const [show, setShow] = useState(false);
  const { mutateAsync: updateTrack } = useMutateTrackInfo();
  const { data: userTrack, isPending, isError } = useUserTrackInfo();
  const editor = useAIEditor((state) => state.editor_instance);
  const updateRightbarTab = useAiEditor((state) => state.updateRightbarTab);
  const closeRightbar = useAiEditor((state) => state.closeRightbar);
  const updateTaskStep = useUserTask((state) => state.updateTaskStep);
  const updateCitationStep = useUserTask((state) => state.updateCitationStep);
  const insertPos = useRef<number>(0);
  const posthog = usePostHog();
  const [isGenerating, setIsGenerating] = useState(false);

  const { mutateAsync: handleCopilot } = useMutation({
    mutationFn: (params: { text: string; pos: number }) =>
      copilot({ tool: 'continue_write_sentence', text: params.text }),
    onMutate: () => {
      setIsGenerating(true);
    },
    onSuccess: async (data: ReadableStream, variables) => {
      const reader = data.pipeThrough(new TextDecoderStream()).getReader();
      insertPos.current = variables.pos - 1;
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        handleStreamData(value, variables.pos);
      }
      setIsGenerating(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleStreamData = (value: string | undefined, start: number) => {
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
    if (!result.startsWith(' ')) result = ` ${result}`;
    editor
      ?.chain()
      .insertContentAt(insertPos.current, result)
      .setTextSelection({
        from: start,
        to: result.length + insertPos.current,
      })
      .run();
    insertPos.current += result.length;
  };

  const selectHandler = async (index: number) => {
    if (index === 0 || index === 1) {
      const first_paragraph = findFirstParagraph(editor!);
      if (!first_paragraph.hasContent)
        return toast.warning('please write some content and try again');

      if (index === 0) {
        closeRightbar();
        editor?.commands.setNodeSelection(first_paragraph.pos);
        updateTaskStep(0);
      } else {
        closeRightbar();
        await handleCopilot({
          text: first_paragraph.content,
          pos: first_paragraph.pos + first_paragraph.size,
        });
      }
    }
    if (index === 2) {
      updateRightbarTab(2);
      await updateTrack({
        field: 'generate_tool_task',
        data: true,
      });
      posthog.capture('generate_tool_task_completed');
    }
    if (index === 3) {
      updateRightbarTab(1);
      updateCitationStep();
    }
  };

  if (isPending || isError) return null;
  return (
    <div className='absolute bottom-[5%] left-2 z-50 flex flex-col'>
      <m.div
        initial={false}
        variants={variants}
        id='checklist-trigger'
        animate={show ? 'show' : 'hide'}
        className='flex-between rounded-lg bg-doc-primary p-2 text-white'
        onClick={() => setShow((prev) => !prev)}
      >
        <p className='small-medium'>Onboarding Checklist</p>{' '}
        {!show ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </m.div>
      <AnimatePresence initial={false} mode='wait'>
        {show && (
          <m.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: 'auto',
              opacity: 1,
              transition: {
                height: {
                  duration: 0.4,
                },
                opacity: {
                  duration: 0.25,
                  delay: 0.15,
                },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: {
                  duration: 0.4,
                },
                opacity: {
                  duration: 0.25,
                },
              },
            }}
            key='checklist'
            className='flex w-[300px] flex-col rounded-b-lg bg-white px-4 shadow-lg'
          >
            <Spacer y='16' />
            <p className='small-regular'>
              Learn how to use ProDream to help you write & research!
            </p>
            <Spacer y='16' />
            <h2 className='base-medium'>Getting around ☕️</h2>
            <Spacer y='16' />
            <ul className='flex flex-col gap-y-2.5'>
              <li className='flex-between'>
                <div className='flex items-center gap-x-2'>
                  <Checkbox
                    disabled
                    checked={!!userTrack.citation_task}
                    id={'citation-task'}
                    className='h-4 w-4 rounded-full border-black-400'
                  />
                  <label
                    htmlFor='citation-task'
                    className={`subtle-regular ${userTrack.citation_task ? 'text-neutral-400 line-through' : ''}`}
                  >
                    Learn how to add citation
                  </label>
                </div>
                {userTrack.citation_task ? null : (
                  <span
                    role='button'
                    onClick={() => selectHandler(3)}
                    className='subtle-regular cursor-pointer text-doc-primary'
                  >
                    Show me
                  </span>
                )}
              </li>
              <li className='flex-between'>
                <div className='flex items-center gap-x-2'>
                  <Checkbox
                    disabled
                    checked={!!userTrack.ai_copilot_task}
                    id={'copilot-task'}
                    className='h-4 w-4 rounded-full border-black-400'
                  />
                  <label
                    htmlFor='copilot-task'
                    className={`subtle-regular ${userTrack.ai_copilot_task ? 'text-neutral-400 line-through' : ''}`}
                  >
                    Try any AI editing tools
                  </label>
                </div>
                {userTrack.ai_copilot_task ? null : (
                  <span
                    role='button'
                    onClick={() => selectHandler(0)}
                    className='subtle-regular cursor-pointer text-doc-primary'
                  >
                    Show me
                  </span>
                )}
              </li>
            </ul>
            <Spacer y='16' />
            <h2 className='base-medium'>Productivity boost 🚀</h2>
            <Spacer y='16' />
            <ul className='flex flex-col gap-y-2.5'>
              <li className='flex-between'>
                <div className='flex items-center gap-x-2'>
                  <Checkbox
                    disabled
                    checked={!!userTrack.continue_writing_task}
                    id={'citation-task'}
                    className='h-4 w-4 rounded-full border-black-400'
                  />
                  <label
                    htmlFor='citation-task'
                    className={`subtle-regular ${userTrack.continue_writing_task ? 'text-neutral-400 line-through' : ''}`}
                  >
                    Write next sentence
                  </label>
                </div>
                {userTrack.continue_writing_task ? null : (
                  <span
                    onClick={() => selectHandler(1)}
                    role='button'
                    className={`${isGenerating ? 'pointer-events-none' : ''} subtle-regular cursor-pointer text-doc-primary`}
                  >
                    {isGenerating ? 'Generating...' : 'Show me'}
                  </span>
                )}
              </li>
              <li className='flex-between'>
                <div className='flex items-center gap-x-2'>
                  <Checkbox
                    disabled
                    checked={!!userTrack.generate_tool_task}
                    id={'generate-task'}
                    className='h-4 w-4 rounded-full border-black-400'
                  />
                  <label
                    htmlFor='generate-task'
                    className={`subtle-regular ${userTrack.generate_tool_task ? 'text-neutral-400 line-through' : ''}`}
                  >
                    Generate an introduction
                  </label>
                </div>
                {userTrack.generate_tool_task ? null : (
                  <span
                    onClick={() => selectHandler(2)}
                    role='button'
                    className='subtle-regular cursor-pointer text-doc-primary'
                  >
                    Show me
                  </span>
                )}
              </li>
            </ul>
            <Spacer y='16' />
            <Link
              passHref
              href={'https://tally.so/r/3NovEO'}
              className='mt-auto flex w-full items-center gap-x-2 border-t border-shadow-border py-4'
              target='_blank'
            >
              <Feedback /> <p className='small-regular'>Submit Feedback</p>
            </Link>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default CheckList;
