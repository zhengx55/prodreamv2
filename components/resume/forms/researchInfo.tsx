'use client';
import { Textarea } from '@/components/ui/textarea';
import { IResearchForm } from '@/types';
import DatePicker from '@/components/root/DatePicker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { v4 as uuidv4 } from 'uuid';
import { AnimatePresence, Reorder, Variants, motion } from 'framer-motion';
import { ChevronDown, Plus, Trash2 } from 'lucide-react';
import React, { ChangeEvent, useState } from 'react';
import ReorderItem from '@/components/root/ReorderItem';
import { FormHeightVariant } from '@/constant';
import { useAppDispatch, useAppSelector } from '@/store/storehooks';
import {
  addSectionInForm,
  changeResearches,
  deleteSectionInFormByIdx,
  selectResearches,
} from '@/store/reducers/resumeSlice';

const ResearchInfo = () => {
  const researchesInfo = useAppSelector(selectResearches);
  const dispatch = useAppDispatch();

  const [formExpanded, setFormExpanded] = useState<Array<boolean>>(
    Array(researchesInfo.length).fill(false)
  );

  const handleDeleteClick = (index: number) => {
    dispatch(deleteSectionInFormByIdx({ form: 'researches', idx: index }));
    const tempExpanded = formExpanded.filter((_, i) => i !== index);
    setFormExpanded(tempExpanded);
  };

  const handleAddSection = () => {
    dispatch(addSectionInForm({ form: 'researches' }));
    setFormExpanded((prev) => [...prev, false]);
  };

  const toogleFormExpand = (index: number) => {
    const temp = [...formExpanded];
    if (temp[index] === true) {
      temp[index] = false;
      setFormExpanded(temp);
    } else {
      setFormExpanded((prevFormExpanded) => {
        return prevFormExpanded.map((_item, i) => i === index);
      });
    }
  };

  const handleValueChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const field = e.target.name as keyof IResearchForm;
    const value = e.target.value;
    dispatch(changeResearches({ field, value, idx: index }));
  };

  const handleDateChange = (
    index: number,
    value: string,
    field: keyof IResearchForm
  ) => {
    dispatch(changeResearches({ field, value, idx: index }));
  };

  return (
    <>
      <h1 className='title-semibold mt-8 text-black-100'>Research</h1>
      <Reorder.Group
        axis='y'
        values={researchesInfo}
        onReorder={() => {}}
        className='relative'
      >
        {researchesInfo.map((item, index) => {
          return (
            <ReorderItem
              value={item}
              key={item.id}
              itemKey={item.id}
              animate={formExpanded[index] ? 'expanded' : 'collapse'}
              variants={FormHeightVariant}
              isParentCollapsed={!formExpanded[index]}
              classnames='relative mt-4 flex w-full flex-col rounded-md border-1 border-shadow-border px-4'
            >
              {!formExpanded[index] && (
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
                  {item.project ? item.project : 'New Research experience'}
                </h3>
                <ChevronDown
                  onClick={() => toogleFormExpand(index)}
                  className='cursor-pointer'
                  size={24}
                />
              </div>
              <AnimatePresence>
                {formExpanded[index] && (
                  <motion.section className='mt-4 grid grid-flow-row grid-cols-2 gap-x-10 gap-y-5 px-2 pb-4'>
                    <div className='form-input-group'>
                      <Label htmlFor='position' aria-label='position'>
                        Project Name
                      </Label>
                      <Input
                        type='text'
                        id='project'
                        name='project'
                        value={item.project}
                        onChange={(e) => handleValueChange(e, index)}
                        placeholder='Enter project'
                      />
                    </div>
                    <div className='form-input-group'>
                      <Label htmlFor='Research-role' aria-label='role'>
                        Your role
                      </Label>
                      <Input
                        type='text'
                        name='role'
                        id='Research-role'
                        placeholder='Enter role'
                        onChange={(e) => handleValueChange(e, index)}
                        value={item.role}
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
                      <Label htmlFor='Research-location'>City/Location</Label>
                      <Input
                        type='text'
                        id='Research-location'
                        value={item.location}
                        onChange={(e) => handleValueChange(e, index)}
                        name='location'
                        placeholder='New York, NY'
                      />
                    </div>
                    <div className='form-input-group'>
                      <Label htmlFor='Research-state'>State/Country</Label>
                      <Input
                        type='text'
                        id='Research-state'
                        value={item.state}
                        name='state'
                        onChange={(e) => handleValueChange(e, index)}
                        placeholder='NY'
                      />
                    </div>
                    <div className='form-input-group col-span-2'>
                      <Label htmlFor='research-description'>
                        Description of This Experience
                      </Label>
                      <Textarea
                        value={item.description}
                        id='research-description'
                        onChange={(e) => handleValueChange(e, index)}
                        name='description'
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
        <h1 className='text-primary-200'>Add Research</h1>
      </Button>
    </>
  );
};

export default ResearchInfo;
