import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';

type Props = { href: string; label: string; message: string };

const Empty = ({ href, label, message }: Props) => {
  return (
    <div className='flex-center flex-1 flex-col gap-y-6'>
      <Image
        src='/workbench/empty.png'
        alt='empty'
        width={120}
        height={80}
        className='h-[80px] w-[110px]'
      />
      <p className='small-regular text-neutral-400'>{message}</p>
      <Link passHref href={href}>
        <Button role='button'>
          <PlusCircle size={16} />
          {label}
        </Button>
      </Link>
    </div>
  );
};

export default memo(Empty);
