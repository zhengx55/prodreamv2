'use client';

import * as React from 'react';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Bell, ChevronUp, HelpCircle } from 'lucide-react';
import { useAppSelector } from '@/store/storehooks';
import { selectUser } from '@/store/reducers/userReducer';
import User from './User';

export function NavigationMenuDemo() {
  const user = useAppSelector(selectUser);

  return (
    <NavigationMenu>
      <NavigationMenuList className='flex gap-x-3'>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className='flex-center h-11 w-11 cursor-pointer rounded-full bg-primary-50 p-2.5 transition-transform hover:scale-110'
            asChild
          >
            <HelpCircle className='text-primary-200' size={22} />
          </NavigationMenuTrigger>
          <NavigationMenuContent></NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className='flex-center h-11 w-11 cursor-pointer rounded-full bg-primary-50 p-2.5 transition-transform hover:scale-110'
            asChild
          >
            <Bell className='text-primary-200' size={22} />
          </NavigationMenuTrigger>
          <NavigationMenuContent></NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger asChild>
            <div className='group'>
              <User
                name={user.first_name || ''}
                email={user.email || ''}
                imgSrc={`${process.env.NEXT_PUBLIC_API_STATIC_URL}${user.avatar}`}
              />
              <ChevronUp
                className='relative top-[1px] ml-1 h-7 w-7 text-shadow-100 transition duration-200 group-data-[state=open]:rotate-180'
                aria-hidden='true'
              />
            </div>
          </NavigationMenuTrigger>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
