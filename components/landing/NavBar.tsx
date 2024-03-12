'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Locale, i18n } from '@/i18n-config';
import { HomePageDicType } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { v4 } from 'uuid';
import { Button } from '../ui/button';

const NavBar = ({ t, lang }: HomePageDicType) => {
  const [cookies] = useCookies(['token']);
  const searchParams = useSearchParams().get('from');
  const pathName = usePathname();
  const router = useRouter();

  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

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
          <Button
            className='hidden w-10 text-[#3B3A40] sm:block'
            variant={'ghost'}
          >
            <DropdownMenu>
              <DropdownMenuTrigger className='w-10 ' asChild>
                <span className='hidden uppercase text-[#3B3A40] hover:bg-shadow-50 sm:block'>
                  {lang}
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side='bottom'
                align='center'
                sideOffset={3}
                className='bg-white'
              >
                {i18n.locales.map((locale: Locale, index: number) => (
                  <DropdownMenuItem
                    key={v4()}
                    className='cursor-pointer hover:bg-doc-primary hover:text-white'
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
            </DropdownMenu>
          </Button>
          <Link href={'https://prodream.ai/blog'} passHref target='_blank'>
            <Button
              role='link'
              className='hidden w-10 text-[#3B3A40] sm:block'
              variant={'ghost'}
            >
              Blogs
            </Button>
          </Link>
        </div>
        <div className='hidden items-center gap-x-8 sm:flex'>
          <Button
            role='link'
            onClick={() => {
              cookies.token
                ? router.push(`/${lang}/editor`)
                : router.push(`/${lang}/login`);
            }}
            variant={'ghost'}
            className='text-doc-primary'
          >
            {t.log_in}
          </Button>
          <Link
            href={
              searchParams ? `/${lang}/signup?from=${searchParams}` : '/signup'
            }
            passHref
          >
            <Button className='bg-doc-primary hover:bg-doc-primary'>
              <strong>{t.start_writing}</strong>
              {t.It_s_free}
            </Button>
          </Link>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className='z-[999] flex items-center gap-x-8 sm:hidden'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='25'
                viewBox='0 0 24 25'
                fill='none'
              >
                <path
                  d='M4 6.5H20M4 12.5H20M4 18.5H20'
                  stroke='#171717'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='center'
            sideOffset={0}
            className='h-[100vh] w-[100vw] border-none bg-black-400/25 p-0'
          >
            <div className='w-[100vw] bg-white py-6 pt-[45px]'>
              <div className='flex flex-col items-center gap-y-4'>
                <Link href={`/${lang}/login`} passHref>
                  <Button
                    variant={'ghost'}
                    role='link'
                    className='w-[340px] border-[2px] border-doc-primary text-doc-primary'
                  >
                    {t.log_in}
                  </Button>
                </Link>
                <Link
                  href={
                    searchParams
                      ? `/${lang}/signup?from=${searchParams}`
                      : '/signup'
                  }
                  passHref
                >
                  <Button
                    role='link'
                    className='w-[340px] bg-doc-primary hover:bg-doc-primary'
                  >
                    <strong>{t.start_writing}</strong>
                    {t.It_s_free}
                  </Button>
                </Link>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </section>
  );
};
export default NavBar;
