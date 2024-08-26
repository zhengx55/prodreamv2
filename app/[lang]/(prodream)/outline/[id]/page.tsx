import OutlineDetails from '@/components/workbench/outline/OutlineDetails';
import { Prompt } from '@/types/outline';
import { cookies } from 'next/headers';

async function getPromptsData(token: string): Promise<Prompt[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}prompt?page=0&page_size=10`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  return data.data;
}

export default async function Page({ params }: { params: { id: string } }) {
  const token = cookies().get('token')?.value;
  const prompts = await getPromptsData(token!);

  return <OutlineDetails outline_id={params.id} prompts={prompts} />;
}
