import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { PdfResult } from '@/types';
import { Download } from 'lucide-react';
import { memo } from 'react';

type Props = { report: PdfResult };
const ReportPDF = ({ report }: Props) => {
  return (
    <div className='flex flex-col rounded-lg bg-white p-4'>
      <h2 className='base-medium'>Plagiarism Report</h2>
      <Spacer y='32' />
      <div className='flex w-full flex-col justify-between gap-y-8'>
        <div className='flex items-start justify-evenly'>
          <div className='flex w-1/3 flex-col items-center gap-y-2'>
            <div className='flex-center size-20 rounded-full border-4 border-indigo-500'>
              <h2 className='base-medium'>{report.score}</h2>
            </div>
            <p className='subtle-regular text-center text-neutral-400'>
              Overall similarity score
            </p>
          </div>
          <div className='flex w-1/3 flex-col items-center gap-y-2'>
            <div className='flex-center size-20 rounded-full border-4 border-red-500'>
              <h2 className='base-medium'>{report.results}</h2>
            </div>
            <p className='subtle-regular text-center text-neutral-400'>
              Results found
            </p>
          </div>
          <div className='flex w-1/3 flex-col items-center gap-y-2'>
            <div className='flex-center size-20 rounded-full border-4 border-amber-500'>
              <h2 className='base-medium text-center'>{report.total_words}</h2>
            </div>
            <p className='subtle-regular text-neutral-400'>
              Total words in text
            </p>
          </div>
        </div>

        <div className='flex-center gap-x-4'>
          <a rel='noopener noreferrer' href={report.link} target='_blank'>
            <Button role='button' variant={'outline'}>
              View full report
            </Button>
          </a>
          <a href={report.link} download target='_blank'>
            <Button role='document'>
              <Download className='text-white' size={20} />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};
export default memo(ReportPDF);
