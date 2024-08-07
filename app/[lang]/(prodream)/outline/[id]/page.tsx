import Icon from '@/components/root/Icon';
import { Button } from '@/components/ui/button';
import ChatBar from '@/components/workbench/chat_bar/ChatBar';
import OutlineContent from '@/components/workbench/outline/OutlineContent';
import RegenerateOutlineSidebar from '@/components/workbench/outline/RegenerateOutlineSidebar';
import { OutlineItem, Prompt } from '@/types/outline/types';
import { Download } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';

async function getOutlineDetails(
  id: string,
  token: string
): Promise<OutlineItem> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}outline/${id}`,
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
  return data.data.data;
}

export default async function Page({ params }: { params: { id: string } }) {
  const token = cookies().get('token')?.value;
  const data = await getOutlineDetails(params.id, token!);
  const prompts = await getPromptsData(token!);

  return (
    <section className='flex flex-1 gap-x-2 overflow-y-hidden px-2 pb-2'>
      <div className='flex flex-1 flex-col rounded-lg bg-white'>
        <div className='flex-between h-[63px] border-b px-4'>
          <div className='flex items-center gap-x-2'>
            <Button role='button' className='size-max p-1' variant={'icon'}>
              <Link href={'/outline'}>
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
          <div className='flex items-center gap-x-2'>
            <Button role='button' variant={'icon'} className='size-max p-1'>
              <Download size={18} />
            </Button>
            <Button role='button'>
              <Icon
                alt='draft'
                src='/workbench/draft.svg'
                width={20}
                height={20}
                className='size-4'
                priority
              />
              Generate Draft
            </Button>
          </div>
        </div>
        <div className='flex flex-1 overflow-hidden'>
          <RegenerateOutlineSidebar prompts={prompts} />
          <OutlineContent
            defaultHTML={data.html}
            defaultContent={data.content}
          />
        </div>
      </div>
      <ChatBar />
    </section>
  );
}
