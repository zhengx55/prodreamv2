import { Button } from '@/components/ui/button';
import useButtonTrack from '@/hooks/useBtnTrack';
import { useMembershipInfo } from '@/hooks/useMemberShip';
import { useAIEditor } from '@/zustand/store';
import { AlertTriangle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { memo } from 'react';

const RemainUsages = () => {
  const { data: usage } = useMembershipInfo();
  const { mutateAsync: buttonTrack } = useButtonTrack();
  const transEditor = useTranslations('Editor');

  const updatePaymentModal = useAIEditor((state) => state.updatePaymentModal);
  return (
    <div className='flex-between w-[600px] rounded-b bg-gray-200 px-2 py-1'>
      <div className='flex items-center gap-x-2'>
        <AlertTriangle className='text-neutral-400' size={15} />
        <p className='subtle-regular text-neutral-400'>
          {transEditor('RemainUsages.WeeklyPromptsUsed', {
            used: usage?.free_times_detail.Copilot,
          })}{' '}
          &nbsp;
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
            {transEditor('RemainUsages.Go_unlimited')}
          </Button>
        </p>
      </div>
    </div>
  );
};
export default memo(RemainUsages);
