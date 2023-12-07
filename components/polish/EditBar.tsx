import React from 'react';
import { Separator } from '../ui/separator';

type Props = {};

const EditBar = (props: Props) => {
  return (
    <div className='flex rounded-lg border-shadow-border bg-nav-selected px-4 py-1'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
      >
        <path
          d='M6.99514 4.59401L2.27614 9.28102C1.88614 9.67202 1.88614 10.328 2.27614 10.719L6.99514 15.406L8.40115 14L5.43214 11L16.9641 11.031C18.0881 11.031 18.9951 11.913 18.9951 13V18C18.9951 18.552 19.4431 19 19.9951 19C20.5471 19 20.9951 18.552 20.9951 18V13C20.9951 10.796 19.1781 9.03102 16.9641 9.03102L5.43214 9.00001L8.40115 6.00001L6.99514 4.59401Z'
          fill='#1D1B1E'
        />
      </svg>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='25'
        height='24'
        viewBox='0 0 25 24'
        fill='none'
      >
        <path
          d='M17.4714 4.59401L22.1904 9.28102C22.5804 9.67202 22.5804 10.328 22.1904 10.719L17.4714 15.406L16.0654 14L19.0334 11L7.50244 11.031C6.37844 11.031 5.47143 11.913 5.47143 13V18C5.47143 18.552 5.02343 19 4.47143 19C3.91944 19 3.47144 18.552 3.47144 18V13C3.47144 10.796 5.28844 9.03102 7.50244 9.03102L19.0334 9.00001L16.0654 6.00001L17.4714 4.59401Z'
          fill='#1D1B1E'
        />
      </svg>
      <Separator orientation='vertical' className='bg-shadow-border' />
    </div>
  );
};

export default EditBar;
