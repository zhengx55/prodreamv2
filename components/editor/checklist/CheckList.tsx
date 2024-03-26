import Spacer from '@/components/root/Spacer';
import { Checkbox } from '@/components/ui/checkbox';
import { findFirstParagraph } from '@/lib/tiptap/utils';
import {
  useButtonTrack,
  useMutateTrackInfo,
  useUserTrackInfo,
} from '@/query/query';
import { EdtitorDictType } from '@/types';
import useAIEditor, { useUserTask } from '@/zustand/store';
import { AnimatePresence, Variants, m } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { memo, useState } from 'react';
import { toast } from 'sonner';
import { useDebouncedCallback } from 'use-debounce';

const variants: Variants = {
  hide: { width: 200, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 },
  show: { width: 300, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
};

const CheckList = ({ t }: { t: EdtitorDictType }) => {
  const [show, setShow] = useState(false);
  const { data: userTrack } = useUserTrackInfo();
  const editor = useAIEditor((state) => state.editor_instance);
  const updateRightbarTab = useAIEditor((state) => state.updateRightbarTab);
  const closeRightbar = useAIEditor((state) => state.closeRightbar);
  const { mutateAsync: updateTrack } = useMutateTrackInfo();

  const {
    updateTaskStep,
    updateCitationStep,
    updateGenerateStep,
    updateContinueStep,
  } = useUserTask((state) => ({
    ...state,
  }));

  const setGenerateTab = useAIEditor((state) => state.updateGenerateTab);
  const { mutateAsync: ButtonTrack } = useButtonTrack();

  const selectHandler = useDebouncedCallback(async (index: number) => {
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
        const checkList = document.getElementById('checklist-trigger');
        checkList?.click();
        updateContinueStep(1);
        await ButtonTrack({ event: 'Onboarding task: next sentence' });
        await updateTrack({
          field: 'continue_writing_task',
          data: true,
        });
      }
    }
    if (index === 2) {
      updateRightbarTab(2);
      setGenerateTab('Write Introduction');
      await ButtonTrack({ event: 'generate_tool_task_completed' });
      updateGenerateStep(1);
    }
    if (index === 3) {
      updateRightbarTab(1);
      updateCitationStep();
    }
  }, 500);

  return (
    <div className='absolute bottom-[10%] left-2 z-50 flex flex-col'>
      <m.div
        initial={false}
        variants={variants}
        id='checklist-trigger'
        animate={show ? 'show' : 'hide'}
        className='flex-between rounded-lg bg-doc-primary p-2 text-white'
        onClick={() => setShow((prev) => !prev)}
      >
        <p className='small-medium'>{t.CheckList.title}</p>{' '}
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
            <Spacer y='12' />
            <p className='small-regular'>{t.CheckList.describtion}</p>
            <Spacer y='12' />
            <h2 className='base-medium'>{t.CheckList.format_1}</h2>
            <Spacer y='12' />
            <ul className='flex flex-col gap-y-2.5'>
              <TaskItem
                taskCompleted={!!userTrack?.ai_copilot_task}
                label={t.CheckList.copilot}
                onClickHandler={() => selectHandler(3)}
              />
              <TaskItem
                taskCompleted={!!userTrack?.citation_task}
                label={t.CheckList.citation}
                onClickHandler={() => selectHandler(0)}
              />
            </ul>
            <Spacer y='12' />
            <h2 className='base-medium'>{t.CheckList.format_2}</h2>
            <Spacer y='12' />
            <ul className='flex flex-col gap-y-2.5'>
              <TaskItem
                taskCompleted={!!userTrack?.continue_writing_task}
                label={t.CheckList.continue}
                onClickHandler={() => selectHandler(1)}
              />
              <TaskItem
                taskCompleted={!!userTrack?.generate_tool_task}
                label={t.CheckList.generate}
                onClickHandler={() => selectHandler(2)}
              />
            </ul>
            <Spacer y='24' />
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default memo(CheckList);

const TaskItem = ({
  taskCompleted,
  label,
  onClickHandler,
}: {
  taskCompleted: boolean;
  label: string;
  onClickHandler: () => void;
}) => (
  <li className='flex-between'>
    <div className='flex items-center gap-x-2'>
      <Checkbox
        disabled
        checked={taskCompleted}
        className='h-4 w-4 rounded-full border-black-400'
      />
      <label
        className={`subtle-regular ${taskCompleted ? 'text-neutral-400 line-through' : ''}`}
      >
        {label}
      </label>
    </div>
    {!taskCompleted && (
      <span
        role='button'
        onClick={onClickHandler}
        className='subtle-regular cursor-pointer text-doc-primary'
      >
        Show me
      </span>
    )}
  </li>
);
