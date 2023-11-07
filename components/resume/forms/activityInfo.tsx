'use client';
import { Textarea } from '@/components/ui/textarea';
import { IActivityForm } from '@/types';
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

const ActivityInfo = () => {
  const [ActivityInfo, setActivityInfo] = useState<Array<IActivityForm>>([
    {
      id: uuidv4(),
      starts: new Date(0),
      ends: new Date(0),
      responsibility: '',
      company: '',
      location: '',
      state: '',
      description: '',
    },
  ]);
  const [formExpanded, setFormExpanded] = useState<Array<boolean>>([true]);

  const deleteActivity = (index: number) => {
    const temp = ActivityInfo.filter((_, i) => i !== index);
    setActivityInfo(temp);
    const tempExpanded = formExpanded.filter((_, i) => i !== index);
    setFormExpanded(tempExpanded);
  };

  const appendActivity = () => {
    const newActivityForm = {
      id: uuidv4(),
      starts: new Date(0),
      ends: new Date(0),
      responsibility: '',
      company: '',
      location: '',
      state: '',
      description: '',
    };
    setActivityInfo((prev) => [...prev, newActivityForm]);
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
    const field = e.target.name as keyof IActivityForm;
    const value = e.target.value;
    const temp = [...ActivityInfo];
    temp[index][field] = value;
    setActivityInfo(temp);
  };

  return (
    <>
      <h1 className='title-semibold mt-8 text-black-100'>Activity</h1>
      <Reorder.Group
        axis='y'
        values={ActivityInfo}
        onReorder={setActivityInfo}
        className='relative'
      >
        {ActivityInfo.map((item, index) => {
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
                    onClick={() => deleteActivity(index)}
                    className='absolute -right-7 top-[calc(50%_-_11px)] cursor-pointer text-shadow hover:scale-110 hover:text-nav-active'
                    size={22}
                  />
                </>
              )}
              <div className='flex-between my-6'>
                <h3 className='base-semibold text-black-300'>
                  {item.company ? item.company : 'New Activity experience'}
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
                      <Label htmlFor='activity' aria-label='company'>
                        Company/Organization Name
                      </Label>
                      <Input
                        type='text'
                        id='activity'
                        name='company'
                        value={item.company}
                        onChange={(e) => handleValueChange(e, index)}
                        placeholder='Enter company name'
                      />
                    </div>
                    <div className='form-input-group'>
                      <Label
                        htmlFor='Activity-responsibility'
                        aria-label='company'
                      >
                        Responsibilities
                      </Label>
                      <Input
                        type='text'
                        name='responsibility'
                        id='Activity-responsibility'
                        placeholder='Enter location'
                        onChange={(e) => handleValueChange(e, index)}
                        value={item.responsibility}
                      />
                    </div>
                    <div className='form-input-group'>
                      <Label>Start Date</Label>
                      <DatePicker />
                    </div>
                    <div className='form-input-group'>
                      <Label>End Date</Label>
                      <DatePicker />
                    </div>
                    <div className='form-input-group'>
                      <Label htmlFor='activity-location'>City/Location</Label>
                      <Input
                        type='text'
                        id='activity-location'
                        value={item.location}
                        onChange={(e) => handleValueChange(e, index)}
                        name='location'
                        placeholder='New York, NY'
                      />
                    </div>
                    <div className='form-input-group'>
                      <Label htmlFor='activity-state'>State/Country</Label>
                      <Input
                        type='text'
                        id='activity-state'
                        value={item.state}
                        name='state'
                        onChange={(e) => handleValueChange(e, index)}
                        placeholder='NY'
                      />
                    </div>
                    <div className='form-input-group col-span-2'>
                      <Label htmlFor='activity-description'>
                        Descriptions of This Activity
                      </Label>
                      <Textarea
                        value={item.description}
                        id='activity-description'
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

      <Button onClick={appendActivity} variant='ghost' className='mt-4 text-xl'>
        <Plus className='text-primary-200' />
        <h1 className='text-primary-200'>Add Activity</h1>
      </Button>
    </>
  );
};

export default ActivityInfo;
