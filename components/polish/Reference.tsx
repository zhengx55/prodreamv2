import { memo } from 'react';
import Spacer from '../root/Spacer';

type Props = {};
const Reference = (props: Props) => {
  return (
    <div className='mx-auto flex w-[750px] flex-col font-inter'>
      <h3 className='text-xl font-[600]'>References</h3>
      <Spacer y='20' />
      <ol className='list-decimal px-8'>
        <li className='my-1'></li>
      </ol>
    </div>
  );
};
export default memo(Reference);
