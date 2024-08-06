import { memo } from 'react';

type Props = {};

const OutlineContent = (props: Props) => {
  return (
    <div className='flex-center flex-1 bg-slate-100 pt-6'>
      <div className='h-full w-[80%] overflow-y-auto bg-white px-8 py-6'></div>
    </div>
  );
};

export default memo(OutlineContent);
