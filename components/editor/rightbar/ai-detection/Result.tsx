import Spacer from '@/components/root/Spacer';
import Tooltip from '@/components/root/Tooltip';
import { Separator } from '@/components/ui/separator';
import { IDetectionResult } from '@/query/type';
import { EditorDictType } from '@/types';
import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { memo, useMemo } from 'react';
import { PieChart } from 'react-minimal-pie-chart';

const Suggestion = dynamic(() => import('./Suggestion'));

const labels = ['human', 'mixed', 'ai generated'];
const primaryColor = ['#48B251', '#5266CC', '#E58600'];
const secondaryColor = ['#D5F9D8', '#F2F4FF', '#FFEACC'];

type Props = {
  result: IDetectionResult;
  recheck: () => Promise<void>;
};
const Result = ({ result, recheck }: Props) => {
  const trans = useTranslations('Editor');
  const ai_percent = result.class_probabilities.ai * 100;
  const human_percent = result.class_probabilities.human * 100;
  const mixed_percent = result.class_probabilities.mixed * 100;
  const result_index = useMemo(() => {
    const max = Math.max(ai_percent, human_percent, mixed_percent);
    if (max === ai_percent) return 2;
    if (max === human_percent) return 0;
    return 1;
  }, [ai_percent, human_percent, mixed_percent]);
  return (
    <m.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      key={'detection-result'}
      className='flex h-full w-full flex-col overflow-y-auto'
    >
      <div className='flex items-center gap-x-2'>
        <h3 className='base-medium'>
          {trans('Detection.Classification')}
          &nbsp;&nbsp;
        </h3>
      </div>
      <Spacer y='8' />
      <p className='text-sm leading-relaxed text-zinc-600'>
        {result.message}&nbsp;
        <span
          className='small-regular inline-block rounded px-1.5 py-1'
          style={{
            backgroundColor: secondaryColor[result_index],
            color: primaryColor[result_index],
          }}
        >
          {labels[result_index]}
        </span>
      </p>
      <Spacer y='16' />
      <div className='size-36 self-center'>
        <PieChart
          animate
          lengthAngle={-360}
          data={[
            { value: ai_percent, color: primaryColor[result_index] },
            { value: 100 - ai_percent, color: secondaryColor[result_index] },
          ]}
        />
      </div>
      <Spacer y='16' />
      {result_index === 1 ? (
        <div className='flex-center text-sm text-zinc-600'>
          <em
            style={{
              color: primaryColor[result_index],
            }}
          >
            {mixed_percent.toFixed(0)}%
          </em>
          &nbsp;&nbsp;{trans('Detection.mix-ai')}&nbsp;&nbsp;
        </div>
      ) : (
        <div className='flex-center text-sm text-zinc-600'>
          <em
            style={{
              color: primaryColor[result_index],
            }}
          >
            {ai_percent.toFixed(0)}%
          </em>
          &nbsp;&nbsp;{trans('Detection.probability')}&nbsp;&nbsp;
          <Tooltip
            side='bottom'
            tooltipContent={trans('Detection.Result_Tool_Tip_Content')}
          >
            <span
              role='tooltip'
              className='flex-center size-3.5 cursor-pointer rounded-full bg-zinc-500 text-white'
            >
              ?
            </span>
          </Tooltip>
        </div>
      )}
      <Spacer y='8' />
      <p className='self-center text-xs font-normal leading-tight text-zinc-500'>
        {trans('Detection.Powered_by_GPTZero')}
      </p>
      <Spacer y='24' />
      <Separator orientation='horizontal' className='bg-gray-200' />
      <Spacer y='24' />
      <h3 className='base-medium'>{trans('Detection.breakdown')}</h3>
      <Spacer y='8' />
      <p className='small-regular leading-relaxed text-zinc-600'>
        {trans('Detection.AI_Generated_alert')}
      </p>
      <Spacer y='16' />
      <Bar
        human_percent={human_percent}
        mixed_percent={mixed_percent}
        ai_percent={ai_percent}
      />
      <Spacer y='24' />
      <Separator orientation='horizontal' className='bg-gray-200' />
      <Spacer y='24' />
      <Suggestion
        onRecheck={recheck}
        highlight_sentences={result.highlight_sentences}
        human_percent={human_percent}
      />
      <Spacer y='20' />
    </m.div>
  );
};

const Bar = memo(
  ({
    human_percent,
    mixed_percent,
    ai_percent,
  }: {
    human_percent: number;
    mixed_percent: number;
    ai_percent: number;
  }) => {
    const trans = useTranslations('Editor');

    return (
      <>
        <div className='relative flex h-2.5 w-full shrink-0 bg-transparent'>
          <span
            className='absolute left-0 z-20 h-full rounded-l-3xl rounded-r-3xl bg-emerald-100'
            style={{
              width: `${human_percent + 1}%`,
            }}
          />
          <span
            className='absolute z-10 h-full rounded-r-3xl bg-violet-200'
            style={{
              width: `${mixed_percent + 1}%`,
              left: `${human_percent - 1}%`,
            }}
          />
          <span
            className='absolute z-0 h-full rounded-r-3xl bg-orange-100'
            style={{
              width: `${ai_percent + 1}%`,
              left: `${human_percent + mixed_percent - 1}%`,
            }}
          />
        </div>
        <Spacer y='10' />
        <div className='flex w-full items-center justify-between'>
          <div className='flex flex-col gap-y-0.5'>
            <p className='text-sm font-medium leading-tight text-green-500'>
              {trans('Detection.Bar_human')}
            </p>
            <p className='small-regular text-zinc-600'>
              {human_percent.toFixed(0)}%
            </p>
          </div>
          <div className='flex flex-col gap-y-0.5'>
            <p className='text-sm font-medium leading-tight text-indigo-500'>
              {trans('Detection.Bar_mixed')}
            </p>
            <p className='small-regular text-zinc-600'>
              {mixed_percent.toFixed(0)}%
            </p>
          </div>
          <div className='flex flex-col gap-y-0.5'>
            <p className='text-sm font-medium leading-tight text-amber-600'>
              {trans('Detection.Bar_ai')}
            </p>
            <p className='small-regular text-zinc-600'>
              {ai_percent.toFixed(0)}%
            </p>
          </div>
        </div>
      </>
    );
  }
);
Bar.displayName = 'Bar';
export default memo(Result);
