import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { ArrowUpSquare } from 'lucide-react';
import Image from 'next/image';
import { memo, ReactNode } from 'react';

const PlanCard = memo(
  ({
    children,
    description,
    bgColor,
    images,
    isCurrent,
    upgrade,
    foreGroundClassName,
  }: {
    children: ReactNode;
    description: string;
    bgColor: string;
    images: { background: string; foreground: string };
    isCurrent?: boolean;
    upgrade?: boolean;
    foreGroundClassName?: string;
  }) => (
    <div
      className={`relative flex h-[220px] w-1/3 flex-col justify-between rounded-lg border border-gray-200 ${bgColor} p-4`}
    >
      <h3 className='font-semibold leading-tight'>{children}</h3>
      {images.background && (
        <Image
          alt='bg'
          src={images.background}
          className='absolute right-2 z-10 h-auto w-[68px]'
          width={80}
          height={80}
          priority
        />
      )}
      {images.foreground && (
        <Image
          alt='agent'
          src={images.foreground}
          width={80}
          height={80}
          priority
          className={cn(foreGroundClassName, 'absolute z-20 h-auto w-[60px]')}
        />
      )}
      <p className='text-sm leading-tight text-neutral-400'>{description}</p>
      <Button
        className={`pointer-events-none w-full ${isCurrent ? 'bg-slate-300' : upgrade ? 'bg-lime-300 text-black' : ''}`}
      >
        <ArrowUpSquare size={16} />
        {isCurrent ? 'Current Plan' : 'Upgrade'}
      </Button>
    </div>
  )
);

export default function Page() {
  return (
    <div className='w-[600px]'>
      <h1 className='text-xl font-semibold text-zinc-800'>Membership</h1>
      <Spacer y='8' />
      <Separator orientation='horizontal' className='bg-gray-200' />
      <Spacer y='30' />
      <h2 className='text-zinc-800'>Your current plan</h2>
      <Spacer y='8' />
      <div className='flex-between gap-x-4'>
        <PlanCard
          description='Free, for trying things out.'
          bgColor='bg-gradient-to-br from-white to-sky-100'
          images={{ background: '', foreground: '' }}
          isCurrent
        >
          Free
        </PlanCard>
        <PlanCard
          description='For you and your team, with unlimited files and all the pro features.'
          bgColor='bg-gradient-to-br from-white to-indigo-100'
          images={{
            background: '/membership/agent_max_bg.png',
            foreground: '/membership/agent_max.png',
          }}
          foreGroundClassName='-top-3 right-2'
        >
          Agent Max <br /> Pro
        </PlanCard>
        <PlanCard
          description='For you and your team, with unlimited files and all the pro features.'
          bgColor='bg-gradient-to-br from-white to-lime-100'
          images={{
            background: '/membership/agent_jessica_bg.png',
            foreground: '/membership/agent_jessica.png',
          }}
          foreGroundClassName='-top-1.5 right-2'
          upgrade
        >
          Agent <br /> Jessica Pro
        </PlanCard>
      </div>
      <Spacer y='30' />
      <h2 className='text-zinc-800'>Order record</h2>
      <Spacer y='16' />
    </div>
  );
}
