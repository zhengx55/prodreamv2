'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  PricingAnnualyUnlimited,
  PricingBasic,
  PricingUnlimited,
} from '@/constant';
import { ButtonTrack } from '@/query/api';
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
  return (
    <Tabs
      defaultValue='Annually'
      className='flex w-full flex-col justify-center gap-y-4'
    >
      <TabsList className='h-10 w-max gap-x-2 self-center rounded-full bg-doc-primary p-1'>
        <TabsTrigger
          className='rounded-full px-9 text-white data-[state=active]:bg-white data-[state=active]:text-doc-primary'
          value='Annually'
        >
          Annually
        </TabsTrigger>
        <TabsTrigger
          value='Monthly'
          className='rounded-full px-9 text-white data-[state=active]:bg-white data-[state=active]:text-doc-primary'
          onClick={async () => await ButtonTrack('Monthly_Plan')}
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
