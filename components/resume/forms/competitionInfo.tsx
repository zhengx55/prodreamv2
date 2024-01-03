'use client';
import ReorderItem from '@/components/resume/forms/ReorderItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormHeightVariant } from '@/constant';
import { ICompetitionForm } from '@/types';
import { useResume } from '@/zustand/store';
import { AnimatePresence, Reorder, m } from 'framer-motion';
import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { ChangeEvent } from 'react';
import { BulletListTextarea } from './BulletPointTextarea';
const DatePicker = dynamic(() => import('@/components/root/DatePicker'));
const CompetitionInfo = () => {
  const competitionsInfo = useResume((state) => state.competitions);
  const updateCompetitions = useResume((state) => state.changeCompetitions);
  const addSection = useResume((state) => state.addSectionInForm);
  const deleteSections = useResume((state) => state.deleteSectionInFormByIdx);
  const setCompetitions = useResume((state) => state.setCompetitions);

  const handleDeleteClick = (index: number) => {
    deleteSections('activities', index);
  };

  const handleAddSection = () => {
    addSection('activities');
  };

  const toogleFormExpand = (index: number) => {
    const expand =
      competitionsInfo[index].expand === 'expand' ? 'collapse' : 'expand';
    updateCompetitions(index, 'expand', expand);
  };

  const handleDateChange = (
    index: number,
    value: string,
    field: keyof ICompetitionForm
  ) => {
    updateCompetitions(index, field, value);
  };

  const handleValueChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const field = e.target.name as keyof ICompetitionForm;
    const value = e.target.value;
    updateCompetitions(index, field, value);
  };

  return (
    <>
      <h1 className='title-semibold text-black-100'>Competition</h1>
      <Reorder.Group
        axis='y'
        values={competitionsInfo}
        onReorder={(newOrder) => {
          setCompetitions(newOrder);
        }}
        className='relative'
      >
        {competitionsInfo.map((item, index) => {
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
                  {item.name ? item.name : 'New Competition experience'}
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
                      <Label htmlFor='competition' aria-label='name'>
                        Competition Name
                      </Label>
                      <Input
                        type='text'
                        id='competition'
                        name='name'
                        value={item.name}
                        onChange={(e) => handleValueChange(e, index)}
                        placeholder='Enter competition name'
                      />
                    </div>
                    <div className='form-input-group'>
                      <Label
                        htmlFor='Competition-location'
                        aria-label='location'
                      >
                        Location
                      </Label>
                      <Input
                        type='text'
                        name='location'
                        id='Competition-location'
                        placeholder='Enter location'
                        onChange={(e) => handleValueChange(e, index)}
                        value={item.location}
                      />
                    </div>
                    <div className='form-input-group'>
                      <Label aria-label='end-date'>End Date</Label>
                      <DatePicker
                        index={index}
                        field={'date'}
                        value={item.date ? new Date(item.date) : new Date()}
                        setDate={handleDateChange}
                      />
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
                        placeholder='New York, NY'
                      />
                    </div>
                    <div className='form-input-group col-span-2'>
                      <Label htmlFor='cmp-additional'>
                        Additional Descriptions of this Competition
                      </Label>
                      <BulletListTextarea
                        placeholder='...'
                        name='additional_info'
                        id='cmp-additional'
                        className='h-[150px]'
                        onChange={(field, value) => {
                          updateCompetitions(index, field, value);
                        }}
                        value={item.additional_info}
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
        className='small-regular gap-x-1'
        size={'spaceOff'}
      >
        <Plus size={20} className='text-primary-200' />
        <h1 className='text-primary-200'>Add Competition</h1>
      </Button>
    </>
  );
};

export default CompetitionInfo;
