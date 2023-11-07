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

const ResearchInfo = () => {
  const [ResearchInfo, setResearchInfo] = useState<Array<IResearchForm>>([
    {
      id: uuidv4(),
      starts: new Date(0),
      ends: new Date(0),
      project: '',
      role: '',
      location: '',
      state: '',
      description: '',
    },
  ]);
  const [formExpanded, setFormExpanded] = useState<Array<boolean>>([false]);

  const deleteResearch = (index: number) => {
    const temp = ResearchInfo.filter((_, i) => i !== index);
    setResearchInfo(temp);
    const tempExpanded = formExpanded.filter((_, i) => i !== index);
    setFormExpanded(tempExpanded);
  };

  const appendResearch = () => {
    const newResearchForm = {
      id: uuidv4(),
      starts: new Date(0),
      ends: new Date(0),
      project: '',
      role: '',
      location: '',
      state: '',
      description: '',
    };
    setResearchInfo((prev) => [...prev, newResearchForm]);
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
    const temp = [...ResearchInfo];
    temp[index][field] = value;
    setResearchInfo(temp);
  };

  return (
    <>
      <h1 className='title-semibold mt-8 text-black-100'>Research</h1>
      <Reorder.Group
        axis='y'
        values={ResearchInfo}
        onReorder={setResearchInfo}
        className='relative'
      >
        {ResearchInfo.map((item, index) => {
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
                    onClick={() => deleteResearch(index)}
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
                      <Label htmlFor='position' aria-label='school'>
                        Project Name
                      </Label>
                      <Input
                        type='text'
                        id='position'
                        name='position'
                        value={item.project}
                        onChange={(e) => handleValueChange(e, index)}
                        placeholder='Enter Position'
                      />
                    </div>
                    <div className='form-input-group'>
                      <Label htmlFor='Research-company' aria-label='company'>
                        Your role
                      </Label>
                      <Input
                        type='text'
                        name='company'
                        id='Research-company'
                        placeholder='Enter company'
                        onChange={(e) => handleValueChange(e, index)}
                        value={item.role}
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
                      <Label htmlFor='Research-location'>City/Location</Label>
                      <Input
                        type='text'
                        id='Research-location'
                        value={item.location}
                        onChange={(e) => handleValueChange(e, index)}
                        name='location'
                        placeholder='Enter City'
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
                        placeholder='New York, NY'
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

      <Button onClick={appendResearch} variant='ghost' className='mt-4 text-xl'>
        <Plus className='text-primary-200' />
        <h1 className='text-primary-200'>Add Research</h1>
      </Button>
    </>
  );
};

export default ResearchInfo;
