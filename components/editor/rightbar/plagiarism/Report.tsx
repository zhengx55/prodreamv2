import Spacer from '@/components/root/Spacer';
import { Separator } from '@/components/ui/separator';
import { IPlagiarismData } from '@/query/type';
import { EditorDictType } from '@/types';
import { m } from 'framer-motion';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import Chart from './Chart';

const ReportPDF = dynamic(() => import('./ReportPDF'), { ssr: false });

const Report = ({
  report,
  recheck,
  t,
}: {
  report: Omit<IPlagiarismData, 'status'>;
  recheck: () => Promise<void>;
  t: EditorDictType;
}) => {
  return (
    <m.div
      key={'plagiarism-panel'}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className='flex flex-1 flex-col overflow-y-auto'
    >
      <Spacer y='32' />
      <Chart score={report.scores * 100} t={t} />
      <Spacer y='32' />
      <Separator className='bg-gray-200' orientation='horizontal' />
      <Spacer y='32' />
      <ReportPDF t={t} pdf={report.pdf} />
    </m.div>
  );
};

export default memo(Report);
