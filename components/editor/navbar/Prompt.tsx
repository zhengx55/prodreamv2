
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { DialogClose } from '@radix-ui/react-dialog';
import { PencilLine, XCircle } from 'lucide-react';
import { useState } from 'react';
import { saveDoc } from '@/query/api';

const PromptView = ({id} : {id:string}) => {

  const [content, setContent] = useState<string>()
  const [openPrompt, setOpenPrompt] = useState(false);

  return <>
    <Dialog open={openPrompt}>
      <DialogTrigger asChild>
        <Button
          role='button'
          className='px-2 py-1 bg-transparent border rounded h-max border-doc-primary text-black-400 hover:bg-doc-secondary hover:text-doc-primary'
          onClick={()=>{
            setOpenPrompt(true);
          }}
        >
          <PencilLine size={18} className='text-doc-primary' />
          <p className='small-regular text-doc-primary'>Essay Prompt</p>
        </Button>
      </DialogTrigger>
      <DialogContent  onPointerDownOutside={(e) => {
        e.preventDefault();
      }} className="sm:max-w-[800px]  shrink-0 bg-white rounded-sm shadow-md">
        <DialogHeader>
          <DialogTitle className='text-[#4B454D] [font-family:Inter] text-2xl font-medium leading-[160%]'>Please input your prompt below</DialogTitle>
          <DialogDescription className='w-[579px] h-[25px] shrink-0 text-[#7C757E] [font-family:Inter] text-sm font-normal leading-[160%]'>Adding an essay prompt can greatly enhance the quality of AI generations </DialogDescription>
          <DialogClose className="absolute m-2 text-gray-500 top-1 right-1 hover:text-gray-700">
            <XCircle className="w-6 h-6 shrink-0" />
          </DialogClose>
        </DialogHeader>
        
          <Textarea onChange={(e)=>{
            if (e.target.value) {
              setContent(e.target.value);
            }
          }} className='w-[760px] h-[107px] shrink-0 rounded border bg-white border-solid border-[#EAEAEA]' placeholder="e.g.  This essay is about the challenges and strategies of conserving biodiversity in the Anthropocene and discuss the importance of conservation efforts in safeguarding ecosystems and species from the brink of extinction" />
      
        <DialogFooter>
          <Button onClick={async ()=>{
            if (content) {
              await saveDoc({
                id,
                brief_description:content
              }).then(res =>{
                setOpenPrompt(false); 
              })
            }
          }} className='inline-flex items-center gap-2.5 h-8 px-4 py-2 rounded bg-purple-700 text-white w-99'>Start Writing</Button>
        </DialogFooter>
      
      </DialogContent>
    </Dialog>
  </>
}

export default PromptView;