import React from 'react';

const Rightbar = () => {
  return (
    <div className='absolute right-0 top-0 hidden h-full flex-col rounded-md bg-white px-4 md:flex md:w-[240px]'>
      <h2 className='title-semibold text-black-100'>Essay Evaluation</h2>
      <h2 className='title-semibold text-black-100'>AI Check</h2>
      <h2 className='title-semibold text-black-100'>Settings</h2>
    </div>
  );
};

export default Rightbar;
