import { Button } from '@/components/ui/button';
import { batchHumanize } from '@/query/api';
import { useMembershipInfo } from '@/query/query';
import { useAIEditor } from '@/zustand/store';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import Unlock from '../Unlock';

type Props = { suggestions: [number[]] };
const Suggestion = ({ suggestions }: Props) => {
  const { data: membership } = useMembershipInfo();
  const [result, setResult] = useState(suggestions);
  const editor = useAIEditor((state) => state.editor_instance);
  const [texts, setTexts] = useState<string[]>([]);
  const {
    data: humanize_result,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['humanize', { texts }],
    queryFn: () => batchHumanize(texts),
    staleTime: 1000 * 60 * 60 * 24,
  });

  useEffect(() => {
    if (editor) {
      const editor_text = editor.getText();
      suggestions.map((suggestion) => {
        const [start, end] = suggestion;
        const text = editor_text.slice(start, end);
        setTexts((prev) => [...prev, text]);
      });
    }
  }, [editor, suggestions]);

  return (
    <div className='flex flex-1 flex-col'>
      {membership?.subscription === 'basic' ? (
        <Unlock text={'Unlock humanize suggestions with the Unlimited Plan'} />
      ) : (
        <>
          {isError ? (
            <p className='small-medium text-red-400'>
              Something went wrong, please try again later
            </p>
          ) : isPending ? (
            <div className='flex-center flex-1'>
              <Loader2 className='animate-spin text-doc-primary' />
            </div>
          ) : (
            <div className='flex-between'>
              <p className='small-medium'>Humanize</p>
              <div className='flex gap-x-3'>
                <Button
                  role='button'
                  onClick={() => {}}
                  className='h-max w-max rounded py-1'
                >
                  Change all
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default Suggestion;
