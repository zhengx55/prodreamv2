import { useUserTrackInfo } from '@/hooks/useTrackInfo';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { GetServerSideProps } from 'next';
import { Bell } from 'lucide-react';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import { Button } from '../ui/button';
import { DropdownMenu } from '../ui/dropdown-menu';
const NotificationMenu = dynamic(() => import('./Dropdown'));
type Props = {};
const NotificationTrigger = (props: Props) => {
  const { data: trackInfo } = useUserTrackInfo();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          role='button'
          className='relative size-max p-1'
          variant={'icon'}
        >
          {!trackInfo?.notification_read && (
            <span className='absolute right-0 top-0 size-3 rounded-full bg-red-400' />
          )}

          <Bell size={20} className='text-zinc-700' />
        </Button>
      </DropdownMenuTrigger>
      <NotificationMenu />
    </DropdownMenu>
  );
};

export default memo(NotificationTrigger);
