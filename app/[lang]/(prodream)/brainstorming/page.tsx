import { Button } from '@/components/ui/button';
import MaterialSection from '@/components/workbench/brainstorming/MaterialSection';
import SearchSection from '@/components/workbench/common/SearchSection';
import { PAGESIZE } from '@/constant/enum';
import { getUserIdFromToken } from '@/lib/utils';
import { MaterialListRes } from '@/types/brainstorm/types';
import { PlusCircle } from 'lucide-react';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

async function getMaterials(
  page: number,
  keyword: string,
  token: string
): Promise<MaterialListRes> {
  const user_id = getUserIdFromToken(token);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}${user_id}/material?page=${page}&page_size=${PAGESIZE.MATERIAL_PAGE_SIZE}&keyword=${keyword}`,
    {
      next: { tags: ['materials'] },
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  return data.data;
}

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams.page ? parseInt(searchParams.page as string) : 0;
  const keyword = searchParams.query ? (searchParams.query as string) : '';
  const token = cookies().get('token')?.value;
  const data = await getMaterials(page, keyword, token!);

  return (
    <section className='flex flex-1 overflow-y-hidden px-2 pb-2'>
      <div className='flex flex-1 flex-col rounded-lg bg-white'>
        <div className='flex-between border-b px-6 py-2.5'>
          <div className='flex items-center gap-x-2'>
            <Image
              src='/workbench/nav_brainstorming.svg'
              alt='Brainstorming Icon'
              width={24}
              height={24}
              className='size-6'
            />
            <h2 className='text-xl font-medium text-zinc-500'>Brainstorm</h2>
          </div>
          <SearchSection searchParams={searchParams}>
            <Link passHref href={`brainstorming/create`}>
              <Button className='size-max rounded-lg px-4 py-2' role='button'>
                <PlusCircle size={24} />
                Add Material
              </Button>
            </Link>
          </SearchSection>
        </div>
        <MaterialSection pageCount={data.total_page_count} list={data.data} />
      </div>
    </section>
  );
}
