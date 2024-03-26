'use client';

import {
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Locale, i18n } from '@/i18n-config';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LocaleDropdown = () => {
  const pathName = usePathname();
  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };
  return (
    <DropdownMenuContent
      side='bottom'
      align='center'
      sideOffset={3}
      className='bg-white'
    >
      {i18n.locales.map((locale: Locale, index: number) => (
        <DropdownMenuItem
          key={`locale-switcher-${index}`}
          className='cursor-pointer hover:bg-violet-500 hover:text-white'
        >
          <Link
            href={redirectedPathName(locale)}
            className='base-regular flex-center w-full uppercase'
          >
            {locale}
          </Link>
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  );
};
export default LocaleDropdown;
