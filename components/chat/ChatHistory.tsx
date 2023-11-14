'use client';

import { ChatSteps } from '@/constant/enum';
import { memo } from 'react';

type Props = { onNavigation: (value: number) => void; current: number };

const ChatHistory = ({ onNavigation, current }: Props) => {
  return (
    <div className='hidden flex-col bg-shadow-50 md:flex md:w-[var(--chathistory-width)] md:flex-[0.25] md:rounded-br-lg md:rounded-tr-lg md:border md:border-shadow-border md:p-4'>
      <h1 className='h3-semibold mb-4'>Chat History</h1>
      <div
        className={`${
          current === 1 ? 'bg-primary-50' : ''
        } flex cursor-pointer flex-col gap-y-2 rounded-xl p-4 hover:bg-primary-50`}
        onClick={() => {
          onNavigation(1);
        }}
      >
        <h1 className='base-semibold'>{ChatSteps.MOVTIVATION}</h1>
        <p className='subtle-medium text-shadow'>
          Text to speech voice: Introducing...
        </p>
      </div>
      <div
        className={`${
          current === 2 ? 'bg-primary-50' : ''
        } flex cursor-pointer flex-col gap-y-2 rounded-xl p-4 hover:bg-primary-50`}
        onClick={() => {
          onNavigation(2);
        }}
      >
        <h1 className='base-semibold'>{ChatSteps.EDUCATION}</h1>
        <p className='subtle-medium text-shadow'>
          Text to speech voice: Introducing...
        </p>
      </div>
      <div
        className={`${
          current === 3 ? 'bg-primary-50' : ''
        } flex cursor-pointer flex-col gap-y-2 rounded-xl p-4 hover:bg-primary-50`}
        onClick={() => {
          onNavigation(3);
        }}
      >
        <h1 className='base-semibold'>{ChatSteps.PREVIOUS}</h1>
        <p className='subtle-medium text-shadow'>
          Text to speech voice: Introducing...
        </p>
      </div>
      <div
        className={`${
          current === 4 ? 'bg-primary-50' : ''
        } flex cursor-pointer flex-col gap-y-2 rounded-xl p-4 hover:bg-primary-50`}
        onClick={() => {
          onNavigation(4);
        }}
      >
        <h1 className='base-semibold'>{ChatSteps.PLANNING}</h1>
        <p className='subtle-medium text-shadow'>
          Text to speech voice: Introducing...
        </p>
      </div>
      <div
        className={`${
          current === 5 ? 'bg-primary-50' : ''
        } flex cursor-pointer flex-col gap-y-2 rounded-xl p-4 hover:bg-primary-50`}
        onClick={() => {
          onNavigation(5);
        }}
      >
        <h1 className='base-semibold'>{ChatSteps.REASON}</h1>
        <p className='subtle-medium text-shadow'>
          Text to speech voice: Introducing...
        </p>
      </div>
    </div>
  );
};

export default memo(ChatHistory);
