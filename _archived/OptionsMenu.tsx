// 'use client';
// import { memo, useMemo, useState } from 'react';

// type Props = {
//   submitFunction: UseMutateAsyncFunction<
//     IEssayAssessData,
//     Error,
//     IEssayAssessRequest,
//     void
//   >;
//   toggleShow: () => void;
// };

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import Spacer from '../components/root/Spacer';
// import { Button } from '../components/ui/button';
// // import { useInstitutionOptions } from '@/query/query';
// import { Loader2 } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { v4 } from 'uuid';
// import { UseMutateAsyncFunction } from '@tanstack/react-query';
// import { IEssayAssessData, IEssayAssessRequest } from '@/query/type';
// import { useAiEditiorContext } from '@/context/AIEditiorProvider';
// import { useToast } from '../components/ui/use-toast';

// // const OptionsMenu = ({ submitFunction, toggleShow }: Props) => {
// //   const [category, setCategory] = useState('');
// //   const { toast } = useToast();
// //   const { essayRef } = useAiEditiorContext();
// //   const [prompt, setPrompt] = useState('');
// //   const {
// //     data: rateOptions,
// //     isPending: isOptionsPending,
// //     isError: isOptionsError,
// //   } = useInstitutionOptions();

// //   const categories = useMemo(() => {
// //     if (isOptionsError) {
// //       return [];
// //     } else {
// //       return rateOptions?.map((option) => {
// //         return {
// //           title: option.title,
// //           id: option.id,
// //         };
// //       });
// //     }
// //   }, [isOptionsError, rateOptions]);

// //   const prompt_details = useMemo(() => {
// //     if (prompt) {
// //       return rateOptions
// //         ?.find((option) => option.id === category)
// //         ?.prompts.find((el) => el.id === prompt)?.detail;
// //     } else {
// //       return '';
// //     }
// //   }, [category, prompt, rateOptions]);

// //   const prompts = useMemo(() => {
// //     if (category) {
// //       return rateOptions?.find((option) => option.id === category)?.prompts;
// //     } else {
// //       return [
// //         {
// //           id: v4(),
// //           detail: 'disabled',
// //           title: 'Please What kind of essay are you reviewing?',
// //         },
// //       ];
// //     }
// //   }, [category, rateOptions]);

// //   const handleEvaluation = async () => {
// //     if (!essayRef.current) {
// //       return;
// //     }
// //     const essayContent = essayRef.current.innerText.trim();
// //     if (!prompt || !category) {
// //       toast({
// //         description: 'No institution/prompt detected',
// //         variant: 'destructive',
// //       });
// //       return;
// //     }
// //     if (essayContent === '') {
// //       toast({
// //         description: 'No content detected',
// //         variant: 'destructive',
// //       });
// //       return;
// //     }

// //     await submitFunction({
// //       text: essayContent,
// //       institution_id: category,
// //       prompt_id: prompt,
// //     });
// //   };

// //   if (isOptionsPending) {
// //     return (
// //       <div className='flex-center absolute -left-[450px] top-10 h-[300px] w-[430px] shrink-0 rounded-lg border border-shadow-border bg-white'>
// //         <Loader2 className='animate-spin' />
// //       </div>
// //     );
// //   }

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, x: 100 }}
// //       animate={{ opacity: 1, x: 0 }}
// //       exit={{ opacity: 0, x: 100 }}
// //       className='absolute -left-[450px] top-10 min-h-[300px] w-[430px] shrink-0 rounded-lg border border-shadow-border bg-white px-4 py-4'
// //     >
// //       <h2 className='title-semibold'>Select Essay Prompt</h2>
// //       <Spacer y='14' />
// //       <p className='base-regular'>What kind of essay are you reviewing?</p>
// //       <Spacer y='14' />
// //       <Select value={category} onValueChange={setCategory}>
// //         <SelectTrigger className='w-[300px]'>
// //           <SelectValue placeholder='Select essay type' />
// //         </SelectTrigger>
// //         <SelectContent className='bg-white '>
// //           {categories?.map((category) => {
// //             return (
// //               <SelectItem key={category.id} value={category.id}>
// //                 {category.title}
// //               </SelectItem>
// //             );
// //           })}
// //         </SelectContent>
// //       </Select>
// //       <Spacer y='14' />
// //       <p className='base-regular'>Select essay prompt</p>
// //       <Spacer y='14' />
// //       <Select value={prompt} onValueChange={setPrompt}>
// //         <SelectTrigger className='w-[300px]'>
// //           <SelectValue placeholder='Select essay prompt' />
// //         </SelectTrigger>
// //         <SelectContent className='bg-white'>
// //           {prompts?.map((prompt) => {
// //             return (
// //               <SelectItem
// //                 disabled={prompt.detail === 'disabled'}
// //                 key={prompt.id}
// //                 value={prompt.id}
// //               >
// //                 {prompt.title}
// //               </SelectItem>
// //             );
// //           })}
// //         </SelectContent>
// //       </Select>
// //       <Spacer y='24' />
// //       {prompt_details ? (
// //         <div className='flex flex-col rounded-lg border border-shadow-border bg-sectionBackground p-5'>
// //           <h2 className='base-semibold'>Essay Prompt</h2>
// //           <Spacer y='10' />
// //           <p className='small-regular'>{prompt_details}</p>
// //         </div>
// //       ) : null}
// //       <Spacer y='14' />
// //       <div className='flex justify-end gap-x-2'>
// //         <Button onClick={() => toggleShow()} variant={'ghost'}>
// //           Cancel
// //         </Button>
// //         <Button onClick={handleEvaluation}>Done</Button>
// //       </div>
// //     </motion.div>
// //   );
// // };

// export default memo(OptionsMenu);
