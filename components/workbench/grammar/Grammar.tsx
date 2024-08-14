import { memo } from 'react';
import Starter from '../common/Starter';

type Props = {};

const Grammar = (props: Props) => {
  return (
    <div className='p-4'>
      <Starter type='grammar' onClick={() => {}} />
    </div>
  );
};

export default memo(Grammar);
