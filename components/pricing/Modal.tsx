import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  PricingAnnualyUnlimited,
  PricingBasic,
  PricingUnlimited,
} from '@/constant';
import { useMembershipInfo } from '@/hooks/useMemberShip';
import { getDiscountInfo } from '@/query/api';
import { useAIEditor } from '@/zustand/store';
import { useQuery } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { memo } from 'react';
import Icon from '../root/Icon';
import Spacer from '../root/Spacer';
import { Button } from '../ui/button';
import { Dialog, DialogClose, DialogContent } from '../ui/dialog';
import Card from './Card';

const MembershipModal = () => {
  const { data } = useMembershipInfo();
  const open = useAIEditor((state) => state.paymentModalOpen);
  const setOpen = useAIEditor((state) => state.updatePaymentModal);
  const isBasic =
    data?.subscription === 'free_trail' || data?.subscription === 'basic';
  const isMonthly = data?.subscription_type === 'month';
  const isAnually = data?.subscription_type === 'year';

  const { data: discountInfo } = useQuery({
    queryKey: ['discount'],
    queryFn: () => getDiscountInfo(),
    staleTime: 1000 * 60 * 60 * 24,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        className='z-50 border-none px-8 py-4 md:w-[900px] md:gap-y-0 md:rounded-lg'
      >
        <div className='relative flex w-full flex-col'>
          <DialogClose asChild>
            <Button
              className='absolute right-0 h-max w-max rounded-full border border-gray-200 p-0.5'
              variant={'ghost'}
            >
              <X size={18} className='text-shadow-border' />
            </Button>
          </DialogClose>
          <h1 className='text-center text-[40px] font-medium'>
            Plans & Pricing
          </h1>
          <Spacer y='5' />
          <p className='base-regular text-center text-neutral-400'>
            Select the perfect plan to enhance your academic writing journey
          </p>
          <Spacer y='10' />
          <Tabs
            defaultValue='Annually'
            className='flex w-full flex-col justify-center'
          >
            <TabsList className='h-10 w-max gap-x-2 self-center rounded-full bg-violet-100 p-1'>
              <TabsTrigger
                className='gap-x-1 rounded-full px-7 text-violet-500 data-[state=active]:bg-white'
                value='Annually'
              >
                Annually
                <span className='subtle-semibold rounded-full bg-violet-500 px-2 py-0.5 text-white'>
                  -50%
                </span>
              </TabsTrigger>
              <TabsTrigger
                value='Monthly'
                className='rounded-full px-9 text-violet-500 data-[state=active]:bg-white'
              >
                Monthly
              </TabsTrigger>
            </TabsList>
            <Spacer y='15' />
            <TabsContent value='Annually'>
              <div className='flex w-full justify-center gap-x-10 py-4'>
                <Card current={isBasic} basic={true} info={PricingBasic} />
                <Card
                  current={isMonthly}
                  purchase_type='annualy'
                  info={PricingAnnualyUnlimited}
                  discount={discountInfo}
                />
              </div>
            </TabsContent>
            <TabsContent value='Monthly'>
              <div className='flex w-full justify-center gap-x-10 py-4'>
                <Card current={isBasic} basic={true} info={PricingBasic} />
                <Card
                  current={isAnually}
                  purchase_type='monthly'
                  info={PricingUnlimited}
                  discount={discountInfo}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <Spacer y='30' />
        <div className='absolute bottom-0 flex h-10 w-full items-center gap-x-2 rounded-b-lg bg-black px-5'>
          <Icon
            width={18}
            height={18}
            className='size-4'
            priority
            alt='diamond'
            src='/editor/gem.svg'
          />
          <p className='subtle-regular text-white'>
            Upgrade to Unlimited to unleash the full potential of your academic
            writing
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default memo(MembershipModal);
