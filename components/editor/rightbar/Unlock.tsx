import { Diamond } from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import { useAIEditor } from '@/zustand/store';
import { m } from 'framer-motion';
import Image from 'next/image';
import { memo } from 'react';

const Unlock = ({ text }: { text: String }) => {
  const updatePaymentModal = useAIEditor((state) => state.updatePaymentModal);
  return (
    <m.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      key={'membership-check'}
      className='flex h-max w-full flex-col gap-y-4 overflow-hidden rounded border border-gray-200 px-4 py-4'
    >
      <Image
        src='/editor/Upgrade.png'
        alt='Balance check'
        width={260}
        height={270}
        className='h-auto w-52 self-center'
        priority
      />
      <p className='text-center text-sm font-normal text-zinc-600'>{text}</p>
      <Button
        onClick={() => updatePaymentModal(true)}
        className='base-regular h-max w-max self-center rounded-full bg-violet-500 px-20'
        role='button'
      >
        <Diamond />
        Upgrade
      </Button>
    </m.div>
  );
};
export default memo(Unlock);
