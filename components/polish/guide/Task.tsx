import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { startup_task, task_gif } from '@/constant';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const Task = () => {
  const [selectedTask, setSelectedTask] = useState(0);
  return (
    <Accordion defaultChecked type='single' collapsible>
      <AccordionItem className='mx-auto w-[700px] rounded-md' value='item-1'>
        <AccordionTrigger className='flex-between bg-doc-primary px-5 data-[state=closed]:rounded-lg data-[state=open]:rounded-t-lg'>
          <p className='base-semibold text-white'>
            Explore our powerful features!
          </p>
          <ChevronDown className='h-8 w-12 shrink-0 rounded bg-white text-doc-primary transition-transform duration-200' />
        </AccordionTrigger>
        <AccordionContent className='relative flex h-[200px] rounded-b-lg bg-doc-primary px-5'>
          <Image
            alt='task'
            src='/task/Task.png'
            width={100}
            height={100}
            className='absolute bottom-0 left-[calc(50%_-80px)] z-10 h-24 w-24'
          />
          <Image
            alt='task'
            src='/task/Task_corner.png'
            width={220}
            height={120}
            className='h-30 absolute bottom-0 left-0 z-0 w-52'
          />
          <ul className='flex w-1/2 flex-col gap-y-2'>
            {startup_task.map((task, index) => {
              return (
                <li
                  onClick={() => setSelectedTask(index)}
                  key={index}
                  id={task.label}
                  className={`flex-center group z-10 flex w-max cursor-pointer gap-x-2.5 rounded-full px-3 py-1.5 hover:bg-[#ECEDFF] ${selectedTask === index ? 'bg-[#ECEDFF]' : 'bg-white'}`}
                >
                  <Checkbox
                    disabled
                    className='h-4 w-4 rounded-full border-doc-primary'
                  />
                  <label
                    htmlFor={task.label}
                    className={`${selectedTask === index ? 'text-doc-primary' : ''} subtle-regular group-hover:cursor-pointer`}
                  >
                    {task.label}
                  </label>
                </li>
              );
            })}
          </ul>
          <div className='relative h-full w-1/2 overflow-hidden rounded-lg'>
            <Image
              alt='task-showcase'
              src={task_gif[selectedTask].src}
              fill
              className='z-0'
              sizes='(max-width: 768px) 100vw, (max-width: 180px) 50vw, 180px'
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
export default Task;
