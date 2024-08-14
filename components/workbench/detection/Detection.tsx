import { useAiDetection } from '@/query/copilot';
import { IDetectionResult } from '@/query/type';
import { useEditor } from '@/zustand/store';
import { Loader2 } from 'lucide-react';
import { memo, useState } from 'react';
import Starter from '../common/Starter';
import DetectionResult from './DetectionResult';

const Detection = () => {
  const editor = useEditor((state) => state.editor);
  const [detectionResult, setDetectionResult] = useState<
    IDetectionResult | undefined
  >();
  const { mutate, isPending } = useAiDetection((data) => {
    if (
      data.highlight_sentences.length > 0 &&
      data.highlight_sentences[0][0][0] === 0 &&
      data.highlight_sentences[0][0][1] === 0
    ) {
      const newData = {
        ...data,
        highlight_sentences: data.highlight_sentences.slice(1),
      };
      setDetectionResult(newData);
    } else {
      setDetectionResult(data);
    }
  });
  const handleStart = async () => {
    if (!editor) return;
    const content_blocks = editor.getJSON().content ?? [];
    let editor_text = '';
    const title = editor?.getJSON().content?.at(0)?.content?.at(0)?.text;
    editor_text = editor?.getText()?.replace(title!, '').trimStart();
    if (!editor_text) {
      const { toast } = await import('sonner');
      toast.error('Please write something first');
      return;
    }
    mutate({ text: content_blocks });
  };
  return (
    <div className='flex flex-1 flex-col overflow-y-auto p-4'>
      {isPending ? (
        <div className='flex-center flex-1'>
          <Loader2 size={24} className='animate-spin text-indigo-500' />
        </div>
      ) : !detectionResult ? (
        <Starter type='detection' onClick={handleStart} />
      ) : (
        <DetectionResult result={detectionResult} />
      )}
    </div>
  );
};

export default memo(Detection);
