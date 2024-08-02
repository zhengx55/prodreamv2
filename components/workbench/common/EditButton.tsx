import Icon from '@/components/root/Icon';
import Link from 'next/link';
import { memo } from 'react';

type Props = { href: string };

const EditButton = ({ href }: Props) => {
  return (
    <Link
      passHref
      href={href}
      className='inline-flex w-full items-center gap-x-1 rounded-lg px-2 py-1 hover:bg-slate-200'
    >
      <Icon
        className='size-6'
        width={24}
        height={24}
        alt='edit'
        src='/workbench/edit.svg'
      />
      <span className='base-regular text-zinc-600'>Edit</span>
    </Link>
  );
};

export default memo(EditButton);
