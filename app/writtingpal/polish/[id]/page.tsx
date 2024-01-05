import EssayPanel from '@/components/polish/EssayPanel';
import Rightbar from '@/components/polish/rightbar';
import { IDocDetail } from '@/query/type';
import { cookies } from 'next/headers';

async function getEassyDetail(id: string, token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}document/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data.data as IDocDetail;
}

export default async function Page({ params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const cookie = cookieStore.get('token');
  const detail = await getEassyDetail(params.id, cookie?.value!);
  return (
    <main className='relative flex h-[calc(100%_-var(--top-nav-bar-height))] w-full justify-center overflow-hidden pr-[240px]'>
      <EssayPanel detail={detail} />
      <Rightbar />
    </main>
  );
}
