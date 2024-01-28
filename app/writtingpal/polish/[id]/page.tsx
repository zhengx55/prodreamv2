import EssayPanel from '@/components/polish/EssayPanel';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const token = cookies().get('token')?.value;
  if (!token) redirect('/login');
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/user/auxiliary_info`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = (await res.json()).data;
  return <EssayPanel user_info={data} id={params.id} />;
}
