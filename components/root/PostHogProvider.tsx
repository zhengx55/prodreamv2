'use client';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { ReactNode } from 'react';


export default function CSPostHogProvider({
  children,
  bootstrapData
}: {
  children: ReactNode;
  bootstrapData?: any; // 类型为 posthog-js 的 bootstrap 数据
}) {

  if (typeof window !== 'undefined') {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      bootstrap: bootstrapData
    });
  }

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
