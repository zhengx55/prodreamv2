import Icon from '@/components/root/Icon';
import NavItem from '@/components/root/NavItem';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Skeleton } from '@/components/ui/skeleton';
import { workbench_profile } from '@/constant/workbench_constant';
import { LoginData } from '@/query/type';
import { ChevronRight } from 'lucide-react';
import { FC, memo, useMemo } from 'react';
interface UserProfileItemProps {
  user: LoginData;
}

const UserProfileItem: FC<UserProfileItemProps> = ({ user }) => {
  const renderedProfileItems = useMemo(
    () =>
      workbench_profile.map((item) => (
        <NavItem key={item.id} item={item} href={item.link} />
      )),
    []
  );

  return (
    <Popover>
      <PopoverTrigger>
        <li className='group inline-flex h-10 w-full cursor-pointer items-center gap-x-2 rounded-lg border border-transparent px-2 hover:border-white hover:bg-[#6866E2] hover:text-white hover:shadow'>
          {user.avatar ? (
            <Icon
              src={user.avatar}
              alt={user.name}
              width={25}
              height={25}
              className='size-6 rounded-full'
              priority
            />
          ) : (
            <Skeleton className='size-6 rounded-full' />
          )}
          <p className='truncate text-zinc-600 group-hover:text-white'>
            {user.name}
          </p>
          <ChevronRight className='ml-auto' size={16} />
        </li>
      </PopoverTrigger>
      <PopoverContent
        className='w-[180px] rounded-lg bg-white p-2 shadow-lg backdrop-blur-xl'
        side='right'
        align='end'
        sideOffset={10}
        alignOffset={-10}
      >
        <div className='flex flex-col gap-y-2'>{renderedProfileItems}</div>
      </PopoverContent>
    </Popover>
  );
};

export default memo(UserProfileItem);
