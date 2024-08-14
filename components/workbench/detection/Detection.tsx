import { memo } from 'react';
import Starter from '../common/Starter';

type Props = {};

const Detection = (props: Props) => {
  return (
    <div className='p-4'>
      <Starter type='detection' onClick={() => {}} />
    </div>
  );
};

export default memo(Detection);
