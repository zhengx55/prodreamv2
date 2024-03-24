import Spacer from '@/components/root/Spacer';
import { Separator } from '@/components/ui/separator';
import { m } from 'framer-motion';
import { PieChart } from 'react-minimal-pie-chart';

const labels = ['human', 'mixed', 'ai'];
const primaryColor = [''];
const secondaryColor = [''];

type Props = {};
const Result = (props: Props) => {
  return (
    <m.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      key={'detection-result'}
      className='flex h-full w-full flex-col rounded'
    >
      <h3 className='base-medium'>
        Classification&nbsp;&nbsp;
        <span className='small-regular inline-flex bg-green-50 px-1.5 py-1 text-green-500'>
          ai generated
        </span>
      </h3>
      <Spacer y='8' />
      <p className='small-regular leading-relaxed text-zinc-600'>
        We are moderately confident this text is entirely&nbsp;
      </p>
      <Spacer y='32' />
      <div className='size-36 self-center'>
        <PieChart
          animate
          lengthAngle={-360}
          data={[
            { value: 5, color: '#E58600' },
            { value: 95, color: '#FFFAF2' },
          ]}
        />
      </div>
      <Spacer y='24' />

      <Spacer y='44' />
      <Separator orientation='horizontal' className='bg-gray-200' />
      <Spacer y='44' />
      <h3 className='base-medium'>Probability Breakdown</h3>
      <Spacer y='8' />
      <p className='small-regular leading-relaxed text-zinc-600'>
        Our detector is highly confident that the text is written by Al
      </p>
      <Spacer y='32' />
      <div className='h-2.5 w-full rounded-3xl bg-orange-100'></div>
      <Spacer y='44' />
      <Separator orientation='horizontal' className='bg-gray-200' />
      <Spacer y='44' />
    </m.div>
  );
};
export default Result;
