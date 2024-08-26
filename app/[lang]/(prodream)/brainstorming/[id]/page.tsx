import Icon from '@/components/root/Icon';
import { Button } from '@/components/ui/button';
import MaterialForm from '@/components/workbench/brainstorming/MaterialForm';
import { MaterialItem, ThemeType } from '@/types/brainstorm';
import { cookies } from 'next/headers';
import Link from 'next/link';

async function getMaterialDetails(
  id: string,
  token: string
): Promise<MaterialItem> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}material/${id}`,
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

async function getThemesData(token: string): Promise<ThemeType[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}material/themes?page=0&page_size=10`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  return data.data.data;
}

export default async function Page({ params }: { params: { id: string } }) {
  const token = cookies().get('token')?.value;
  const data = await getMaterialDetails(params.id, token!);
  const themes = await getThemesData(token!);

  return (
    <div className='relative flex flex-1 flex-col rounded-lg bg-white'>
      <div className='flex h-[63px] items-center gap-x-2 border-b px-4 py-2.5'>
        <Button role='button' className='size-max p-1' variant={'icon'}>
          <Link href={'/brainstorming'}>
            <Icon
              alt='back'
              src='/workbench/left.svg'
              width={20}
              height={20}
              className='size-5'
              priority
            />
          </Link>
        </Button>
        <h2 className='text-xl font-medium text-zinc-600'>{data.title}</h2>
      </div>
      <div className='flex flex-1 overflow-y-auto bg-[#F6F7FB]'>
        <MaterialForm
          defaultContent={data.content}
          defaultTitle={data.title}
          type='update'
          id={params.id}
          themes={themes}
          defaultTheme={data.theme?.id ?? ''}
        />
      </div>
    </div>
  );
}
