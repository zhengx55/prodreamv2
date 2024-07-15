'use client';
import { workbench_engine, workbench_nav } from '@/constant/workbench_constant';
import { useModal, useUserInfo } from '@/zustand/store';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { memo } from 'react';
import { Separator } from '../ui/separator';
import Icon from './Icon';
import Spacer from './Spacer';

const Sidebar = () => {
  const tEditor = useTranslations('Editor');
  const { lang } = useParams();
  const isInCN = lang === 'cn';
  const updateFeedbackModal = useModal((state) => state.updateFeedbackModal);

  const router = useRouter();

  const user = useUserInfo((state) => state.user);

  return (
    <aside className='relative flex w-[200px] shrink-0 flex-col px-6 py-9'>
      <Link passHref href={`/${lang}`}>
        <Image
          alt='prodream'
          src='/logo/Prodream.png'
          width={150}
          height={30}
          className='h-auto w-36'
          priority
        />
      </Link>
      <Spacer y='24' />
      <div className='flex flex-col gap-y-2'>
        {workbench_engine.map((item) => (
          <div
            className='flex-center w-full cursor-pointer flex-col gap-y-2 rounded-lg border border-white bg-white/30 py-4 shadow hover:bg-white/60'
            key={item.id}
          >
            <Image
              src={item.image}
              alt={item.name}
              priority
              width={60}
              height={60}
              className=' h-auto w-14'
            />
            <h2>{item.name}</h2>
          </div>
        ))}
      </div>
      <ul className='mt-auto flex flex-col gap-y-2'>
        {workbench_nav.map((item) => (
          <li
            key={item.id}
            className='inline-flex w-full cursor-pointer items-center gap-x-2 rounded-lg border border-transparent px-2 py-1.5 hover:border-white hover:bg-white/60 hover:shadow'
          >
            <Icon
              src={item.icon}
              alt={item.title}
              width={25}
              height={25}
              className='h-auto w-5'
              priority
            />
            <p className='text-zinc-600'>{item.title}</p>
          </li>
        ))}
        <Separator className='bg-zinc-500' orientation='horizontal' />
        <li className='inline-flex w-full cursor-pointer items-center gap-x-2 rounded-lg border border-transparent px-2 py-1.5 hover:border-white hover:bg-white/60 hover:shadow'>
          {user.avatar && (
            <Icon
              src={user.avatar}
              alt={user.first_name}
              width={25}
              height={25}
              className='h-auto w-5'
              priority
            />
          )}
          <p className='text-zinc-600'>{user.first_name}</p>
          <ChevronRight className='ml-auto' size={20} />
        </li>
      </ul>
    </aside>
  );
};

export default memo(Sidebar);
