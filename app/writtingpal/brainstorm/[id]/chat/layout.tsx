'use client';
import { ReactNode, useState } from 'react';

export default function ChatLayout({
  informations,
  introductions,
  children,
  chatpanel,
}: {
  informations: ReactNode;
  introductions: ReactNode;
  children: ReactNode;
  chatpanel: React.ReactNode;
}) {
  const [test, setTest] = useState('');
  return (
    <>
      {/* {chatpanel} */}
      {/* {informations} */}
      {introductions}
      {/* {children} */}
    </>
  );
}
