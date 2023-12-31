import EssayPanel from '@/components/polish/EssayPanel';
import Rightbar from '@/components/polish/rightbar';
import { IEssayEvaluationDetail } from '@/types';
import { cookies } from 'next/headers';

async function getEassyDetail(id: string, token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}essay_assess/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  return data.data as IEssayEvaluationDetail;
}

export default async function Page({ params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const cookie = cookieStore.get('token');
  const detail = await getEassyDetail(params.id, cookie?.value!);
  return (
    <main className='relative hidden h-[calc(100%_-var(--top-nav-bar-height))] w-full overflow-hidden pr-[240px] sm:flex'>
      <EssayPanel detail={detail} />
      <Rightbar />
    </main>
  );
}
