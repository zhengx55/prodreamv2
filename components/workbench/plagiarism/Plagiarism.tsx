import { plag_report_type } from '@/constant';
import { usePlagiarismDetection } from '@/query/plagiarism';
import { PdfResult } from '@/types';
import { useEditor, useRightbar } from '@/zustand/store';
import dynamic from 'next/dynamic';
import { memo, useCallback } from 'react';
import { pdfjs } from 'react-pdf';
import Starter from '../common/Starter';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

const NonPlagiarised = dynamic(() => import('./NonPlagiarised'));
const PlagiarismLoading = dynamic(() => import('./PlagiarismLoading'));
const PlagiarismReport = dynamic(() => import('./PlagiarismReport'));

const Plagiarism = () => {
  const editor = useEditor((state) => state.editor);
  const plagiarismLoading = useRightbar((state) => state.plagiarismLoading);
  const plagiarismProgress = useRightbar((state) => state.plagiarismProgress);
  const plagiarismResult = useRightbar((state) => state.plagiarismResult);
  const processPdfContent = async (
    pdfUrl: string | null
  ): Promise<PdfResult> => {
    const updates: PdfResult = {
      prob: -1,
      link: '',
      score: '',
      results: '',
      total_words: '',
    };
    if (!pdfUrl) {
      updates.prob = 0;
      return updates;
    }
    updates.link = pdfUrl;
    const loadingTask = pdfjs.getDocument(pdfUrl);
    const pdfpage = await loadingTask.promise;
    const page = await pdfpage.getPage(1);
    const textContent = await page.getTextContent();

    textContent.items.forEach((item, index) => {
      if ('str' in item && plag_report_type.includes(item.str)) {
        const value = (textContent.items[index + 2] as any).str;
        if (item.str === plag_report_type[0]) {
          updates.score = value;
        } else if (item.str === plag_report_type[1]) {
          updates.results = value;
        } else {
          updates.total_words = value;
        }
      }
    });

    return updates;
  };
  const { mutate } = usePlagiarismDetection(processPdfContent);

  const handlePlagiarismCheck = useCallback(async () => {
    let editor_text: string | undefined;
    const title = editor?.getJSON().content?.at(0)?.content?.at(0)?.text;
    editor_text = editor?.getText()?.replace(title!, '').trimStart();
    if (!editor_text) {
      const toast = (await import('sonner')).toast;
      toast.error('Please write something to check plagiarism');
      return;
    }
    mutate(editor_text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  return (
    <div className='flex flex-1 flex-col overflow-y-auto p-4'>
      {plagiarismLoading ? (
        <PlagiarismLoading progress={plagiarismProgress} />
      ) : plagiarismResult ? (
        plagiarismResult.prob === 0 ? (
          <NonPlagiarised onClick={handlePlagiarismCheck} />
        ) : (
          <PlagiarismReport />
        )
      ) : (
        <Starter type='plagiarism' onClick={handlePlagiarismCheck} />
      )}
    </div>
  );
};

export default memo(Plagiarism);
