'use client';
import { useSetDefaultScale } from '@/hooks/useWindowScale';
import { selectResume } from '@/store/reducers/resumeSlice';
import { useAppSelector } from '@/store/storehooks';
import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import ResumeFrame from './ResumeFrame';
import { SuppressResumePDFErrorMessage } from './common/SuppressResumePDFErrorMessage';

const ResumePdf = dynamic(() => import('./ResumePdf'), { ssr: false });

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
    <div className='relative flex h-full w-1/2 flex-col items-center justify-between overflow-hidden bg-sectionBackground px-[var(--resume-padding)] pt-[var(--resume-padding)]'>
      <ResumeFrame scale={scale}>
        <ResumePdf themeColor='#7D2FF5' resume={resume} />
      </ResumeFrame>
      <SuppressResumePDFErrorMessage />
      <div className='flex-center h-[var(--resume-control-bar-height)] w-full gap-x-10 border-t border-shadow-border px-[var(--resume-padding)]'>
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
