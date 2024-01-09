import ResizePanel from '@/components/brainstorm/ResizePanel';
import { IBrainStormSection, IBrainstormHistory } from '@/query/type';
import { cookies } from 'next/headers';

async function getBrianstormData(id: string, cookie: { value: string }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}get_template?lang=en`,
    {
      method: 'POST',
      body: JSON.stringify({
        template_id: id,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookie?.value}`,
      },
    }
  );
  const data = await res.json();
  return data.data.result as IBrainStormSection;
}

async function getBrianstormHistory(id: string, cookie: { value: string }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}write_history_query`,
    {
      method: 'POST',
      body: JSON.stringify({
        template_id: id,
        page: 1,
        page_size: 999,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookie?.value}`,
      },
    }
  );
  const data = await res.json();
  return data as IBrainstormHistory;
}

export default async function Page({ params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const cookie = cookieStore.get('token');
  const template_data = await getBrianstormData(params.id, cookie!);
  const user_history = await getBrianstormHistory(params.id, cookie!);
  return (
    <main className='flex h-full w-full overflow-y-hidden bg-sectionBackground'>
      <ResizePanel template_data={template_data} history={user_history} />
    </main>
  );
}
