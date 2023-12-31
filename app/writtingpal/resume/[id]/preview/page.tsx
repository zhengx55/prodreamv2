'use client';
import ResumeFrame from '@/components/resume/ResumeFrame';
import { SuppressResumePDFErrorMessage } from '@/components/resume/common/SuppressResumePDFErrorMessage';
import dynamic from 'next/dynamic';
const Controller = dynamic(() => import('@/components/resume/Controller'));
const ResumePdf = dynamic(() => import('@/components/resume/ResumePdf'));
export default function Page() {
  return (
    <main className='relative flex flex-1 gap-x-4 overflow-y-auto bg-sectionBackground p-8'>
      <ResumeFrame scale={1}>
        <ResumePdf themeColor='#7D2FF5' />
      </ResumeFrame>
      <SuppressResumePDFErrorMessage />
      <Controller />
    </main>
  );
}
