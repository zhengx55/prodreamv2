import { Button } from '@/components/ui/button';
import { useButtonTrack, useMembershipInfo } from '@/query/query';
import { useAIEditor } from '@/zustand/store';
import { AlertTriangle } from 'lucide-react';
import { memo } from 'react';

const RemainUsages = () => {
  const { data: usage } = useMembershipInfo();
  const { mutateAsync: buttonTrack } = useButtonTrack();

  const updatePaymentModal = useAIEditor((state) => state.updatePaymentModal);
  return (
    <div className='flex-between w-[600px] rounded-b bg-gray-200 px-2 py-1'>
      <div className='flex items-center gap-x-2'>
        <AlertTriangle className='text-shadow' size={15} />
        <p className='subtle-regular text-shadow'>
          {usage?.free_times_detail.Copilot}/20 weekly AI prompts used;&nbsp;
          <Button
            onClick={async () => {
              await buttonTrack({
                event: 'open payment at copiolt menu',
              });
              updatePaymentModal(true);
            }}
            role='button'
            variant={'ghost'}
            className='subtle-regular h-max w-max cursor-pointer bg-transparent p-0 text-violet-500'
          >
            Go unlimited
          </Button>
        </p>
      </div>
    </div>
  );
};
export default memo(RemainUsages);
