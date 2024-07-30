import { Button } from '@/components/ui/button';
import MaterialForm from '@/components/workbench/brainstorming/MaterialForm';
import { MaterialItem } from '@/types/brainstorm/types';
import { ChevronLeft } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';
async function getMaterialDetails(
  id: string,
  token: string
): Promise<MaterialItem> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}/material/${id}`,
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
  const data = await getMaterialDetails(params.id, token!);
  return (
    <section className='flex flex-1 overflow-y-hidden px-2 pb-2'>
      <div className='flex flex-1 flex-col rounded-lg bg-white'>
        <div className='flex items-center gap-x-2 border-b px-4 py-2.5'>
          <Button role='button' className='size-max p-1' variant={'icon'}>
            <Link passHref href={'/brainstorming'}>
              <ChevronLeft />
            </Link>
          </Button>
          <h2 className='text-xl font-medium text-zinc-600'>{data.title}</h2>
        </div>
        <div className='flex flex-1 overflow-y-auto bg-slate-100'>
          <MaterialForm
            defaultContent={data.content}
            defaultTitle={data.title}
            type='update'
            id={params.id}
          />
        </div>
      </div>
    </section>
  );
}
