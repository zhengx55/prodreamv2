'use client';
import { brainstorms_data } from '@/constant';
import { IBrainsotrmCard } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Panel } from 'react-resizable-panels';

const FormPanel = () => {
  const pathname = usePathname();
  const [item, setItem] = useState<IBrainsotrmCard | null>(null);
  useEffect(() => {
    const item = brainstorms_data.find((item) => {
      return item.id === pathname.split('/')[3];
    });
    if (item) {
      setItem(item);
    }
  }, [pathname]);

  return (
    <Panel
      className='relative flex flex-col overflow-y-auto p-4'
      minSize={45}
      defaultSize={50}
    >
      <div className='flex'>
        <Link
          className='small-regular capitalize text-shadow hover:underline'
          href={'/writtingpal/brainstorm'}
        >
          {pathname.split('/')[2]}
        </Link>
        <p className='small-regular text-black-200'>
          &nbsp;/&nbsp;{item?.name}
        </p>
      </div>
    </Panel>
  );
};

export default FormPanel;
