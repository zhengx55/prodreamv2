import React, { memo } from 'react';

type Props = { message: string };

const MineMessage = ({ message }: Props) => {
  return (
    <div className='small-regular  flex max-w-[80%] self-end rounded-xl border border-shadow-200 bg-white p-2 text-black-700'>
      {message}
    </div>
  );
};

export default memo(MineMessage);
