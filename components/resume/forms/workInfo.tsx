'use client';
import ReorderItem from '@/components/resume/forms/ReorderItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormHeightVariant } from '@/constant';
import { IWorkForm } from '@/types';
import { useResume } from '@/zustand/store';
import { AnimatePresence, Reorder, m } from 'framer-motion';
import { ChevronDown, Plus, Trash2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { ChangeEvent } from 'react';
import { BulletListTextarea } from './BulletPointTextarea';
const DatePicker = dynamic(() => import('@/components/root/DatePicker'));
const WorkInfo = () => {
  const addSection = useResume((state) => state.addSectionInForm);
  const deleteSections = useResume((state) => state.deleteSectionInFormByIdx);
  const workInfos = useResume((state) => state.works);
  const updateWorks = useResume((state) => state.changeWorkExperiences);
  const setWork = useResume((state) => state.setWorks);

  const handleDeleteClick = (index: number) => {
    deleteSections('works', index);
  };

  const handleAddSection = () => {
    addSection('works');
  };

  const toogleFormExpand = (index: number) => {
    const expand = workInfos[index].expand === 'expand' ? 'collapse' : 'expand';
    updateWorks(index, 'expand', expand);
  };

  const handleValueChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const field = e.target.name as keyof IWorkForm;
    const value = e.target.value;
    updateWorks(index, field, value);
  };
  const handleDateChange = (
    index: number,
    value: string,
    field: keyof IWorkForm
  ) => {
    updateWorks(index, field, value);
  };
  return (
    <>
      <h1 className='title-semibold text-black-100'>Work</h1>
      <Reorder.Group
        axis='y'
        values={workInfos}
        onReorder={(newOrder) => {
          setWork(newOrder);
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
                  <m.section className='mt-4 grid grid-flow-row grid-cols-2 gap-x-10 gap-y-5 px-2 pb-4'>
                    <div className='form-input-group'>
                      <Label htmlFor='work-position' aria-label='school'>
                        Position
                      </Label>
                      <Input
                        type='text'
                        id='work-position'
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
                          updateWorks(index, field, value);
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
        <h1 className='text-primary-200'>Add Work</h1>
      </Button>
    </>
  );
};

export default WorkInfo;
