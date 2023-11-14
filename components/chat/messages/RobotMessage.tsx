import React, { memo } from 'react';

type Props = { message: string };

const RobotMessage = ({ message }: Props) => {
  return (
    <div className='base-light flex w-[80%] flex-col self-start rounded-[20px] bg-shadow-200 p-4'>
      {message}
    </div>
  );
};

export default memo(RobotMessage);
