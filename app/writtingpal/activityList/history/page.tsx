import HistoryTop from '@/components/activityList/history/HistoryTop';
import List from '@/components/activityList/history/List';
import { IActHistoryData } from '@/query/type';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function Page() {
  async function fetchHistoryData() {
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
    const history_data: IActHistoryData[] = data.data;
    return history_data;
  }

  const history_data = await fetchHistoryData();
  return (
    <section className='flex h-[calc(100vh_-var(--top-nav-bar-height))] w-full flex-col gap-y-4 bg-sectionBackground p-4'>
      <HistoryTop />
      <div className='flex h-full flex-col gap-y-4 overflow-y-auto'>
        {history_data.map((item) => {
          return <List key={item.id} item={item} />;
        })}
      </div>
    </section>
  );
}
