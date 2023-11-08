'use client';

import { ResumeIframeCSR } from './ResumeFrame';
import ResumePdf from './ResumePdf';
import { SuppressResumePDFErrorMessage } from './pdf/SuppressResumePDFErrorMessage';

const ReportPanel = () => {
  return (
    <div className='h-full w-[50%] bg-sectionBackground px-10 pb-20 pt-7'>
      <div className='h-full w-full overflow-y-auto rounded-xl bg-white shadow-2xl'>
        <ResumeIframeCSR scale={1}>
          <ResumePdf />
        </ResumeIframeCSR>
        <SuppressResumePDFErrorMessage />
      </div>
    </div>
  );
};

export default ReportPanel;
