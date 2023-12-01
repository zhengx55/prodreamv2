'use client';

import { useToast } from '../ui/use-toast';

type Props = { link: string };

const ReferralsLink = ({ link }: Props) => {
  const { toast } = useToast();
  return (
    <div className='flex-between w-max gap-x-20 rounded-lg border border-shadow-border p-4'>
      <p className='small-regular text-shadow-100'>{link}</p>
      <span
        onClick={() => {
          navigator.clipboard.writeText(link);
          toast({
            variant: 'default',
            description: 'Copy to clipboard',
          });
        }}
        className='small-regular cursor-pointer text-primary-200'
      >
        Copy link
      </span>
    </div>
  );
};

export default ReferralsLink;
