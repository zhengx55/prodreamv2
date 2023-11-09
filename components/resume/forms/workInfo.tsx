'use client';
import { IWorkForm } from '@/types';
import DatePicker from '@/components/root/DatePicker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AnimatePresence, Reorder, motion } from 'framer-motion';
import { ChevronDown, Plus, Trash2 } from 'lucide-react';
import React, { ChangeEvent } from 'react';
import ReorderItem from '@/components/root/ReorderItem';
import { FormHeightVariant } from '@/constant';
import { useAppDispatch, useAppSelector } from '@/store/storehooks';
import {
  addSectionInForm,
  changeWorkExperiences,
  deleteSectionInFormByIdx,
  selectWorkExperiences,
  setWorks,
} from '@/store/reducers/resumeSlice';
import { BulletListTextarea } from './BulletPointTextarea';

const WorkInfo = () => {
  const workInfos = useAppSelector(selectWorkExperiences);
  const dispatch = useAppDispatch();

  const handleDeleteClick = (index: number) => {
    dispatch(deleteSectionInFormByIdx({ form: 'works', idx: index }));
  };

  const handleAddSection = () => {
    dispatch(addSectionInForm({ form: 'works' }));
  };

  const toogleFormExpand = (index: number) => {
    const expand = workInfos[index].expand === 'expand' ? 'collapse' : 'expand';
    dispatch(
      changeWorkExperiences({ idx: index, field: 'expand', value: expand })
    );
  };

  const handleValueChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const field = e.target.name as keyof IWorkForm;
    const value = e.target.value;
    dispatch(changeWorkExperiences({ field, value, idx: index } as any));
  };
  const handleDateChange = (
    index: number,
    value: string,
    field: keyof IWorkForm
  ) => {
    dispatch(changeWorkExperiences({ field, value, idx: index } as any));
  };
  return (
    <>
      <h1 className='title-semibold mt-8 text-black-100'>Work</h1>
      <Reorder.Group
        axis='y'
        values={workInfos}
        onReorder={(newOrder) => {
          dispatch(setWorks(newOrder));
        }}
        className='relative'
      >
        {workInfos.map((item, index) => {
          return (
            <ReorderItem
              value={item}
              key={item.id}
              itemKey={item.id}
              animate={item.expand === 'expand' ? 'expanded' : 'collapse'}
              variants={FormHeightVariant}
              isParentCollapsed={item.expand === 'collapse'}
              classnames='relative mt-4 flex w-full flex-col rounded-md border-1 border-shadow-border px-4'
            >
              {item.expand === 'collapse' && (
                <>
                  <Trash2
                    onClick={() => handleDeleteClick(index)}
                    className='absolute -right-7 top-[calc(50%_-_11px)] cursor-pointer text-shadow hover:scale-110 hover:text-nav-active'
                    size={22}
                  />
                </>
              )}
              <div className='flex-between my-6'>
                <h3 className='base-semibold text-black-300'>
                  {item.company ? item.company : 'New work experience'}
                </h3>
                <ChevronDown
                  onClick={() => toogleFormExpand(index)}
                  className='cursor-pointer'
                  size={24}
                />
              </div>
              <AnimatePresence>
                {item.expand === 'expand' && (
                  <motion.section className='mt-4 grid grid-flow-row grid-cols-2 gap-x-10 gap-y-5 px-2 pb-4'>
                    <div className='form-input-group'>
                      <Label htmlFor='position' aria-label='school'>
                        Position
                      </Label>
                      <Input
                        type='text'
                        id='position'
                        name='position'
                        value={item.position}
                        onChange={(e) => handleValueChange(e, index)}
                        placeholder='Enter Position'
                      />
                    </div>
                    <div className='form-input-group'>
                      <Label htmlFor='work-company' aria-label='company'>
                        Company/Organization Name
                      </Label>
                      <Input
                        type='text'
                        name='company'
                        id='work-company'
                        placeholder='Enter company'
                        onChange={(e) => handleValueChange(e, index)}
                        value={item.company}
                      />
                    </div>
                    <div className='form-input-group'>
                      <Label aria-label='date'>Start Date</Label>
                      <DatePicker
                        index={index}
                        field='starts'
                        value={item.starts ? new Date(item.starts) : new Date()}
                        setDate={handleDateChange}
                      />
                    </div>
                    <div className='form-input-group'>
                      <Label aria-label='end-date'>End Date</Label>
                      <DatePicker
                        index={index}
                        field={'ends'}
                        value={item.ends ? new Date(item.ends) : new Date()}
                        setDate={handleDateChange}
                      />
                    </div>
                    <div className='form-input-group'>
                      <Label htmlFor='work-location'>City/Location</Label>
                      <Input
                        type='text'
                        id='work-location'
                        value={item.location}
                        onChange={(e) => handleValueChange(e, index)}
                        name='location'
                        placeholder='New York, NY'
                      />
                    </div>
                    <div className='form-input-group'>
                      <Label htmlFor='work-state'>State/Country</Label>
                      <Input
                        type='text'
                        id='work-state'
                        value={item.state}
                        name='state'
                        onChange={(e) => handleValueChange(e, index)}
                        placeholder='NY'
                      />
                    </div>
                    <div className='form-input-group col-span-2'>
                      <Label htmlFor='work-description'>
                        Description of This Experience
                      </Label>
                      <BulletListTextarea
                        placeholder='...'
                        name='description'
                        id='work-description'
                        className='h-[150px]'
                        onChange={(field, value) => {
                          dispatch(
                            changeWorkExperiences({
                              field,
                              value,
                              idx: index,
                            })
                          );
                        }}
                        value={item.description}
                      />
                    </div>
                  </motion.section>
                )}
              </AnimatePresence>
            </ReorderItem>
          );
        })}
      </Reorder.Group>

      <Button
        onClick={handleAddSection}
        variant='ghost'
        size={'spaceOff'}
        className='mt-4 text-xl'
      >
        <Plus className='text-primary-200' />
        <h1 className='text-primary-200'>Add Work</h1>
      </Button>
    </>
  );
};

export default WorkInfo;
