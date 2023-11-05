import React from 'react';
import SvgBackground from './SvgBackground';
import SvgCard from './SvgCard';

const Rightbar = () => {
  return (
    <div className='absolute right-0 top-0 hidden h-full rounded-md bg-white px-2 md:flex md:w-[230px]'>
      <SvgCard>
        <p>2</p>
      </SvgCard>
    </div>
  );
};

export default Rightbar;
