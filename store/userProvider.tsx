'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { userStore } from './userStore';

export default function UserStoreProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <Provider store={userStore}>{children}</Provider>;
}
