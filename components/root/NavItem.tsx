import Link from 'next/link';
import { FC, memo, useState } from 'react';
import Icon from './Icon';

interface NavItemProps {
  item: {
    [x: string]: string;
    id: string;
    icon: string;
    title: string;
  };
  href: string;
}

const NavItem: FC<NavItemProps> = ({ item, href }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link href={href}>
      <li
        key={item.id}
        className='group inline-flex w-full cursor-pointer items-center gap-x-2 rounded-lg px-2 py-1.5 hover:bg-indigo-500 hover:shadow'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Icon
          src={isHovered ? item.icon_white : item.icon}
          alt={item.title}
          width={25}
          height={25}
          className='h-auto w-5 transition-all duration-200'
          priority
        />
        <p className='text-zinc-600 transition-all duration-200 group-hover:text-white'>
          {item.title}
        </p>
      </li>
    </Link>
  );
};

export default memo(NavItem);
