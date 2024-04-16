import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { useMembershipInfo } from '@/query/query';
import { EditorDictType } from '@/types';
import { useAIEditor } from '@/zustand/store';
import { Download } from 'lucide-react';
import { Route } from 'next';
import { memo } from 'react';
import { PdfResult } from './Plagiarism';

type Props = { t: EditorDictType; report: PdfResult };
const ReportPDF = ({ t, report }: Props) => {
  const { data: membership } = useMembershipInfo();
  const updatePaymentModal = useAIEditor((state) => state.updatePaymentModal);

  return (
    <div className='flex flex-col'>
      <h2 className='small-medium inline-flex items-center gap-x-2'>
        {t.Plagiarism.Report}
      </h2>
      <Spacer y='32' />
      {membership?.subscription === 'basic' ? null : null}
      <div className='flex w-full flex-col items-center justify-between gap-y-8 border border-gray-200 py-10'>
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
        {membership?.subscription === 'basic' ? (
          <div className='flex-center'>
            <Button
              role='button'
              className='rounded-lg'
              variant={'outline'}
              onClick={() => updatePaymentModal(true)}
            >
              Unlock full report
            </Button>
          </div>
        ) : (
          <div className='flex-center gap-x-4'>
            <a
              rel='noopener noreferrer'
              href={report.link as Route}
              target='_blank'
            >
              <Button role='button' className='rounded-lg' variant={'outline'}>
                View full report
              </Button>
            </a>
            <a href={report.link} download target='_blank'>
              <Button role='document' className='h-max w-max rounded-lg p-2'>
                <Download className='text-white' />
              </Button>
            </a>
          </div>
        )}
      </div>
      <Spacer y='80' />
    </div>
  );
};
export default memo(ReportPDF);
