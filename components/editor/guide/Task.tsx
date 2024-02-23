import Spacer from '@/components/root/Spacer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { startup_task, task_gif } from '@/constant';
import { useMutateTrackInfo } from '@/query/query';
import { UserTrackData } from '@/query/type';
import { type Editor } from '@tiptap/react';
import { m } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { memo, useEffect, useLayoutEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

type Props = { editor: Editor; track: UserTrackData };

const Task = ({ editor, track }: Props) => {
  const [step, setStep] = useState(-1);
  const [progress, setProgress] = useState(33.33);
  const { mutateAsync: updateTrack } = useMutateTrackInfo();
  const debounceUpdateTask = useDebouncedCallback(async () => {
    await updateTrack({ field: 'highlight_task', data: true });
    const { toast } = await import('sonner');
    toast.success(
      'Congrats! Highlight is the #1 way to intereact with out AI! Then use "AI Copilot" prompts to edit or generate based on highlighted content ✨'
    );
  }, 500);
  useEffect(() => {
    if (!track.highlight_task) {
      editor.on('selectionUpdate', debounceUpdateTask);
    }
    return () => {
      editor.off('selectionUpdate', debounceUpdateTask);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, track.highlight_task]);

  useLayoutEffect(() => {
    setProgress(
      track.highlight_task && track.grammar_task
        ? 100
        : track.highlight_task || track.grammar_task
          ? 66.66
          : 33.33
    );
  }, [track]);
  return (
    <m.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      key={'task-panel'}
      className='flex flex-col'
    >
      <Accordion defaultValue='item-1' type='single' collapsible>
        <AccordionItem className='mx-auto w-[700px] rounded-lg' value='item-1'>
          <AccordionTrigger className='flex-between bg-doc-primary px-5 py-2 data-[state=closed]:rounded-lg data-[state=open]:rounded-t-lg'>
            <p className='base-semibold text-left text-white'>
              Let&apos;s start with the basics!
            </p>
            <ChevronDown className='h-6 w-max shrink-0 text-white transition-transform duration-200' />
          </AccordionTrigger>
          <AccordionContent className='relative flex h-[200px] rounded-b-lg bg-doc-secondary px-3 pb-2 pt-4'>
            <ul className='flex w-1/2 flex-col gap-y-2'>
              <div className='flex flex-col gap-y-1.5'>
                <li className='flex-between pr-4'>
                  <p className='small-regular text-doc-font'>
                    Here are a few things to try first
                  </p>
                  <p className='small-regular text-doc-primary'>
                    {progress.toFixed(0)}%
                  </p>
                </li>
                <Progress value={progress} className='h-2 w-[80%] shrink-0' />
              </div>

              <Spacer y='15' />
              {startup_task.map((task, index) => {
                const taskComplete =
                  index === 0 ||
                  (index === 1 && track.highlight_task) ||
                  (index === 2 && track.grammar_task);
                return (
                  <li
                    onClick={() => setStep(index)}
                    key={index}
                    className={`flex-between ${taskComplete ? 'border-green-600 bg-green-100' : step === index ? 'border-doc-primary bg-[#E6CAFC] text-doc-primary' : 'border-transparent bg-white'} group w-[80%] cursor-pointer gap-x-2.5 rounded-full border px-3 py-1.5 hover:border-doc-primary hover:text-doc-primary`}
                  >
                    <label
                      htmlFor={task.label}
                      className={`${step === index ? 'text-doc-primary' : ''} ${taskComplete && 'text-green-600'} subtle-regular group-hover:cursor-pointer`}
                    >
                      {task.label}
                    </label>
                    <Checkbox
                      disabled
                      checked={
                        index === 0
                          ? true
                          : index === 1
                            ? !!track?.highlight_task
                            : !!track?.grammar_task
                      }
                      id={task.label}
                      className='h-4 w-4 rounded-full border-doc-primary data-[state=checked]:border-transparent data-[state=checked]:bg-green-600
                      data-[state=checked]:text-white'
                    />
                  </li>
                );
              })}
            </ul>
            <div className='relative h-full w-1/2 overflow-hidden rounded-lg'>
              {step === -1 ? null : (
                <Image
                  alt='task-showcase'
                  src={task_gif[step].src}
                  fill
                  priority
                  className='z-0'
                  sizes='(max-width: 768px) 100vw, (max-width: 180px) 50vw, 180px'
                />
              )}
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
        <h1 className='base-semibold z-20 text-white'>
          You&apos;ve just discovered key ways to interact with our AI!
          <br />
          Continue to the onboarding checklist to learn how to use
          <br /> our features, designed for you.
        </h1>
        <Button
          onClick={async () => {
            await updateTrack({ field: 'basic_task', data: true });
            const checkList = document.getElementById('checklist-trigger');
            checkList?.click();
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
