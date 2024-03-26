import { useQueryClient } from '@tanstack/react-query';
import { LogOut, User2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePostHog } from 'posthog-js/react';
import { memo } from 'react';
import { useCookies } from 'react-cookie';
import { DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu';

const UserInfoDropdown = () => {
  const [_cookies, _setCookie, removeCookie] = useCookies(['token']);
  const router = useRouter();
  const posthog = usePostHog();
  const queryClient = useQueryClient();
  const logOut = () => {
    queryClient.removeQueries();
    posthog.reset();
    removeCookie('token', { path: '/' });
    router.replace('/login');
  };
  return (
    <DropdownMenuContent
      align='start'
      className='w-60 rounded-lg bg-white shadow-lg'
    >
      <Link href={'/profile/setting'} passHref>
        <DropdownMenuItem className='cursor-pointer gap-x-2.5 rounded text-zinc-600 hover:bg-slate-100 hover:text-violet-500'>
          <User2 size={20} />
          <span className='text-md font-[500]'>View Profile</span>
        </DropdownMenuItem>
      </Link>

      <DropdownMenuItem
        onClick={logOut}
        className='cursor-pointer gap-x-2.5  rounded text-zinc-600 hover:bg-slate-100 hover:text-violet-500'
      >
        <LogOut size={20} />
        <span className='text-md font-[500]'>Log Out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};
export default memo(UserInfoDropdown);
