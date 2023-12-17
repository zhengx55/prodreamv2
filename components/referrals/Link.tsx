'use client';

import { toast } from 'sonner';

type Props = { link: string };

const ReferralsLink = ({ link }: Props) => {
  return (
    <div className='flex-between w-max gap-x-20 rounded-lg border border-shadow-border p-4'>
      <p className='small-regular text-shadow-100'>{link}</p>
      <span
        onClick={() => {
          navigator.clipboard.writeText(link);
          toast.success('Copy to clipboard');
        }}
        className='small-regular cursor-pointer text-primary-200'
      >
        Copy link
      </span>
    </div>
  );
};

export default ReferralsLink;
