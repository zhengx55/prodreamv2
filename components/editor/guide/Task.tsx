import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { useMutateTrackInfo } from '@/hooks/useTrackInfo';
import { EditorDictType } from '@/types';
import { useUserTask } from '@/zustand/store';
import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { XCircle } from 'lucide-react';
import Image from 'next/image';
import { memo } from 'react';

type Props = { t: EditorDictType };

const Task = ({ t }: Props) => {
  const trans = useTranslations('Editor');
  const updateShowTaskDialog = useUserTask(
    (state) => state.updateShowTaskDialog
  );

  return (
    <m.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      key={'task-panel'}
      className='mx-auto mb-8 flex w-[700px] flex-col rounded-lg bg-slate-100 p-4'
    >
      <div className='flex-between'>
        <p className='text-xl font-medium leading-normal text-zinc-600'>
          {trans('Task.title')}
        </p>
        <XCircle
          className='cursor-pointer text-neutral-400'
          onClick={updateShowTaskDialog}
          size={22}
        />
      </div>
      <Spacer y='5' />
      <p className='small-regular text-neutral-400'>
        {trans('Task.feature')}:&nbsp;
        <span className='inline-flex rounded bg-white px-1.5 text-neutral-400'>
          {trans('Task.paraphrase')}
        </span>
        &nbsp;
        <span className='inline-flex rounded bg-white px-1.5 text-neutral-400'>
          {trans('Task.academic')}
        </span>
        &nbsp;
        <span className='inline-flex rounded bg-white px-1.5 text-neutral-400'>
          {trans('Task.length')}
        </span>
      </p>
      <Spacer y='32' />
      <div className='flex-between'>
        <div className='flex flex-col gap-y-2'>
          <p className='text-base font-medium text-zinc-600'>
            {trans('Task.Step')} 1 : {trans('Task.step_1')}
          </p>
          <p className='text-base font-medium text-zinc-6000'>
            {trans('Task.Step')} 2 : {trans('Task.step_2_prefix')} &nbsp;
            <span className='inline-flex rounded bg-violet-100 px-1 text-base font-normal text-violet-500'>
              {trans('Task.step_2_middle')}
            </span>
            &nbsp; {trans('Task.step_2_suffix')}
          </p>
          <p className='text-base font-medium text-zinc-600'>
            {trans('Task.Step')} 3 : {trans('Task.step_3')}
          </p>
        </div>
        <Image
          alt='task'
          className='h-[100px] w-60 rounded-lg'
          height={100}
          width={240}
          src={'/task/Task.png'}
        />
      </div>
      <Spacer y='8' />
    </m.div>
  );
};

export const Finish = memo(() => {
  const trans = useTranslations('Editor');
  const { mutateAsync: updateTrack } = useMutateTrackInfo();

  return (
    <m.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      key='complete-panel'
      className='flex flex-col'
    >
      <div className='relative mx-auto flex h-[180px] w-[700px] shrink-0 flex-col justify-between rounded-lg bg-violet-500 px-5 py-7'>
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
          {trans('Task.You_ve_just_discovered_key_ways_to_interact_with_our_AI')}
          <br />
          {trans('Task.Continue_to_the_onboarding_checklist_to_learn_how_to_use_our_features_designed_for_you')}
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
          {trans('Task.Close')}
        </Button>
      </div>
      <Spacer y='20' />
    </m.div>
  );
});
Finish.displayName = 'Finish';
export default Task;
