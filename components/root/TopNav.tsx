'use client';
import { Navigation } from '@/constant';
import { Locale } from '@/i18n-config';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo } from 'react';

type Props = {
  lang: Locale;
};

const TopNav = ({ lang }: Props) => {
  return (
    <div className='bg-secondary flex justify-center py-2'>
      <div className='flex h-12 w-full shrink-0 flex-col items-center justify-center gap-2 rounded-lg'>
        <div className='flex w-full justify-center space-x-4'>
          {Navigation.map((nav) => (
            <NavItem
              key={nav.id}
              icon={nav.image}
              label={nav.title}
              link={`/${lang}/${nav.link}`}
            />
          ))}
        </div>
      </div>
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
  const isSelected = pathname.includes(`/${label.toLowerCase()}`);
  return (
    <Link
      href={link}
      passHref
      className={`flex cursor-pointer items-center gap-x-2 rounded-lg px-6 py-2 ${
        isSelected
          ? 'bg-white bg-opacity-60 shadow-md'
          : 'hover:bg-white hover:bg-opacity-60 hover:shadow-md'
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
        className={`small-regular capitalize leading-5 tracking-[0.16px] text-[#57545E] ${
          isSelected
            ? 'font-medium leading-6 text-[#272330]'
            : 'group-hover:font-medium group-hover:leading-6 group-hover:text-[#272330]'
        }`}
      >
        {label}
      </p>
    </Link>
  );
};
