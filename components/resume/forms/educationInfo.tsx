'use client';
import DatePicker from '@/components/root/DatePicker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { IEducationForm } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { AnimatePresence, Reorder, motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';
import React, { ChangeEvent, useState } from 'react';
import ReorderItem from '@/components/root/ReorderItem';
import { FormHeightVariant } from '@/constant';

const EducationInfo = () => {
  const [educationInfo, setEducationInfo] = useState<Array<IEducationForm>>([
    {
      id: uuidv4(),
      degree_name: '',
      starts: new Date(0),
      ends: new Date(0),
      school_name: '',
      location: '',
      state: '',
      areas_of_study: '',
      related_courses: '',
      additional_info: '',
    },
  ]);
  const [formExpanded, setFormExpanded] = useState<Array<boolean>>([true]);

  const deleteEducation = (index: number) => {
    const temp = educationInfo.filter((_, i) => i !== index);
    const tempExpanded = formExpanded.filter((_, i) => i !== index);
    setEducationInfo(temp);
    setFormExpanded(tempExpanded);
  };
  const appendEducation = () => {
    const newEducationForm = {
      id: uuidv4(),
      degree_name: '',
      starts: new Date(0),
      ends: new Date(0),
      school_name: '',
      location: '',
      state: '',
      areas_of_study: '',
      related_courses: '',
      additional_info: '',
    };
    setEducationInfo((prev) => [...prev, newEducationForm]);
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
    const field = e.target.name as keyof IEducationForm;
    const value = e.target.value;
    const temp = [...educationInfo];
    temp[index][field] = value;
    setEducationInfo(temp);
  };

  return (
    <>
      <h1 className='title-semibold mt-8 text-black-100'>Education</h1>
      <Reorder.Group
        axis='y'
        values={educationInfo}
        onReorder={setEducationInfo}
        className='relative'
      >
        {educationInfo.map((item, index) => {
          return (
            <ReorderItem
              value={item}
              key={item.id}
              itemKey={item.id}
              animate={formExpanded[index] ? 'expanded' : 'collapse'}
              variants={FormHeightVariant}
              isParentCollapsed={!formExpanded[index]}
              classnames='relative mt-4 flex w-full flex-col rounded-md border-1 border-shadow-border px-4 z-0'
            >
              {!formExpanded[index] && (
                <>
                  <Trash2
                    onClick={() => deleteEducation(index)}
                    className='absolute -right-7 top-[calc(50%_-_11px)] cursor-pointer text-shadow hover:scale-110 hover:text-nav-active'
                    size={22}
                  />
                </>
              )}
              <div className='flex-between my-6'>
                <h3 className='base-semibold text-black-300'>
                  {item.school_name
                    ? item.school_name
                    : 'New educational experience'}
                </h3>
                {!formExpanded[index] ? (
                  <ChevronDown
                    onClick={() => toogleFormExpand(index)}
                    className='cursor-pointer'
                    size={24}
                  />
                ) : (
                  <ChevronUp
                    onClick={() => toogleFormExpand(index)}
                    className='cursor-pointer'
                    size={24}
                  />
                )}
              </div>
              <AnimatePresence>
                {formExpanded[index] && (
                  <motion.section className='mt-4 grid grid-flow-row grid-cols-2 gap-x-10 gap-y-5 px-2 pb-4'>
                    <div className='form-input-group'>
                      <Label htmlFor='school_name' aria-label='school'>
                        School Name
                      </Label>
                      <Input
                        type='text'
                        id='school_name'
                        name='school_name'
                        value={item.school_name}
                        onChange={(e) => handleValueChange(e, index)}
                        placeholder='Enter first name'
                      />
                    </div>
                    <div className='form-input-group'>
                      <Label htmlFor='degree' aria-label='degree'>
                        Full Degree Name
                      </Label>
                      <Input
                        type='text'
                        name='degree_name'
                        id='degree'
                        placeholder='Enter degree'
                      />
                    </div>
                    <div className='form-input-group'>
                      <Label aria-label='date'>Start Date</Label>
                      <DatePicker />
                    </div>
                    <div className='form-input-group'>
                      <Label aria-label='end-date'>End Date</Label>
                      <DatePicker />
                    </div>
                    <div className='form-input-group'>
                      <Label htmlFor='edu-location'>City/Location</Label>
                      <Input
                        type='text'
                        id='edu-location'
                        name='location'
                        placeholder='Enter City'
                      />
                    </div>
                    <div className='form-input-group'>
                      <Label htmlFor='edu-state'>State/Country</Label>
                      <Input
                        type='text'
                        id='edu-state'
                        name='state'
                        placeholder='New York, NY'
                      />
                    </div>
                    <div className='form-input-group'>
                      <Label htmlFor='area of study'>Areas of Study</Label>
                      <Textarea id='area of study' name='areas_of_study' />
                    </div>
                    <div className='form-input-group'>
                      <Label htmlFor='related course'>Related Courses</Label>
                      <Textarea id='related course' name='related_courses' />
                    </div>
                    <div className='form-input-group col-span-2'>
                      <Label htmlFor='additional info'>
                        Additional Information
                      </Label>
                      <Textarea
                        id='additional info'
                        className='h-[150px]'
                        placeholder='...'
                        name='additional_info'
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
        onClick={appendEducation}
        variant='ghost'
        className='mt-4 text-xl'
      >
        <Plus className='text-primary-200' />
        <h1 className='text-primary-200'>Add Education</h1>
      </Button>
    </>
  );
};

export default EducationInfo;
