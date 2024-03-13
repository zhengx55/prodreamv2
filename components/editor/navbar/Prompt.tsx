import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { saveDoc } from '@/query/api';
import { useDocumentDetail } from '@/query/query';
import { PencilLine } from 'lucide-react';
import { useEffect, useState } from 'react';

const PromptView = ({ id }: { id: string }) => {
  const { data: document_content } = useDocumentDetail(id);
  const [content, setContent] = useState<string>(
    document_content?.brief_description ?? ''
  );
  const [lineCount, setLineCount] = useState(0);

  useEffect(() => {
    if (content) {
      const wordCount = content.trim().split(/\s+/).length;
      if (wordCount >= 5 && wordCount < 10) {
        setLineCount(1);
      } else if (wordCount >= 10 && wordCount < 20) {
        setLineCount(2);
      } else if (wordCount >= 20) {
        setLineCount(3);
      } else {
        setLineCount(0);
      }
    }
  }, [content]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          role='button'
          className='h-max rounded border border-doc-primary bg-transparent px-2 py-1 text-black-400 hover:bg-doc-secondary hover:text-doc-primary'
        >
          <PencilLine size={18} className='text-doc-primary' />
          <p className='small-regular text-doc-primary'>Essay Prompt</p>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align='start'
        sideOffset={15}
        className='h-[260px] w-[800px] shrink-0 rounded-lg border border-solid border-[#EAEAEA] bg-white'
      >
        <h1 className='text-2xl font-medium leading-[160%] '>
          Please input your prompt below
        </h1>
        <p className='small-regular text-zinc-500'>
          Adding an essay prompt can greatly enhance the quality of AI
          generations
        </p>
        <Spacer y='10' />
        <Textarea
          value={content}
          required
          aria-label='essay prompt'
          onChange={(e) => setContent(e.target.value)}
          className='h-[107px] w-[760px] shrink-0 rounded border border-[#EAEAEA]'
          placeholder='e.g.  This essay is about the challenges and strategies of conserving biodiversity in the Anthropocene and discuss the importance of conservation efforts in safeguarding ecosystems and species from the brink of extinction'
        />

        <div className='mt-4 flex items-center justify-between'>
          <div className='text-base font-normal leading-[160%]'>
            Prompt strength：
            {[...Array(lineCount)].map((_, index) => {
              const lightness = 90 - (index + 1) * 10;
              const color = `hsl(270, 100%, ${lightness}%)`;
              return (
                <div
                  key={index}
                  className={`h-2 w-20 shrink-0 rounded-[41px] bg-purple-500`}
                  style={{
                    backgroundColor: color,
                    display: 'inline-block',
                    position: 'relative',
                    left: `${index * 5}px`,
                  }}
                />
              );
            })}
          </div>
          <div className='flex items-center gap-x-2'>
            <PopoverClose asChild>
              <Button
                role='button'
                variant={'ghost'}
                className='border-zin-300 base-regular h-max rounded border px-4 py-2 text-neutral-400'
              >
                Cancel
              </Button>
            </PopoverClose>
            <PopoverClose asChild>
              <Button
                role='button'
                onClick={async () => {
                  if (content) {
                    await saveDoc({
                      id,
                      brief_description: content,
                    });
                  }
                }}
                className='base-regular h-max rounded px-4 py-2 '
              >
                Done
              </Button>
            </PopoverClose>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PromptView;
