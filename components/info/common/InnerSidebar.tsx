'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const InnerSidebar = () => {
  const pathName = usePathname();
  const isProfile = pathName.includes('profile');
  const isMembership = pathName.includes('membership');
  return (
    <aside className='w-[220px] rounded-bl-lg rounded-tl-lg border-r border-zinc-200 bg-white px-2.5 py-4'>
      <ul className='flex flex-col gap-y-2'>
        <Link href='/profile'>
          <li
            className={`${isProfile ? 'bg-gray-100 text-indigo-500' : 'bg-transparent text-zinc-600'} cursor-pointer rounded-lg px-2.5 py-2 hover:bg-gray-100 hover:text-indigo-500`}
          >
            Profile
          </li>
        </Link>
        <Link href='/membership'>
          <li
            className={`${isMembership ? 'bg-gray-100 text-indigo-500' : 'bg-transparent text-zinc-600'} cursor-pointer rounded-lg px-2.5 py-2 hover:bg-gray-100 hover:text-indigo-500`}
          >
            Membership
          </li>
        </Link>
      </ul>
    </aside>
  );
};

export default InnerSidebar;
