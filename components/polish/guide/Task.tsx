import Spacer from '@/components/root/Spacer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { startup_task, task_gif } from '@/constant';
import { findFirstParagraph } from '@/lib/tiptap/utils';
import { copilot } from '@/query/api';
import { useMutateTrackInfo } from '@/query/query';
import { UserTrackData } from '@/query/type';
import useAiEditor, { useUserTask } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { type Editor } from '@tiptap/react';
import { m } from 'framer-motion';
import { ChevronDown, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { memo, useRef, useState } from 'react';
import { toast } from 'sonner';

type Props = { editor: Editor; track: UserTrackData };

const Task = ({ editor, track }: Props) => {
  const [step, setStep] = useState(0);
  const updateRightbarTab = useAiEditor((state) => state.updateRightbarTab);
  const updateTaskStep = useUserTask((state) => state.updateTaskStep);
  const updateCitationStep = useUserTask((state) => state.updateCitationStep);
  const [isGenerating, setIsGenerating] = useState(false);
  const { mutateAsync: updateTrack } = useMutateTrackInfo();
  const insertPos = useRef<number>(0);

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
      .chain()
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
      const title = editor.getJSON().content?.at(0)?.content?.at(0)?.text;
      const content = editor.getText();
      if (content.trim() === title?.trim()) {
        toast.info('please write some content and try again');
        return;
      }
      const first_paragraph = findFirstParagraph(editor);
      if (index === 0) {
        editor.commands.setNodeSelection(first_paragraph.pos);
        updateTaskStep(0);
      } else {
        await handleCopilot({
          text: first_paragraph.content,
          pos: first_paragraph.pos + first_paragraph.size,
        });
        updateTaskStep(1);
      }
    }
    if (index === 2) {
      updateRightbarTab(2);
      await updateTrack({
        field: 'generate_tool_task',
        data: true,
      });
    }
    if (index === 3) {
      updateRightbarTab(1);
      updateTaskStep(3);
      updateCitationStep();
    }
  };

  return (
    <m.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      key={'task-panel'}
      className='flex flex-col'
    >
      <Accordion defaultValue='item-1' type='single' collapsible>
        <AccordionItem className='mx-auto w-[700px] rounded-md' value='item-1'>
          <AccordionTrigger className='flex-between bg-doc-primary px-5 py-2 data-[state=closed]:rounded-lg data-[state=open]:rounded-t-lg'>
            <p className='base-semibold text-white'>
              Explore our powerful features!
            </p>
            <ChevronDown className='h-6 w-max shrink-0 rounded bg-white px-2 text-doc-primary transition-transform duration-200' />
          </AccordionTrigger>
          <AccordionContent className='relative flex h-[180px] rounded-b-lg bg-doc-primary px-5 py-2'>
            <Image
              alt='task'
              src='/task/Task.png'
              width={100}
              height={100}
              className='absolute bottom-0 left-[calc(50%_-80px)] z-10 h-24 w-24'
            />
            <Image
              alt='task'
              src='/task/Task_corner.png'
              width={220}
              height={120}
              className='h-30 absolute bottom-0 left-0 z-0 w-52'
            />
            <ul className='flex w-1/2 flex-col gap-y-2'>
              {startup_task.map((task, index) => {
                return (
                  <li
                    onClick={() => setStep(index)}
                    key={index}
                    className={`flex-center group z-10 flex w-max cursor-pointer gap-x-2.5 rounded-full px-3 py-1.5 hover:bg-[#ECEDFF] ${step === index ? 'bg-[#ECEDFF]' : 'bg-white'}`}
                  >
                    <Checkbox
                      disabled
                      checked={
                        index === 0
                          ? !!track?.ai_copilot_task
                          : index === 1
                            ? !!track?.continue_writing_task
                            : index === 2
                              ? !!track?.generate_tool_task
                              : !!track?.citation_task
                      }
                      id={task.label}
                      className='h-4 w-4 rounded-full border-doc-primary'
                    />
                    <label
                      htmlFor={task.label}
                      className={`${step === index ? 'text-doc-primary' : ''} subtle-regular group-hover:cursor-pointer`}
                    >
                      {task.label}
                    </label>
                  </li>
                );
              })}
            </ul>
            <div className='relative h-full w-1/2 overflow-hidden rounded-lg'>
              <Button
                disabled={isGenerating}
                className='absolute bottom-2 left-2 z-10 h-max w-max bg-doc-primary p-1.5'
                onClick={() => selectHandler(step)}
              >
                {isGenerating && (
                  <Loader2 className='animate-spin text-white' size={18} />
                )}
                Show me
              </Button>
              <Image
                alt='task-showcase'
                src={task_gif[step === -1 ? 0 : step].src}
                fill
                priority
                className='z-0'
                sizes='(max-width: 768px) 100vw, (max-width: 180px) 50vw, 180px'
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Spacer y='20' />
    </m.div>
  );
};

export const Finish = memo(() => {
  const { mutateAsync: updateTrack } = useMutateTrackInfo();

  return (
    <m.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      key='complete-panel'
      className='flex flex-col'
    >
      <div className='relative mx-auto flex h-[180px] w-[700px] shrink-0 flex-col justify-between rounded-lg bg-doc-primary px-5 py-7'>
        <Image
          alt='task_finish'
          src='/task/Finish.png'
          priority
          width={300}
          height={200}
          className='absolute right-0 top-0 z-10 h-full w-auto rounded-lg'
        />
        <Image
          alt='task'
          src='/task/Task.png'
          width={100}
          height={100}
          className='absolute bottom-0 left-[calc(50%_-80px)] z-10 h-24 w-24'
        />
        <h1 className='base-semibold text-white'>
          Congrats!
          <br /> You&apos;ve just unlocked all key features!
        </h1>
        <Button
          onClick={async () => {
            await updateTrack({ field: 'tasks', data: true });
          }}
          className='h-max w-max rounded border border-white px-4 py-1.5 text-white'
          variant={'secondary'}
          role='button'
        >
          Close
        </Button>
      </div>
      <Spacer y='20' />
    </m.div>
  );
});
Finish.displayName = 'Finish';
export default Task;
