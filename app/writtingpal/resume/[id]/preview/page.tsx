'use client';
import { ResumeIframeCSR } from '@/components/resume/ResumeFrame';
import ResumePdf from '@/components/resume/ResumePdf';
import { SuppressResumePDFErrorMessage } from '@/components/resume/common/SuppressResumePDFErrorMessage';
import { selectResume } from '@/store/reducers/resumeSlice';
import { useAppSelector } from '@/store/storehooks';
import { useMemo } from 'react';
import { ResumeControllerCSR } from '@/components/resume/Controller';

export default function Page() {
  const resume = useAppSelector(selectResume);
  const document = useMemo(
    () => <ResumePdf resume={resume} isPDF={false} themeColor='#7D2FF5' />,
    [resume]
  );

  return (
    <main className='relative flex flex-1 gap-x-4 overflow-y-auto bg-sectionBackground p-8'>
      <ResumeIframeCSR scale={1}>
        <ResumePdf themeColor='#7D2FF5' resume={resume} />
      </ResumeIframeCSR>
      <SuppressResumePDFErrorMessage />
      <ResumeControllerCSR document={document} />
    </main>
  );
}
