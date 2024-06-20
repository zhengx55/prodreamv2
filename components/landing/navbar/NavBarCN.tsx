import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { HomePageDicType } from '@/types';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { langObjCN } from '@/i18n-config';
import { memo } from 'react';
import { Button } from '../../ui/button';

// const MobileDropdown = dynamic(() => import('./MobileDropdown'), {
//   ssr: false,
// });

const LocaleDropdown = dynamic(() => import('./LocaleDropdown'), {
  ssr: false,
});

const NavBarCN = async ({
  lang,
  search_param,
}: HomePageDicType & { search_param: string }) => {
  return (
    <section className='z-50 flex h-16 w-full justify-center bg-white py-3'>
      <nav className='flex w-full justify-between px-4 sm:max-w-[1200px] sm:px-0'>
        <div className='flex items-center gap-x-10'>
          <Image
            src='/logo/Prodream.png'
            width={140}
            height={30}
            alt='logo'
            className='h-auto w-40 sm:w-36'
            priority
          />
          {/* TODO: 需要确认About Us的链接 */}
          {/* <Link href='/about-us' className='text-sm font-medium'>{'About Us'}</Link> */}
        </div>
        <div className='flex flex-1 justify-end px-4'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                role='button'
                className='hidden w-max px-1 hover:no-underline sm:block'
                variant={'ghost'}
              >
                <p className='flex items-center gap-x-2 text-sm font-medium'>
                  {langObjCN[lang]}
                  <Image
                    src={'/nav/chevron-compact-down.svg'}
                    alt='chevron-compact-down'
                    width={16}
                    height={16}
                  />
                </p>
              </Button>
            </DropdownMenuTrigger>
            <LocaleDropdown />
          </DropdownMenu>
        </div>
        <div className='hidden items-center gap-x-8 sm:flex'>
          <Link href={`/${lang}/signup?from=cn`} passHref>
            <Button className='rounded-lg px-8 py-3 text-sm font-medium'>
              <p>{'免费使用'}</p>
            </Button>
          </Link>
        </div>
        {/* <MobileDropdown t={t} lang={lang} search_param={search_param} /> */}
      </nav>
    </section>
  );
};
export default memo(NavBarCN);
