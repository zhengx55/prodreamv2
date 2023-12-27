import ResizePanel from '@/components/brainstorm/ResizePanel';
import { IBrainStormSection } from '@/query/type';
import { cookies } from 'next/headers';

export default async function Page({ params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const cookie = cookieStore.get('token');
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}get_template?lang=en`,
    {
      method: 'POST',
      body: JSON.stringify({
        template_id: params.id,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookie?.value}`,
      },
    }
  );
  const data = await res.json();
  const template_data: IBrainStormSection = data.data.result;

  return (
    <main className='flex h-full w-full overflow-y-hidden bg-sectionBackground'>
      <ResizePanel template_data={template_data} />
    </main>
  );
}
