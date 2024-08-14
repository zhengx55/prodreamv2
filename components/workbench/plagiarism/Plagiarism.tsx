import { memo } from 'react';
import Starter from '../common/Starter';

type Props = {};

const Plagiarism = (props: Props) => {
  return (
    <div className='p-4'>
      <Starter type='plagiarism' onClick={() => {}} />
    </div>
  );
};

export default memo(Plagiarism);
