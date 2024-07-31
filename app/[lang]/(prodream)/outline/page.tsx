import SearchSection from '@/components/workbench/common/SearchSection';
import OutlineSection from '@/components/workbench/outline/OutlineSection';
import { PAGESIZE } from '@/constant/enum';
import { getUserIdFromToken } from '@/lib/utils';
import { EssaysRes } from '@/types/outline/types';
import Image from 'next/image';

async function getEssays(
  page: number,
  keyword: string,
  token: string
): Promise<EssaysRes> {
  const user_id = getUserIdFromToken(token);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}/${user_id}/essay?page=${page}&page_size=${PAGESIZE.MATERIAL_PAGE_SIZE}&keyword=${keyword}`,
    {
      next: { tags: ['essays'] },
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
  return (
    <section className='flex flex-1 overflow-y-hidden px-2 pb-2'>
      <div className='flex flex-1 flex-col rounded-lg bg-white'>
        <div className='flex-between border-b px-6 py-2.5'>
          <div className='flex items-center gap-x-2'>
            <Image
              src='/workbench/nav_outline.svg'
              alt='Brainstorming Icon'
              width={24}
              height={24}
              className='size-6'
            />
            <h2 className='text-xl font-medium text-zinc-500'>Outline</h2>
          </div>
          <SearchSection searchParams={searchParams} />
        </div>
        <OutlineSection />
      </div>
    </section>
  );
}
