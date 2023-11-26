import React from 'react';

type Props = {};

const MessageList = (props: Props) => {
  return (
    <div className='flex w-[70%] flex-col items-center'>
      {/* top bar */}
      <section className='flex h-16 w-full items-center gap-x-4 rounded-tl-2xl border-b border-[#E8ECEF] bg-[#FEFEFE] px-7 shadow-chatWindow'>
        <h1 className='title-semibold'>Max Tang, M.Ed.</h1>
        <p className='subtle-regular text-shadow-100'>
          College admission expert
        </p>
      </section>
      {/* chat message list section */}

      {/* chat type field */}
    </div>
  );
};

export default MessageList;
