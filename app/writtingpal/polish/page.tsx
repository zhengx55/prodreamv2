import EvaluationHistory from '@/components/polish/history';
import { IEvaluationHistory } from '@/types';
import { cookies } from 'next/headers';
async function getEvaluationHistory(
  token: string
): Promise<IEvaluationHistory[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}essay_assess?page=1&page_size=20`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  return data.data;
}
export default async function Page() {
  const cookieStore = cookies();
  const cookie = cookieStore.get('token');
  const history = await getEvaluationHistory(cookie!.value);
  return <EvaluationHistory history_list={history} />;
}
