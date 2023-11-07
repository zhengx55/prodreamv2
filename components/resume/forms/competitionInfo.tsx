'use client';
import { Textarea } from '@/components/ui/textarea';
import { ICompetitionForm } from '@/types';
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

const CompetitionInfo = () => {
  const [CompetitionInfo, setCompetitionInfo] = useState<
    Array<ICompetitionForm>
  >([
    {
      id: uuidv4(),
      name: '',
      date: new Date(0),
      results: '',
      degree_name: '',
      location: '',
      additional: '',
    },
  ]);
  const [formExpanded, setFormExpanded] = useState<Array<boolean>>([true]);

  const deleteCompetition = (index: number) => {
    const temp = CompetitionInfo.filter((_, i) => i !== index);
    setCompetitionInfo(temp);
    const tempExpanded = formExpanded.filter((_, i) => i !== index);
    setFormExpanded(tempExpanded);
  };

  const appendCompetition = () => {
    const newCompetitionForm = {
      id: uuidv4(),
      name: '',
      date: new Date(0),
      results: '',
      degree_name: '',
      location: '',
      additional: '',
    };
    setCompetitionInfo((prev) => [...prev, newCompetitionForm]);
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
    const field = e.target.name as keyof ICompetitionForm;
    const value = e.target.value;
    const temp = [...CompetitionInfo];
    temp[index][field] = value;
    setCompetitionInfo(temp);
  };

  return (
    <>
      <h1 className='title-semibold mt-8 text-black-100'>Competition</h1>
      <Reorder.Group
        axis='y'
        values={CompetitionInfo}
        onReorder={setCompetitionInfo}
        className='relative'
      >
        {CompetitionInfo.map((item, index) => {
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
                    onClick={() => deleteCompetition(index)}
                    className='absolute -right-7 top-[calc(50%_-_11px)] cursor-pointer text-shadow hover:scale-110 hover:text-nav-active'
                    size={22}
                  />
                </>
              )}
              <div className='flex-between my-6'>
                <h3 className='base-semibold text-black-300'>
                  {item.name ? item.name : 'New Competition experience'}
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
                      <Label htmlFor='competition' aria-label='school'>
                        Competition Name{' '}
                      </Label>
                      <Input
                        type='text'
                        id='competition'
                        name='competition'
                        value={item.name}
                        onChange={(e) => handleValueChange(e, index)}
                        placeholder='Enter competition name'
                      />
                    </div>
                    <div className='form-input-group'>
                      <Label
                        htmlFor='Competition-location'
                        aria-label='company'
                      >
                        Location
                      </Label>
                      <Input
                        type='text'
                        name='company'
                        id='Competition-location'
                        placeholder='Enter location'
                        onChange={(e) => handleValueChange(e, index)}
                        value={item.location}
                      />
                    </div>
                    <div className='form-input-group'>
                      <Label aria-label='date'>Competition Date</Label>
                      <DatePicker />
                    </div>
                    <div className='form-input-group'>
                      <Label htmlFor='Competition-Results'>
                        Competition Results
                      </Label>
                      <Input
                        type='text'
                        id='Competition-Results'
                        value={item.results}
                        onChange={(e) => handleValueChange(e, index)}
                        name='results'
                        placeholder='Enter City'
                      />
                    </div>
                    <div className='form-input-group col-span-2'>
                      <Label htmlFor='additional'>
                        Additional Descriptions of this Competition
                      </Label>
                      <Textarea
                        value={item.additional}
                        id='additional'
                        onChange={(e) => handleValueChange(e, index)}
                        name='additional'
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
        onClick={appendCompetition}
        variant='ghost'
        className='mt-4 text-xl'
      >
        <Plus className='text-primary-200' />
        <h1 className='text-primary-200'>Add Competition</h1>
      </Button>
    </>
  );
};

export default CompetitionInfo;
