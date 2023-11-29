import ActivityMain from '@/components/activityList/ActivityMain';
import ActivityTop from '@/components/activityList/ActivityTop';
import { IActivityHistoryResponse } from '@/query/type';
import { cookies } from 'next/headers';

export default async function Page() {
  const cookieStore = cookies();
  const cookie = cookieStore.get('token');
  // const queryParams = new URLSearchParams();
  // queryParams.append('page', '1');
  // queryParams.append('page_size', '10');
  // const historyActivity = await fetch(
  //   `${
  //     process.env.NEXT_PUBLIC_API_URL
  //   }activity_optimize?${queryParams.toString()}`,
  //   {
  //     headers: {
  //       Authorization: `Bearer ${cookie?.value}`,
  //     },
  //   }
  // );
  // const data: IActivityHistoryResponse = await historyActivity.json();

  return (
    <section className='flex h-[calc(100vh_-var(--top-nav-bar-height))] w-full flex-col bg-sectionBackground p-4'>
      {/* top panel */}
      <ActivityTop />
      {/* main panel */}
      <ActivityMain />
    </section>
  );
}
