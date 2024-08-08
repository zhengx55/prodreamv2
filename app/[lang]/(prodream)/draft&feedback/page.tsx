import { Button } from '@/components/ui/button';
import ChatBar from '@/components/workbench/chat_bar/ChatBar';

import SearchSection from '@/components/workbench/common/SearchSection';
import { PAGESIZE } from '@/constant/enum';
import { MaterialListRes } from '@/types/brainstorm/types';
import { PlusCircle } from 'lucide-react';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

async function getDrafts(
  page: number,
  keyword: string,
  token: string
): Promise<MaterialListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}draft?page=${page}&page_size=${PAGESIZE.MATERIAL_PAGE_SIZE}&keyword=${keyword}`,
    {
      next: { tags: ['drafts'] },
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
  const data = await getDrafts(page, keyword, token!);
  return (
    <section className='flex flex-1 gap-x-2 overflow-y-hidden px-2 pb-2'>
      <div className='flex flex-1 flex-col rounded-lg bg-white'>
        <div className='flex-between border-b px-6 py-2.5'>
          <div className='flex items-center gap-x-2'>
            <Image
              src='/workbench/nav_draft.svg'
              alt='Draft Icon'
              width={24}
              height={24}
              className='size-6'
            />
            <h2 className='text-xl font-medium text-zinc-500'>
              Draft&Feedback
            </h2>
          </div>
          <SearchSection searchParams={searchParams}>
            <Link href={`draft&feedback/create`}>
              <Button className='size-max rounded-lg px-4 py-2' role='button'>
                <PlusCircle size={24} />
                Add Draft
              </Button>
            </Link>
          </SearchSection>
        </div>
        {/* <DraftSection list={data.data} pageCount={data.total_page_count} /> */}
      </div>
      <ChatBar />
    </section>
  );
}
