'use client';
import ReorderItem from '@/components/resume/forms/ReorderItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormHeightVariant } from '@/constant';
import { IResearchForm } from '@/types';
import { useResume } from '@/zustand/store';
import { AnimatePresence, Reorder, m } from 'framer-motion';
import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { ChangeEvent } from 'react';
import { BulletListTextarea } from './BulletPointTextarea';
const DatePicker = dynamic(() => import('@/components/root/DatePicker'));
const ResearchInfo = () => {
  const researchesInfo = useResume((state) => state.researches);
  const updateResearches = useResume((state) => state.changeResearches);
  const addSection = useResume((state) => state.addSectionInForm);
  const deleteSections = useResume((state) => state.deleteSectionInFormByIdx);
  const setResearches = useResume((state) => state.setResearches);

  const handleDeleteClick = (index: number) => {
    deleteSections('researches', index);
  };

  const handleAddSection = () => {
    addSection('researches');
  };

  const toogleFormExpand = (index: number) => {
    const expand =
      researchesInfo[index].expand === 'expand' ? 'collapse' : 'expand';
    updateResearches(index, 'expand', expand);
  };

  const handleValueChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const field = e.target.name as keyof IResearchForm;
    const value = e.target.value;
    updateResearches(index, field, value);
  };

  const handleDateChange = (
    index: number,
    value: string,
    field: keyof IResearchForm
  ) => {
    updateResearches(index, field, value);
  };

  return (
    <>
      <h1 className='title-semibold text-black-100'>Research</h1>
      <Reorder.Group
        axis='y'
        values={researchesInfo}
        onReorder={(newOrder) => {
          setResearches(newOrder);
        }}
        className='relative'
      >
        {researchesInfo.map((item, index) => {
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
                  {item.project ? item.project : 'New Research experience'}
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
                      <Label htmlFor='position' aria-label='position'>
                        Project Name
                      </Label>
                      <Input
                        type='text'
                        id='position'
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
                      <BulletListTextarea
                        placeholder='...'
                        name='description'
                        id='research-description'
                        className='h-[150px]'
                        onChange={(field, value) => {
                          updateResearches(index, field, value);
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
        <h1 className='text-primary-200'>Add Research</h1>
      </Button>
    </>
  );
};

export default ResearchInfo;
