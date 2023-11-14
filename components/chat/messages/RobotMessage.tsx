import React, { memo } from 'react';

type Props = { message: string };

const RobotMessage = ({ message }: Props) => {
  return (
    <div className='small-regular flex w-[80%] flex-col self-start rounded-xl bg-shadow-200 p-4'>
      {message}
    </div>
  );
};

export default memo(RobotMessage);
