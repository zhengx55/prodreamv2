import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { HomePageDicType } from '@/types';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import { Button } from '../../ui/button';
import LocaleDropdown from './LocaleDropdown';
import MobileDropdown from './MobileDropdown';

const NavBar = ({
  t,
  lang,
  search_param,
}: HomePageDicType & { search_param: string }) => {
  const token = cookies().get('token')?.value;
  return (
    <section className='z-50 flex h-16 w-full justify-center bg-white py-3'>
      <nav className='flex-between w-full px-4 sm:max-w-[1200px] sm:px-0'>
        <div className='flex items-center gap-x-10'>
          <Image
            src='/logo/Prodream.png'
            width={140}
            height={30}
            alt='logo'
            className='h-auto w-40 sm:w-36'
            priority
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                role='button'
                className='hidden w-max px-1 uppercase text-[#3B3A40] sm:block'
                variant={'ghost'}
              >
                {lang}
              </Button>
            </DropdownMenuTrigger>
            <LocaleDropdown />
          </DropdownMenu>
          <Link href={'https://prodream.ai/blog'} passHref target='_blank'>
            <Button
              role='link'
              className='hidden w-max px-1 text-[#3B3A40] sm:block'
              variant={'ghost'}
            >
              Blogs
            </Button>
          </Link>
        </div>
        <div className='hidden items-center gap-x-8 sm:flex'>
          <Link href={token ? `/editor` : `/${lang}/login`} passHref>
            <Button role='link' variant={'ghost'} className='text-doc-primary'>
              {t.log_in}
            </Button>
          </Link>

          <Link
            href={
              search_param
                ? `/${lang}/signup?from=${search_param}`
                : lang === 'cn'
                  ? `/${lang}/signup?from=cn`
                  : `/${lang}/signup`
            }
            passHref
          >
            <Button className='bg-doc-primary hover:bg-doc-primary'>
              <strong>{t.start_writing}</strong>
              {t.It_s_free}
            </Button>
          </Link>
        </div>
        <MobileDropdown t={t} lang={lang} search_param={search_param} />
      </nav>
    </section>
  );
};
export default memo(NavBar);
