import Tab from '@/components/pricing/Tab';
import Icon from '@/components/root/Icon';
import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { IDiscount, ISubscription } from '@/types';
import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';

const Plan = dynamic(() => import('@/components/pricing/Plan'));
const QA = dynamic(() => import('@/components/pricing/QA'));
async function getBalance() {
  const token = cookies().get('token')?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/payment/balance`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!res.ok) throw new Error('Failed to fetch balance');
  const data = await res.json();
  if (data.code !== 0) throw new Error('Failed to fetch balance');
  return data.data;
}

async function getDiscountInfo() {
  const token = cookies().get('token')?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/user/referral_discount`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!res.ok) throw new Error('Failed to fetch coupon');
  const data = await res.json();
  if (data.code !== 0) throw new Error('Failed to fetch coupon');
  return data.data;
}

export default async function Page() {
  const membership: ISubscription = await getBalance();
  const discount_info: IDiscount = await getDiscountInfo();
  // const isInChina = await getIpAddress();

  return (
    <main className='relative flex h-full w-full flex-col items-center overflow-y-auto'>
      <HeaderSection text='Upgrade to Unlimited to unlock unlimited possibilities' />
      <Spacer y='40' />
      <h1 className='text-center text-[40px] font-medium'>Plans & Pricing</h1>
      <Spacer y='10' />
      <p className='base-regular text-center text-neutral-400'>
        Select the perfect plan to enhance your academic writing journey
      </p>
      <Spacer y='10' />
      <Tab membership={membership} discount={discount_info} />
      <Spacer y='100' />
    </main>
  );
  // : (
  //   <main className='relative flex w-full flex-col items-center overflow-y-auto'>
  //     <HeaderSection text='升级到Unlimited解锁无限可能' />
  //     <div className='flex w-[900px] flex-col'>
  //       <Spacer y='56' />
  //       <h2 className='text-3xl font-medium text-neutral-900 '>
  //         会员服务和定价
  //       </h2>
  //       <Spacer y='5' />
  //       <p>订阅会员来提升你的学术写作体验</p>
  //       <Spacer y='32' />
  //       <div className='flex gap-x-6'>
  //         {CNPayments.map((item, index) => (
  //           <PricingCard key={`pricing-${index}`} item={item} />
  //         ))}
  //       </div>
  //       <Spacer y='80' />
  //       <h2 className='text-3xl font-medium text-neutral-900'>会员权益</h2>
  //       <Spacer y='32' />
  //       <div className='flex-between w-full'>
  //         <span className='w-80' />
  //         <h3 className='title-medium w-52 text-center text-zinc-900'>
  //           基础版
  //         </h3>
  //         <h3 className='title-medium w-52 text-center text-zinc-900'>Pro版</h3>
  //       </div>
  //       <Spacer y='16' />
  //       <div className='flex justify-between'>
  //         <div className='flex w-80 flex-col gap-y-6'>
  //           {CNFeatures.map((item) => {
  //             return <Feature key={item.feature} item={item} />;
  //           })}
  //         </div>
  //         <div className='flex w-52 flex-col gap-y-4 bg-[#FCFBFF]'>
  //           <p className='inline-flex justify-center py-4'>20次/周</p>
  //           <p className='inline-flex justify-center py-4'>5次/周</p>
  //           <p className='inline-flex justify-center py-4'>100句/周</p>
  //           <p className='inline-flex justify-center py-4'>&#10003;</p>
  //           <p className='inline-flex justify-center py-4'>&#10003;</p>
  //           <p className='inline-flex justify-center py-4'>&#8212;</p>
  //           <p className='inline-flex justify-center py-4'>&#8212;</p>
  //           <p className='inline-flex justify-center py-4'>&#10003;</p>
  //           <p className='inline-flex justify-center py-4'>3篇</p>
  //         </div>
  //         <div className='flex w-52 flex-col gap-y-4 bg-[#FCFBFF]'>
  //           <p className='inline-flex justify-center py-4'>无限的</p>
  //           <p className='inline-flex justify-center py-4'>无限的</p>
  //           <p className='inline-flex justify-center py-4'>无限的</p>
  //           <p className='inline-flex justify-center py-4'>&#10003;</p>
  //           <p className='inline-flex justify-center py-4'>&#10003;</p>
  //           <p className='inline-flex justify-center py-4'>&#10003;</p>
  //           <p className='inline-flex justify-center py-4'>&#10003;</p>
  //           <p className='inline-flex justify-center py-4'>&#10003;</p>
  //           <p className='inline-flex justify-center py-4'>无限的</p>
  //         </div>
  //       </div>
  //       <Spacer y='80' />
  //     </div>
  //   </main>
  // );
}

const HeaderSection = ({ text }: { text: string }) => (
  <div className='flex-center h-10 w-full shrink-0 gap-x-2 bg-zinc-700'>
    <Icon
      width={18}
      height={18}
      className='size-4'
      priority
      alt='diamond'
      src='/editor/gem.svg'
    />
    <p className='subtle-regular text-white'>{text}</p>
  </div>
);

const PricingCard = ({ item }: { item: any }) => (
  <div className='relative flex h-56 w-44 flex-col items-center justify-between rounded-lg border border-gray-200 px-8 py-6'>
    {item.discountDurationMonths && (
      <div className='absolute -top-2 right-0 flex h-5 w-12 items-center justify-center rounded-bl rounded-tl rounded-tr-lg border bg-zinc-700'>
        <p className='text-xs font-medium leading-normal text-white'>
          {item.discountDurationMonths}折
        </p>
      </div>
    )}
    <h3 className='text-xl font-medium text-zinc-900'>{item.name}</h3>
    <h2 className='text-3xl font-medium text-neutral-600'>
      {item.currentPrice}
    </h2>
    <Button role='link' className='h-max w-max rounded-lg px-8 py-1'>
      立即开通
    </Button>
  </div>
);

const Feature = ({ item }: { item: any }) => (
  <div key={item.feature} className='flex flex-col gap-y-1'>
    <div className='flex items-center gap-x-2'>
      <Icon
        width={24}
        height={24}
        priority
        alt={item.description}
        src={item.icon}
      />
      <p className='title-regular text-zinc-900'>{item.feature}</p>
    </div>
    <p className='small-regular text-zinc-700'>{item.description}</p>
    {item.subFeatures && (
      <div className='mt-5 flex flex-col gap-y-6'>
        {item.subFeatures.map((feature: any) => (
          <div className='flex flex-col gap-y-1 pl-7' key={feature.name}>
            <p className='base-regular text-zinc-900'>{feature.name}</p>
            <p className='small-regular text-zinc-700'>{feature.description}</p>
          </div>
        ))}
      </div>
    )}
  </div>
);
