import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC, memo, useState } from 'react';

interface EngineItemProps {
  item: { name: string; image: string; id: string; avatar: string };
}

const EngineItem: FC<EngineItemProps> = ({ item }) => {
  const [isHovering, setisHovering] = useState(false);
  const { push } = useRouter();

  return (
    <HoverCard
      open={isHovering}
      openDelay={50}
      closeDelay={50}
      onOpenChange={setisHovering}
      key={item.id}
    >
      <HoverCardTrigger
        onPointerDown={() => {
          push('/chat');
        }}
        asChild
      >
        <div
          className={`${isHovering ? 'bg-indigo-500' : 'bg-white/60'} flex-center relative h-11 cursor-pointer gap-x-2 rounded-lg transition-all duration-200`}
        >
          <Image
            src={item.avatar}
            alt={item.name}
            width={100}
            height={100}
            className='absolute bottom-0 left-0 h-auto w-[55px]'
            priority
          />
          <h2
            className={`${isHovering ? 'text-white' : 'text-zinc-800'} text-base`}
          >
            {item.name}
          </h2>
        </div>
      </HoverCardTrigger>
      <HoverCardContent
        side='right'
        align='start'
        alignOffset={-30}
        sideOffset={-20}
        className='relative w-[722px] border-none p-0 shadow-none'
      >
        <Image
          src={'/workbench/nav/max/test.png'}
          alt='bg'
          width={1000}
          height={500}
          className='h-auto w-full'
          priority
        />
      </HoverCardContent>
    </HoverCard>
  );
};

export default memo(EngineItem);
