'use client';

import { useAppSelector } from '@/store/storehooks';
import { ResumeIframeCSR } from './ResumeFrame';
import ResumePdf from './ResumePdf';
import { SuppressResumePDFErrorMessage } from './common/SuppressResumePDFErrorMessage';
import { selectResume } from '@/store/reducers/resumeSlice';
import { Separator } from '../ui/separator';
import { useSetDefaultScale } from '@/hooks/useWindowScale';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useParams, useRouter } from 'next/navigation';

const ReportPanel = () => {
  const param = useParams();
  const router = useRouter();
  const resume = useAppSelector(selectResume);
  const [scale, setScale] = useState<number>(0.8);
  const { setScaleOnResize } = useSetDefaultScale({
    setScale,
    documentSize: 'A4',
  });

  useEffect(() => {
    setScaleOnResize((prev) => !prev);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='relative flex h-full flex-col items-center bg-sectionBackground md:w-[50%] md:overflow-hidden md:p-[var(--resume-padding)]'>
      <ResumeIframeCSR scale={scale}>
        <ResumePdf themeColor='#7D2FF5' resume={resume} />
      </ResumeIframeCSR>
      <SuppressResumePDFErrorMessage />
      <Separator
        orientation='horizontal'
        className='absolute bottom-[var(--resume-control-bar-height)] bg-shadow-border'
      />
      <div className='flex-center absolute bottom-0 left-0 right-0 flex h-[var(--resume-control-bar-height)] px-[var(--resume-padding)] md:w-full md:gap-x-10'>
        <Button onClick={() => router.push(`/writtingpal/resume`)}>
          save and return
        </Button>
        <Button
          onClick={() => router.push(`/writtingpal/resume/${param.id}/preview`)}
        >
          continue
        </Button>
      </div>
    </div>
  );
};

export default ReportPanel;
