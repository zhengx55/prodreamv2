import HistoryTop from '@/components/activityList/history/HistoryTop';
import List from '@/components/activityList/history/List';
import { cookies } from 'next/headers';

export default async function Page() {
  const cookieStore = cookies();
  const cookie = cookieStore.get('token');
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}activity_list?page_start=${1}&page_size=${999}`,
    {
      headers: {
        Authorization: `Bearer ${cookie?.value}`,
      },
    }
  );
  const data = await res.json();
  console.log('🚀 ~ file: page.tsx:16 ~ Page ~ data:', data);
  return (
    <section className='flex h-[calc(100vh_-var(--top-nav-bar-height))] w-full flex-col gap-y-4 bg-sectionBackground p-4'>
      <HistoryTop />
      <List />
    </section>
  );
}
