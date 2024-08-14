import Spacer from '@/components/root/Spacer';
import { IDetectionResult } from '@/query/type';
import { memo, useMemo } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import Humanize from './Humanize';

type Props = {
  result: IDetectionResult;
};

const labels = ['human', 'mixed', 'ai generated'];
const primaryColor = ['#48B251', '#5266CC', '#E58600'];
const secondaryColor = ['#D5F9D8', '#F2F4FF', '#FFEACC'];

const DetectionResult = ({ result }: Props) => {
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
    <>
      <div className='flex items-center gap-x-2'>
        <h3 className='base-medium'>
          Classification&nbsp;&nbsp;{' '}
          <span
            className='small-regular inline-block rounded px-1.5 py-1 text-white'
            style={{
              backgroundColor: primaryColor[result_index],
            }}
          >
            {labels[result_index]}
          </span>
        </h3>
      </div>
      <Spacer y='16' />
      <div className='rounded-lg bg-white p-4'>
        <p className='text-base leading-relaxed text-zinc-600'>
          {result.message}&nbsp;
        </p>
        <Spacer y='16' />
        <div className='mx-auto size-36'>
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
            &nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        ) : (
          <div className='flex-center text-base text-zinc-600'>
            <span
              className='font-medium'
              style={{
                color: primaryColor[result_index],
              }}
            >
              {ai_percent.toFixed(0)}%
            </span>
            &nbsp;Probability Al generated
          </div>
        )}
      </div>
      <Spacer y='24' />
      <h3 className='base-medium'>Probability Breakdown</h3>
      <Spacer y='16' />
      <div className='rounded-lg bg-white p-4'>
        <p className='text-base leading-relaxed text-zinc-600'>
          The probability this text has been entirely written by a human, AI or
          a mix of the two.
        </p>
        <Spacer y='24' />
        <Bar
          human_percent={human_percent}
          mixed_percent={mixed_percent}
          ai_percent={ai_percent}
        />
      </div>
      <Spacer y='24' />
      <Humanize
        highlight_sentences={result.highlight_sentences}
        human_percent={human_percent}
      />
    </>
  );
};

export default memo(DetectionResult);

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
              human
            </p>
            <p className='small-regular text-zinc-600'>
              {human_percent.toFixed(0)}%
            </p>
          </div>
          <div className='flex flex-col gap-y-0.5'>
            <p className='text-sm font-medium leading-tight text-indigo-500'>
              mixed
            </p>
            <p className='small-regular text-zinc-600'>
              {mixed_percent.toFixed(0)}%
            </p>
          </div>
          <div className='flex flex-col gap-y-0.5'>
            <p className='text-sm font-medium leading-tight text-amber-600'>
              ai
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
