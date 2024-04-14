import Spacer from '@/components/root/Spacer';
import { Separator } from '@/components/ui/separator';
import { EditorDictType } from '@/types';
import { m } from 'framer-motion';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import Chart from './Chart';
import { PdfResult } from './Plagiarism';

const ReportPDF = dynamic(() => import('./ReportPDF'));

const Report = ({ report, t }: { report: PdfResult; t: EditorDictType }) => {
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
      <Chart score={report.prob * 100} t={t} />
      <Spacer y='32' />
      <Separator className='bg-gray-200' orientation='horizontal' />
      <Spacer y='32' />
      <ReportPDF t={t} report={report} />
    </m.div>
  );
};

export default memo(Report);
