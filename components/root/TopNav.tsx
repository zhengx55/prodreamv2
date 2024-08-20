'use client';
import { Navigation } from '@/constant';
import { Locale } from '@/i18n-config';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo } from 'react';
import LeftTopMenu from '../workbench/common/LeftTopMenu';

type Props = {
  lang: Locale;
};

const TopNav = ({ lang }: Props) => {
  return (
    <div className='flex-center relative gap-x-2 py-6'>
      <div className='absolute left-1'>
        <LeftTopMenu />
      </div>
      {Navigation.map((nav) => (
        <NavItem
          key={nav.id}
          icon={nav.image}
          label={nav.title}
          link={`/${lang}/${nav.link}`}
        />
      ))}
    </div>
  );
};

export default memo(TopNav);

const NavItem = ({
  icon,
  label,
  link,
}: {
  icon: string;
  label: string;
  link: string;
}) => {
  const pathname = usePathname();

  const isSelected = pathname.includes(link);
  return (
    <Link
      href={link}
      className={`flex cursor-pointer items-center gap-x-2 rounded-lg px-6 py-2 ${
        isSelected ? 'bg-white' : 'bg-white/40 hover:bg-white'
      }`}
    >
      <Image
        src={icon}
        alt={`${label} Icon`}
        width={24}
        height={24}
        className='size-5'
        priority
      />
      <p
        className={`text-base font-medium ${
          isSelected ? 'text-indigo-500' : 'text-zinc-600'
        }`}
      >
        {label}
      </p>
    </Link>
  );
};
