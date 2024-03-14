'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  PricingAnnualyUnlimited,
  PricingBasic,
  PricingUnlimited,
} from '@/constant';
import { useButtonTrack } from '@/query/query';
import { ISubscription } from '@/types';
import Spacer from '../root/Spacer';
import Card from './Card';

type Props = { membership: ISubscription };
const Tab = ({ membership }: Props) => {
  const isBasic =
    membership.subscription === 'free_trail' ||
    membership.subscription === 'basic';
  const isMonthly = membership.subscription_type === 'month';
  const isAnually = membership.subscription_type === 'year';
  const { mutateAsync: ButtonTrack } = useButtonTrack();

  return (
    <Tabs
      defaultValue='Annually'
      className='flex w-full flex-col justify-center gap-y-4'
    >
      <TabsList className='h-10 w-max gap-x-2 self-center rounded-full bg-violet-100 p-1'>
        <TabsTrigger
          className='gap-x-1 rounded-full px-7 text-doc-primary data-[state=active]:bg-white'
          value='Annually'
        >
          Annually
          <span className='subtle-semibold rounded-full bg-doc-primary px-2 py-0.5 text-white'>
            -50%
          </span>
        </TabsTrigger>
        <TabsTrigger
          value='Monthly'
          className='rounded-full px-9 text-doc-primary data-[state=active]:bg-white'
          onClick={async () => await ButtonTrack({ event: 'Monthly_Plan' })}
        >
          Monthly
        </TabsTrigger>
      </TabsList>
      <Spacer y='35' />
      <TabsContent value='Annually'>
        <div className='flex w-full justify-center gap-x-10 py-4'>
          <Card current={isBasic} basic={true} info={PricingBasic} />
          <Card
            current={isAnually}
            purchase_type='annualy'
            info={PricingAnnualyUnlimited}
          />
        </div>
      </TabsContent>
      <TabsContent value='Monthly'>
        <div className='flex w-full justify-center gap-x-10 py-4'>
          <Card current={isBasic} basic={true} info={PricingBasic} />
          <Card
            current={isMonthly}
            purchase_type='monthly'
            info={PricingUnlimited}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};
export default Tab;
