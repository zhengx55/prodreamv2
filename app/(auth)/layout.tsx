import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className='relative flex h-full w-full overflow-auto sm:flex-row'>
      {children}
    </div>
  );
}
