'use client';

import { useAppSelector } from '@/store/storehooks';
import { ResumeIframeCSR } from './ResumeFrame';
import ResumePdf from './ResumePdf';
import { SuppressResumePDFErrorMessage } from './common/SuppressResumePDFErrorMessage';
import { selectResume } from '@/store/reducers/resumeSlice';

const ReportPanel = () => {
  const resume = useAppSelector(selectResume);

  return (
    <div className='flex h-full justify-center bg-sectionBackground px-10 pb-20 pt-7 md:w-[50%]'>
      <ResumeIframeCSR scale={0.7}>
        <ResumePdf themeColor='#7D2FF5' resume={resume} />
      </ResumeIframeCSR>
      <SuppressResumePDFErrorMessage />
    </div>
  );
};

export default ReportPanel;
