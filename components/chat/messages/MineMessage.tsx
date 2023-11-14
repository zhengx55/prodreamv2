import React, { memo } from 'react';

type Props = { message: string };

const MineMessage = ({ message }: Props) => {
  return (
    <div className='base-light flex max-w-[80%] self-end rounded-[20px] border-[3px] border-shadow-200 bg-white p-4 text-black-700'>
      {message}
    </div>
  );
};

export default memo(MineMessage);
