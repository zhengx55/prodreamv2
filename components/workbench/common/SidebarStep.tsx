import { memo } from 'react';

export const Step = memo(
  ({
    number,
    colorClass,
    text,
    description,
  }: {
    number: number;
    colorClass: string;
    text: string;
    description: string;
  }) => (
    <div className='space-y-2 rounded-lg bg-white p-2'>
      <div className='flex items-center gap-x-2'>
        <div className={`small-regular rounded px-2.5 py-1 ${colorClass}`}>
          Step {number}
        </div>
        <h2 className='base-medium text-zinc-800'>{text}</h2>
      </div>
      <p className='text-sm leading-relaxed text-zinc-600'>{description}</p>
    </div>
  )
);
