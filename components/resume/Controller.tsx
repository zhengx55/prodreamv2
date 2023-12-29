'use client';

import { selectResume } from '@/store/reducers/resumeSlice';
import { useAppSelector } from '@/store/storehooks';
import { usePDF } from '@react-pdf/renderer';
import { Download, PencilLine } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import ResumePdf from './ResumePdf';

const Controller = () => {
  const resume = useAppSelector(selectResume);
  const [instance] = usePDF({
    document: <ResumePdf resume={resume} isPDF={false} themeColor='#7D2FF5' />,
  });

  const router = useRouter();
  return (
    <div className='flex flex-col gap-y-4'>
      <Button variant={'white'} onClick={() => router.back()}>
        <PencilLine size={24} />
        Edit
      </Button>
      <a download={'test_resume'} href={instance.url as string}>
        <Button variant={'white'}>
          <Download size={24} /> Downlad
        </Button>
      </a>
    </div>
  );
};

export default Controller;
