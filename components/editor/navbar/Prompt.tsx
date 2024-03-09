import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { saveDoc } from '@/query/api';
import { useDocumentDetail } from '@/query/query';
import { PencilLine } from 'lucide-react';
import { useEffect, useState } from 'react';

const PromptView = ({ id }: { id: string }) => {
  const { data: document_content, isFetching, isError } = useDocumentDetail(id);
  const [content, setContent] = useState<string>(
    document_content?.brief_description ?? ''
  );
  const [openPrompt, setOpenPrompt] = useState(false);
  const [lineCount, setLineCount] = useState(0);

  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

  const handleOpenPrompt = () => {
    setButtonPosition({ x: -80, y: 10 });
    setOpenPrompt(true);
  };

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
    <>
      <Popover open={openPrompt}>
        <PopoverTrigger asChild>
          <Button
            role='button'
            className='h-max rounded border border-doc-primary bg-transparent px-2 py-1 text-black-400 hover:bg-doc-secondary hover:text-doc-primary'
            onClick={handleOpenPrompt}
          >
            <PencilLine size={18} className='text-doc-primary' />
            <p className='small-regular text-doc-primary'>Essay Prompt</p>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          style={{
            position: 'absolute',
            left: `${buttonPosition.x}px`,
            top: `${buttonPosition.y}px`,
            borderRadius: '8px',
          }}
          className='h-[260px] w-[800px] shrink-0 rounded-lg border border-solid border-[#EAEAEA] [background:#FFF]'
        >
          <div className='text-2xl font-medium leading-[160%] text-[#4B454D] [font-family:poppins]'>
            Please input your prompt below
          </div>
          <div className='h-[25px] w-[579px] shrink-0 text-sm font-normal leading-[160%] text-[#7C757E] [font-family:poppins]'>
            Adding an essay prompt can greatly enhance the quality of AI
            generations
          </div>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='h-[107px] w-[760px] shrink-0 rounded border border-solid border-[#EAEAEA] bg-white [font-family:poppins]'
            placeholder='e.g.  This essay is about the challenges and strategies of conserving biodiversity in the Anthropocene and discuss the importance of conservation efforts in safeguarding ecosystems and species from the brink of extinction'
          />

          <div className='mt-4 flex items-center justify-between'>
            <div className='text-base font-normal leading-[160%] text-[#4B454D] [font-family:poppins]'>
              Prompt strength：
              {[...Array(lineCount)].map((_, index) => {
                // 计算亮度值
                const lightness = 90 - (index + 1) * 10;

                // 使用 HSL 颜色表示法创建颜色值
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
            <div>
              <Button
                onClick={() => {
                  setOpenPrompt(false);
                }}
                className='mx-2 inline-flex h-8 shrink-0 items-center justify-center gap-2.5 rounded border border-solid border-[#D9D9D9] px-4 py-2 text-base font-normal leading-[160%] text-[#939393] [font-family:poppins] [background:#FFF] '
              >
                Cancel
              </Button>
              <Button
                onClick={async () => {
                  if (content) {
                    await saveDoc({
                      id,
                      brief_description: content,
                    }).then((res) => {
                      setOpenPrompt(false);
                    });
                  }
                }}
                className='mx-2 inline-flex h-8 shrink-0 items-center justify-center gap-2.5 rounded px-4 py-2 [background:#8652DB]'
              >
                Done
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default PromptView;
