import Procedure from '@/components/resume/Procedure';
import ResumeListItem from '@/components/resume/ResumeListItem';
import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { IResumeListItem } from '@/types';
import { ArrowRight } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { v4 } from 'uuid';
export default async function Resume() {
  const cookieStore = cookies();
  const cookie = cookieStore.get('token');
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}data/resume`,
    {
      headers: {
        Authorization: `Bearer ${cookie?.value}`,
      },
    }
  );
  const data = await res.json();
  const resume_list: IResumeListItem[] = data.data;
  return (
    <section className='relative flex flex-1 flex-col overflow-y-auto bg-sectionBackground p-4'>
      {/* <Dialog> */}
      <div className='flex h-[260px] w-[990px] shrink-0 flex-col justify-between rounded-xl bg-resume bg-cover p-7'>
        <div className='flex items-center gap-x-[30px]'>
          <div className='flex h-[125px] w-[291px] flex-col gap-y-4 rounded-lg bg-white p-4 shadow-card'>
            <h1 className='base-semibold'>Professional Wording</h1>
            <p className='subtle-semibold text-shadow-100'>
              Create polished resumes quickly with automated bullet points
            </p>
          </div>
          <div className='flex h-[125px] w-[291px] flex-col gap-y-4 rounded-lg bg-white p-4 shadow-card'>
            <h1 className='base-semibold'>Time-Saving Formatting</h1>
            <p className='subtle-semibold text-shadow-100'>
              Focus on content while we handle professional formatting
            </p>
          </div>
          <div className='flex h-[125px] w-[291px] flex-col gap-y-4 rounded-lg bg-white p-4 shadow-card'>
            <h1 className='base-semibold'>Specialize in college admissions</h1>
            <p className='subtle-semibold text-shadow-100'>
              Craft distinctive resumes that boost your college application
              success
            </p>
          </div>
        </div>
        <Link passHref href={`/writtingpal/resume/${v4()}/edit`}>
          <Button className='w-max gap-x-2'>
            Create new Resume
            <ArrowRight className='text-white' size={16} />
          </Button>
        </Link>
      </div>
      <Procedure />
      <Spacer y='30' />
      <div className='flex h-full w-full flex-wrap gap-4'>
        {resume_list.map((resume) => (
          <ResumeListItem
            key={resume.id}
            title={resume.title}
            update_time={resume.update_time}
          />
        ))}
      </div>
    </section>
  );
}
