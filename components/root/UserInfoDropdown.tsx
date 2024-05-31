import { Locale } from '@/i18n-config';
import { useQueryClient } from '@tanstack/react-query';
import { LogOut, User2 } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useRouter, useParams } from 'next/navigation';
import { memo } from 'react';
import { useCookies } from 'react-cookie';
import { DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu';
type Props = {
  lang: Locale;
};
const UserInfoDropdown = () => {
  const [_cookies, _setCookie, removeCookie] = useCookies(['token']);
  const router = useRouter();
  const { lang } = useParams();
  const isInCN = lang === 'cn';
  const queryClient = useQueryClient();
  const t = useTranslations('Editor');
  const logOut = () => {
    queryClient.removeQueries();
    removeCookie('token', { path: '/' });
    router.replace('/login');
  };
  return (
    <DropdownMenuContent
      align='start'
      className='w-60 rounded-lg bg-white shadow-lg'
    >
      <Link href={`/${lang}/profile/setting`} passHref>
        <DropdownMenuItem className='cursor-pointer gap-x-2.5 rounded text-zinc-600 hover:bg-slate-100 hover:text-violet-500'>
          <User2 size={20} />
          <span className='text-md font-[500]'>{t('SideBar.View_Profile')}</span>
        </DropdownMenuItem>
      </Link>

      <DropdownMenuItem
        onClick={logOut}
        className='cursor-pointer gap-x-2.5 rounded text-zinc-600 hover:bg-slate-100 hover:text-violet-500'
      >
        <LogOut size={20} />
        <span className='text-md font-[500]'>{t('SideBar.Log_out')}</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};
export default memo(UserInfoDropdown);
