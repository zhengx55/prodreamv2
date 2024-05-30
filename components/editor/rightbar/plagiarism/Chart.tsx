import Spacer from '@/components/root/Spacer';
import { EditorDictType } from '@/types';
import { memo } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { useTranslations } from 'next-intl';

type Props = { score: number; t: EditorDictType };
const primaryColor = ['#48B251', '#E58600', '#E55245'];
const secondaryColor = ['#D5F9D8', '#FFEACC', '#FFF3F2'];
const Chart = ({ score, t }: Props) => {
  const trans = useTranslations('Editor');
  const result_index = score < 10 ? 0 : score < 71 ? 1 : 2;
  return (
    <div className='flex w-full flex-col items-center'>
      <div className='size-36 self-center'>
        <PieChart
          animate
          lengthAngle={-360}
          data={[
            { value: score, color: primaryColor[result_index] },
            { value: 100 - score, color: secondaryColor[result_index] },
          ]}
        />
      </div>
      <Spacer y='24' />

      <p className='small-regular text-zinc-600'>
        <span
          style={{
            color: primaryColor[result_index],
          }}
          className='text-2xl font-medium italic'
        >
          {score.toFixed(0)}%
        </span>
        &nbsp;
        {trans('Plagiarism.score')}
      </p>
    </div>
  );
};
export default memo(Chart);
