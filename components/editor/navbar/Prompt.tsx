import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { saveDoc } from "@/query/api";
import { useDocumentDetail } from "@/query/query";
import { PencilLine } from "lucide-react";
import { useEffect, useState } from "react";


const PromptView = ({id} : {id:string}) => {
  
  const { data: document_content,isFetching, isError } = useDocumentDetail(id);
  const [content, setContent] = useState<string>(  document_content?.brief_description ?? '')
  const [openPrompt, setOpenPrompt] = useState(false);
  const [lineCount, setLineCount] = useState(0)

  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

  const handleOpenPrompt = () => {
    setButtonPosition({ x: -80, y: 10 });
    setOpenPrompt(true);
  };

  useEffect(()=>{
   
    if (content) {
      if (content.length > 5 && content.length <= 10) {
        setLineCount(1) ;
      } else if (content.length > 10 && content.length <= 20) {
        setLineCount(2) ;
      } else if (content.length > 20) {
        setLineCount(3) ;
      } else {
        setLineCount(0) ;
      }
    }
  },[content])

  return (
    <>
      <Popover open={openPrompt} >
        <PopoverTrigger asChild>
          <Button
            role='button'
            className='px-2 py-1 bg-transparent border rounded h-max border-doc-primary text-black-400 hover:bg-doc-secondary hover:text-doc-primary'
            onClick={handleOpenPrompt}
          >
            <PencilLine size={18} className='text-doc-primary' />
            <p className='small-regular text-doc-primary'>Essay Prompt</p>
          </Button>
        </PopoverTrigger>
        <PopoverContent  style={{
            position: 'absolute',
            left: `${buttonPosition.x}px`,
            top: `${buttonPosition.y}px`,
            borderRadius: '8px',
          }} className="w-[800px] h-[260px] shrink-0 border [background:#FFF] rounded-lg border-solid border-[#EAEAEA]">
          <div className="text-[#4B454D] [font-family:Inter] text-2xl font-medium leading-[160%]">
            Please input your prompt below
          </div>
          <div className="w-[579px] h-[25px] shrink-0 text-[#7C757E] [font-family:Inter] text-sm font-normal leading-[160%]">
            Adding an essay prompt can greatly enhance the quality of AI generations
          </div>
          <Textarea value={content}  onChange={(e)=>{
            if (e.target.value) {
              setContent(e.target.value);
            }
          }} className='w-[760px] h-[107px] shrink-0 rounded border bg-white border-solid border-[#EAEAEA]' placeholder="e.g.  This essay is about the challenges and strategies of conserving biodiversity in the Anthropocene and discuss the importance of conservation efforts in safeguarding ecosystems and species from the brink of extinction" />
           

          <div className="flex items-center justify-between mt-4">
          <div className="text-[#4B454D] [font-family:Inter] text-base font-normal leading-[160%]">
            Prompt strength：
            {[...Array(lineCount)].map((_, index) => {
               // 计算亮度值
                const lightness = 90 - (index + 1) * 10;

                // 使用 HSL 颜色表示法创建颜色值
                 const color = `hsl(270, 100%, ${lightness}%)`;
                return (
                  <div
                    key={index}
                    className={`w-20 h-2 shrink-0 bg-purple-500 rounded-[41px]`}
                    style={{
                      backgroundColor: color,
                      display: 'inline-block',
                      position: 'relative',
                      left: `${index * 5}px`
                    }}
                  />
                )
                })}
          </div>
            <div>
              <Button onClick={()=>{
                setOpenPrompt(false);
              }} className="mx-2 inline-flex h-8 justify-center items-center gap-2.5 shrink-0 rounded border [background:#FFF] px-4 py-2 border-solid border-[#D9D9D9] text-[#939393] [font-family:Inter] text-base font-normal leading-[160%] ">Cancel</Button>
              <Button onClick={async ()=>{
                if (content) {
                  await saveDoc({
                    id,
                    brief_description:content
                  }).then(res =>{
                    setOpenPrompt(false); 
                  })
                }
              }} className="mx-2 inline-flex h-8 justify-center items-center gap-2.5 shrink-0 rounded [background:#8652DB] px-4 py-2" >Done</Button>
            </div>
          </div>
         
        </PopoverContent>
      </Popover>
    </>
  );
};

export default PromptView;