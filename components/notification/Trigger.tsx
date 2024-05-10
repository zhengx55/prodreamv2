import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Bell } from 'lucide-react';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import { Button } from '../ui/button';
import { DropdownMenu } from '../ui/dropdown-menu';
const NotificationMenu = dynamic(() => import('./Dropdown'));
type Props = {};
const NotificationTrigger = (props: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button role='button' className='size-max p-1' variant={'icon'}>
          <Bell size={16} className='text-zinc-700' />
        </Button>
      </DropdownMenuTrigger>
      <NotificationMenu />
    </DropdownMenu>
  );
};
export default memo(NotificationTrigger);
