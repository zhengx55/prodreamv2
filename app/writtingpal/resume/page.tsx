import Procedure from '@/components/resume/Procedure';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

import Link from 'next/link';
import { v4 } from 'uuid';
export default function Resume() {
  return (
    <section className='relative flex flex-1 bg-sectionBackground p-4'>
      {/* <Dialog> */}
      <div className='flex h-[261px] w-[990px] flex-col justify-between rounded-xl bg-resume bg-cover p-7'>
        <div className='flex items-center gap-x-[30px]'>
          <div className='flex h-[115px] w-[291px] flex-col gap-y-4 rounded-lg bg-white p-4 shadow-card'>
            <h1 className='base-semibold'>Professional Wording</h1>
            <p className='subtle-semibold text-shadow-100'>
              Create polished resumes quickly with automated bullet points
            </p>
          </div>
          <div className='flex h-[115px] w-[291px] flex-col gap-y-4 rounded-lg bg-white p-4 shadow-card'>
            <h1 className='base-semibold'>Time-Saving Formatting</h1>
            <p className='subtle-semibold text-shadow-100'>
              Focus on content while we handle professional formatting
            </p>
          </div>
          <div className='flex h-[115px] w-[291px] flex-col gap-y-4 rounded-lg bg-white p-4 shadow-card'>
            <h1 className='base-semibold'>Specialize in college admissions</h1>
            <p className='subtle-semibold text-shadow-100'>
              Craft distinctive resumes that boost your college application
              success
            </p>
          </div>
        </div>

        <Button asChild className='w-[190px] gap-x-2'>
          <Link href={`/writtingpal/resume/${v4()}/edit`}>
            Create new Resume
            <ArrowRight className='text-white' size={15} />
          </Link>
        </Button>
      </div>
      <Procedure />
    </section>
  );
}
