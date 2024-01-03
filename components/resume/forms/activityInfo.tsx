'use client';
import ReorderItem from '@/components/resume/forms/ReorderItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormHeightVariant } from '@/constant';
import { IActivityForm } from '@/types';
import { useResume } from '@/zustand/store';
import { AnimatePresence, Reorder, m } from 'framer-motion';
import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { ChangeEvent } from 'react';
import { BulletListTextarea } from './BulletPointTextarea';

const DatePicker = dynamic(() => import('@/components/root/DatePicker'));

const ActivityInfo = () => {
  const activitiesinfo = useResume((state) => state.activities);
  const updateActivities = useResume((state) => state.changeActivities);
  const addSection = useResume((state) => state.addSectionInForm);
  const deleteSections = useResume((state) => state.deleteSectionInFormByIdx);
  const setActivities = useResume((state) => state.setActivities);

  const handleDeleteClick = (index: number) => {
    deleteSections('activities', index);
  };

  const handleAddSection = () => {
    addSection('activities');
  };

  const toogleFormExpand = (index: number) => {
    const expand =
      activitiesinfo[index].expand === 'expand' ? 'collapse' : 'expand';
    updateActivities(index, 'expand', expand);
  };

  const handleValueChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const field = e.target.name as keyof IActivityForm;
    const value = e.target.value;
    updateActivities(index, field, value);
  };

  const handleDateChange = (
    index: number,
    value: string,
    field: keyof IActivityForm
  ) => {
    updateActivities(index, field, value);
  };
  return (
    <>
      <h1 className='title-semibold text-black-100'>Activity</h1>
      <Reorder.Group
        axis='y'
        values={activitiesinfo}
        onReorder={(newOrder) => {
          setActivities(newOrder);
        }}
        className='relative'
      >
        {activitiesinfo.map((item, index) => {
          return (
            <ReorderItem
              value={item}
              key={item.id}
              itemKey={item.id}
              animate={item.expand === 'expand' ? 'expanded' : 'collapse'}
              variants={FormHeightVariant}
              isParentCollapsed={item.expand === 'collapse'}
              classnames='relative mt-4 flex w-full flex-col rounded-md border border-shadow-border px-4'
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
                  {item.company ? item.company : 'New Activity experience'}
                </h3>
                {item.expand === 'collapse' ? (
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
                {item.expand === 'expand' && (
                  <m.section className='mt-4 grid grid-flow-row grid-cols-2 gap-x-10 gap-y-5 px-2 pb-4'>
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
                      <BulletListTextarea
                        placeholder='...'
                        name='description'
                        id='activity-description'
                        className='h-[150px]'
                        onChange={(field, value) => {
                          updateActivities(index, field, value);
                        }}
                        value={item.description}
                      />
                    </div>
                  </m.section>
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
        className='small-regular gap-x-1'
      >
        <Plus size={20} className='text-primary-200' />
        <h1 className='text-primary-200'>Add Activity</h1>
      </Button>
    </>
  );
};

export default ActivityInfo;
