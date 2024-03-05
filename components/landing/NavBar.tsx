'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useLocalization from '@/hooks/useLocalization';
import _ from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { Button } from '../ui/button';

const NavBar = () => {
  const [cookies] = useCookies(['token']);
  const router = useRouter();
  const { t, getCurrentLanguage, locales } = useLocalization();
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
                <span className='hidden text-[#3B3A40] hover:bg-shadow-50 sm:block'>
                  {_.toUpper(getCurrentLanguage())}
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side='bottom'
                align='center'
                sideOffset={3}
                className='bg-white'
              >
                {locales.map((locale: string | undefined, index: any) => (
                  <Link
                    key={locale ?? index}
                    href={`/${locale === 'en' ? '' : locale}`}
                  >
                    <DropdownMenuItem
                      hidden={true}
                      className='text-center hover:bg-doc-primary'
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <span className='text-cente block w-20 pl-4'>
                        {_.toUpper(locale)}{' '}
                      </span>
                    </DropdownMenuItem>
                  </Link>
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
              cookies.token ? router.push('/editor') : router.push('/login');
            }}
            variant={'ghost'}
            className='text-doc-primary'
          >
            {t('log_in')}
          </Button>
          <Link href={'/signup'} passHref>
            <Button className='bg-doc-primary hover:bg-doc-primary'>
              <strong>{t('start_writing')}</strong>
              {t('It_s_free')}
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
                <Link href={'/login'} passHref>
                  <Button
                    variant={'ghost'}
                    role='link'
                    className='w-[340px] border-[2px] border-doc-primary text-doc-primary'
                  >
                    {t('log_in')}
                  </Button>
                </Link>
                <Link href={'/signup'} passHref>
                  <Button
                    role='link'
                    className='w-[340px] bg-doc-primary hover:bg-doc-primary'
                  >
                    <strong>{t('start_writing')}</strong>
                    {t('It_s_free')}
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
