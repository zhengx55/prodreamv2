'use client';
import { usePathname, useRouter } from 'next/navigation';
import { ProfileSidebarLinks } from '@/constant';
import { AnimatedLogo } from './AnimatedLogo';
import { ChevronLeft, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const ProfileSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const handleNavigation = (link: string, index: number) => {
    router.push(link);
  };

  return (
    <aside className='relative hidden w-[250px] shrink-0 flex-col border-r border-r-shadow-border bg-white md:flex md:px-2 md:py-5'>
      <div className='h-[30px]'>
        <AnimatedLogo show />
      </div>

      <ul className='relative mt-8 flex flex-col gap-5'>
        <Link
          className='title-regular flex items-center gap-x-1 pl-2 text-black-200'
          href={'/writtingpal/polish'}
        >
          <ChevronLeft />
          Back
        </Link>
        {ProfileSidebarLinks.map((item, index) => {
          const isActive = pathname.includes(item.link);
          return (
            <li
              key={item.id}
              onClick={() => handleNavigation(item.link, index)}
              className={`${
                isActive && 'bg-nav-selected'
              } text-slate-20 z-50 flex h-12 cursor-pointer items-center gap-x-2 rounded-md pl-4`}
            >
              <Image
                src={isActive ? item.active_image : item.image}
                alt={item.title}
                width={24}
                height={24}
                className='h-auto w-auto'
                priority
              />
              <span
                className={`${
                  isActive ? 'text-primary-200' : 'text-shadow-100'
                } whitespace-nowrap text-[14px]`}
              >
                {item.title}
              </span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default ProfileSidebar;
