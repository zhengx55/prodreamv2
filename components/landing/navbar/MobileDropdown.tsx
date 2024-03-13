import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { HomePageDicType } from '@/types';
import Link from 'next/link';
const MobileDropdown = ({
  lang,
  t,
  search_param,
}: HomePageDicType & { search_param: string }) => {
  return (
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
                search_param
                  ? `/${lang}/signup?from=${search_param}`
                  : `/${lang}/signup`
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
  );
};
export default MobileDropdown;
