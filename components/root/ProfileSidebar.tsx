'use client';
import { usePathname, useRouter } from 'next/navigation';
import { ProfileSidebarLinks } from '@/constant';
import { AnimatedLogo } from './AnimatedLogo';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

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
