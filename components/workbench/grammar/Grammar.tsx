import { useGrammarCheck } from '@/query/copilot';
import { Loader2 } from 'lucide-react';
import { memo } from 'react';
import Starter from '../common/Starter';
import GrammarResult from './GrammarResult';

const Grammar = () => {
  const { mutation, grammarResult, setGrammarResult, editor } =
    useGrammarCheck();
  const handleGrammarCheck = async () => {
    if (editor?.getText().trim() === '') {
      const toast = (await import('sonner')).toast;
      toast.warning('No text found!');
      return;
    }
    const block_content = editor?.getJSON();
    const params = {
      block: block_content?.content?.slice(1) || [], // Ensure block is not undefined
    };
    mutation.mutate(params);
  };
  return (
    <div className='flex flex-1 overflow-y-auto p-4'>
      {mutation.isPending ? (
        <div className='flex-center flex-1'>
          <Loader2 size={24} className='animate-spin text-indigo-500' />
        </div>
      ) : grammarResult.length > 0 ? (
        <GrammarResult result={grammarResult} updateResult={setGrammarResult} />
      ) : (
        <Starter type='grammar' onClick={handleGrammarCheck} />
      )}
    </div>
  );
};

export default memo(Grammar);
