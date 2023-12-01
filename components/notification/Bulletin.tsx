import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import Release from './Release';
import Activitiy from './Activitiy';
import Notification from './Notification';

const Bulletin = () => {
  const [tab, setTab] = useState(0);
  return (
    <>
      <h1 className='title-semibold'>Bulletin</h1>
      <div className='grid grid-cols-3'>
        <span
          onClick={() => setTab(0)}
          className={`${
            tab === 0 ? 'text-primary-200' : 'text-shadow-100'
          } bulletin-tab`}
        >
          New Release
        </span>
        <span
          onClick={() => setTab(1)}
          className={`${
            tab === 1 ? 'text-primary-200' : 'text-shadow-100'
          } bulletin-tab`}
        >
          Activities
        </span>
        <span
          onClick={() => setTab(2)}
          className={`${
            tab === 2 ? 'text-primary-200' : 'text-shadow-100'
          } bulletin-tab`}
        >
          Notifications
        </span>
      </div>
      <div className='w-full'>
        <AnimatePresence mode='wait'>
          {tab === 0 ? (
            <Release />
          ) : tab === 1 ? (
            <Activitiy />
          ) : (
            <Notification />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Bulletin;
