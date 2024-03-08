'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { DialogClose } from '@radix-ui/react-dialog';
import {  XCircle } from 'lucide-react';
import {  useEffect, useState } from 'react';
import { saveDoc } from '@/query/api';
import { useDocumentDetail } from '@/query/query';
import useUpdateEffect from 'beautiful-react-hooks/useUpdateEffect';

const PromptView = ({id, showPromptView , onFinish} : {id:string, showPromptView?:boolean, onFinish?:()=>void}) => {
  const { data: document_content, isFetching, isError } = useDocumentDetail(id);
  const [content, setContent] = useState<string>(document_content?.brief_description ?? '')
  const [openPrompt, setOpenPrompt] = useState(showPromptView);
  const [lineCount, setLineCount] = useState(0)

  useUpdateEffect(()=>{
    setOpenPrompt(showPromptView)
  },[showPromptView])

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

  return <>
    <Dialog open={openPrompt} modal={false} >
      <DialogContent onPointerDownOutside={(e) => {
        e.preventDefault();
      }} style={{
        borderRadius: '8px',
      }} className="sm:max-w-[800px]  shrink-0 bg-white shadow-md">
        <DialogHeader>
          <DialogTitle className='text-[#4B454D] [font-family:poppins] text-2xl font-medium leading-[160%]'>Please input your prompt below</DialogTitle>
          <DialogDescription className='w-[579px] h-[25px] shrink-0 text-[#7C757E] [font-family:poppins] text-sm font-normal leading-[160%]'>Adding an essay prompt can greatly enhance the quality of AI generations </DialogDescription>
          <DialogClose onClick={()=>{
            setOpenPrompt(false);
            onFinish && onFinish()
          }} className="absolute m-2 text-gray-400 top-1 right-1 hover:text-gray-500">
            <XCircle className="w-6 h-6 shrink-0" />
          </DialogClose>
        </DialogHeader>
        <Textarea  value={content} onChange={(e)=>setContent(e.target.value ?? "")} className='[font-family:poppins] w-[760px] h-[107px] shrink-0 rounded border bg-white border-solid border-[#EAEAEA]' placeholder= "e.g.  This essay is about the challenges and strategies of conserving biodiversity in the Anthropocene and discuss the importance of conservation efforts in safeguarding ecosystems and species from the brink of extinction" />
        <div className="flex items-center justify-between mt-4">
          <div className="text-[#4B454D] [font-family:poppins] text-base font-normal leading-[160%]">
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
        </div>
        <DialogFooter>
          <Button onClick={async ()=>{
            if (content) {
              await saveDoc({
                id,
                brief_description:content
              }).then(res =>{
                setOpenPrompt(false); 
                onFinish && onFinish()
              })
            }
          }} className='inline-flex items-center gap-2.5 h-8 px-4 py-2 rounded bg-purple-700 text-white w-99'>Start Writing</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
}

export default PromptView;