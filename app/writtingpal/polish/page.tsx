import EvaluationHistory from '@/components/polish/history';
import { IDocDetail } from '@/query/type';
import { cookies } from 'next/headers';
async function getEvaluationHistory(token: string): Promise<IDocDetail[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}document?page=1&page_size=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  return data.data.docs;
}
export default async function Page() {
  const cookieStore = cookies();
  const cookie = cookieStore.get('token');
  const history = await getEvaluationHistory(cookie!.value);
  return <EvaluationHistory history_list={history} />;
}
