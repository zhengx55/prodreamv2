import Spacer from '@/components/root/Spacer';
import { Separator } from '@/components/ui/separator';
import { IDetectionResult } from '@/query/type';
import { m } from 'framer-motion';
import { memo, useMemo } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import Suggestion from './Suggestion';

const labels = ['human', 'mixed', 'ai generated'];
const primaryColor = ['#48B251', '#5266CC', '#E58600'];
const secondaryColor = ['#D5F9D8', '#F2F4FF', '#FFEACC'];
const description = [
  'We are moderately confident this text is entirely',
  'We are highly, confident this text was',
  'We are moderately confident this text is entirely',
];
const breakdown_descriptioons = [
  'Our detector is highly confident that the text is written entirely by a human',
  'Our detector is highly confident that the text may include parts written by Al',
  'Our detector is highly confident that the text is written by Al ',
];

type Props = { result: IDetectionResult };
const Result = ({ result }: Props) => {
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
      className='flex h-full w-full flex-col rounded'
    >
      <h3 className='base-medium'>Classification&nbsp;&nbsp;</h3>
      <Spacer y='8' />
      <p className='small-regular leading-relaxed text-zinc-600'>
        {description[result_index]}&nbsp;
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
        &nbsp;&nbsp;Probability Al generated
      </p>
      <Spacer y='44' />
      <Separator orientation='horizontal' className='bg-gray-200' />
      <Spacer y='44' />
      <h3 className='base-medium'>Probability Breakdown</h3>
      <Spacer y='8' />
      <p className='small-regular leading-relaxed text-zinc-600'>
        {breakdown_descriptioons[result_index]}
      </p>
      <Spacer y='32' />
      <div className='h-2.5 w-full rounded-3xl bg-orange-100'></div>
      <Spacer y='44' />
      <Separator orientation='horizontal' className='bg-gray-200' />
      <Spacer y='44' />
      <Suggestion />
    </m.div>
  );
};
export default memo(Result);
