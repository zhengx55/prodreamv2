import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { IDetectionResult } from '@/query/type';
import { EditorDictType } from '@/types';
import { m } from 'framer-motion';
import { RefreshCcw } from 'lucide-react';
import dynamic from 'next/dynamic';
import { memo, useMemo } from 'react';
import { PieChart } from 'react-minimal-pie-chart';

const Suggestion = dynamic(() => import('./Suggestion'));

const labels = ['human', 'mixed', 'ai generated'];
const primaryColor = ['#48B251', '#5266CC', '#E58600'];
const secondaryColor = ['#D5F9D8', '#F2F4FF', '#FFEACC'];

type Props = {
  recheck: () => Promise<void>;
  result: IDetectionResult;
  t: EditorDictType;
};
const Result = ({ recheck, result, t }: Props) => {
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
          {t.Detection.Classification}&nbsp;&nbsp;
        </h3>
        <Button
          role='button'
          variant={'ghost'}
          className='h-max rounded border border-zinc-600 px-4 py-1 hover:transform-none hover:opacity-50'
          onClick={recheck}
        >
          <RefreshCcw size={14} className='text-zinc-600' />
          <p className='subtle-regular text-zinc-600'>{t.Plagiarism.recheck}</p>
        </Button>
      </div>

      <Spacer y='8' />
      <p className='small-regular leading-relaxed text-zinc-600'>
        {result.message}&nbsp;
        <span
          className='small-regular inline-block px-1.5 py-1'
          style={{
            backgroundColor: secondaryColor[result_index],
            color: primaryColor[result_index],
          }}
        >
          {labels[result_index]}
        </span>
      </p>
      <Spacer y='32' />
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
      <Spacer y='24' />
      <p className='inline-flex items-center justify-center text-xs text-zinc-600'>
        <span
          style={{
            color: primaryColor[result_index],
          }}
          className='text-2xl font-medium italic'
        >
          {ai_percent.toFixed(0)}%
        </span>
        &nbsp;&nbsp;{t.Detection.probability}
      </p>
      <Spacer y='44' />
      <Separator orientation='horizontal' className='bg-gray-200' />
      <Spacer y='44' />
      <h3 className='base-medium'>{t.Detection.breakdown}</h3>
      <Spacer y='8' />
      <p className='small-regular leading-relaxed text-zinc-600'>
        The probability this text has been entirely written by a human, AI or a
        mix of the two.
      </p>
      <Spacer y='32' />
      <Bar
        human_percent={human_percent}
        mixed_percent={mixed_percent}
        ai_percent={ai_percent}
      />
      <Spacer y='44' />
      <Separator orientation='horizontal' className='bg-gray-200' />
      <Spacer y='44' />
      {result.highlight_sentences.length > 0 && (
        <Suggestion t={t} suggestions={result.highlight_sentences} />
      )}
      <Spacer y='20' />
    </m.div>
  );
};

const Bar = ({
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
      <div className='flex w-full items-center'>
        <div
          className='flex flex-col gap-y-0.5'
          style={{
            width: `${human_percent}%`,
            minWidth: '20%',
          }}
        >
          <p className='text-sm font-medium leading-tight text-green-500'>
            human
          </p>
          <p className='small-regular text-zinc-600'>
            {human_percent.toFixed(0)}%
          </p>
        </div>
        <div
          style={{
            width: `${mixed_percent}%`,
            minWidth: '20%',
          }}
          className='flex flex-col gap-y-0.5'
        >
          <p className='text-sm font-medium leading-tight text-indigo-500'>
            mixed
          </p>
          <p className='small-regular text-zinc-600'>
            {mixed_percent.toFixed(0)}%
          </p>
        </div>
        <div
          style={{
            width: `${ai_percent}%`,
            minWidth: '20%',
          }}
          className='flex flex-col gap-y-0.5'
        >
          <p className='text-sm font-medium leading-tight text-amber-600'>ai</p>
          <p className='small-regular text-zinc-600'>
            {ai_percent.toFixed(0)}%
          </p>
        </div>
      </div>
    </>
  );
};

export default memo(Result);
