'use client';
import ResumeFrame from '@/components/resume/ResumeFrame';
import { SuppressResumePDFErrorMessage } from '@/components/resume/common/SuppressResumePDFErrorMessage';
import { selectResume } from '@/store/reducers/resumeSlice';
import { useAppSelector } from '@/store/storehooks';
import dynamic from 'next/dynamic';
const Controller = dynamic(() => import('@/components/resume/Controller'));
const ResumePdf = dynamic(() => import('@/components/resume/ResumePdf'));
export default function Page() {
  const resume = useAppSelector(selectResume);
  return (
    <main className='relative flex flex-1 gap-x-4 overflow-y-auto bg-sectionBackground p-8'>
      <ResumeFrame scale={1}>
        <ResumePdf themeColor='#7D2FF5' resume={resume} />
      </ResumeFrame>
      <SuppressResumePDFErrorMessage />
      <Controller />
    </main>
  );
}
