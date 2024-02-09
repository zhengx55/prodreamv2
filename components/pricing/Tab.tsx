'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PricingBasic, PricingUnlimited } from '@/constant';
import { ISubscription } from '@/types';
import Spacer from '../root/Spacer';
import Card from './Card';

type Props = { membership: ISubscription };
const Tab = ({ membership }: Props) => {
  const isBasic =
    membership.subscription === 'free_trail' ||
    membership.subscription === 'basic';
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
        >
          Monthly
        </TabsTrigger>
      </TabsList>
      <Spacer y='35' />
      <TabsContent value='Annually'>
        <div className='flex w-full justify-center gap-x-10 py-4'>
          <Card current={isBasic} info={PricingBasic} />
          <Card
            current={!isBasic}
            purchase_type='monthly'
            info={PricingUnlimited}
          />
        </div>
      </TabsContent>
      <TabsContent value='Monthly'>
        <div className='flex w-full justify-center gap-x-10 py-4'>
          <Card current={isBasic} info={PricingBasic} />
          <Card
            current={!isBasic}
            purchase_type='annualy'
            info={PricingUnlimited}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};
export default Tab;
