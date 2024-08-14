import Spacer from '@/components/root/Spacer';
import { useRightbar } from '@/zustand/store';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import PlagiarismChart from './PlagiarismChart';

const ReportPDF = dynamic(() => import('./ReportPDF'));

const Report = () => {
  const plagiarismResult = useRightbar((state) => state.plagiarismResult);
  return (
    <>
      <PlagiarismChart score={plagiarismResult!.prob * 100} />
      <Spacer y='32' />
      <ReportPDF report={plagiarismResult!} />
    </>
  );
};

export default memo(Report);
