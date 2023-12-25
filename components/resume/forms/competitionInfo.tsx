'use client';
import ReorderItem from '@/components/resume/forms/ReorderItem';
import DatePicker from '@/components/root/DatePicker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormHeightVariant } from '@/constant';
import {
  addSectionInForm,
  changeCompetitions,
  deleteSectionInFormByIdx,
  selectCompetitions,
  setCompetitions,
} from '@/store/reducers/resumeSlice';
import { useAppDispatch, useAppSelector } from '@/store/storehooks';
import { ICompetitionForm } from '@/types';
import { AnimatePresence, Reorder, m } from 'framer-motion';
import { ChevronDown, Plus, Trash2 } from 'lucide-react';
import { ChangeEvent } from 'react';
import { BulletListTextarea } from './BulletPointTextarea';

const CompetitionInfo = () => {
  const competitionsInfo = useAppSelector(selectCompetitions);
  const dispatch = useAppDispatch();

  const handleDeleteClick = (index: number) => {
    dispatch(deleteSectionInFormByIdx({ form: 'competitions', idx: index }));
  };

  const handleAddSection = () => {
    dispatch(addSectionInForm({ form: 'competitions' }));
  };

  const toogleFormExpand = (index: number) => {
    const expand =
      competitionsInfo[index].expand === 'expand' ? 'collapse' : 'expand';
    dispatch(
      changeCompetitions({ idx: index, field: 'expand', value: expand })
    );
  };

  const handleDateChange = (
    index: number,
    value: string,
    field: keyof ICompetitionForm
  ) => {
    dispatch(changeCompetitions({ field, value, idx: index } as any));
  };

  const handleValueChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const field = e.target.name as keyof ICompetitionForm;
    const value = e.target.value;
    dispatch(changeCompetitions({ field, value, idx: index } as any));
  };

  return (
    <>
      <h1 className='title-semibold text-black-100'>Competition</h1>
      <Reorder.Group
        axis='y'
        values={competitionsInfo}
        onReorder={(newOrder) => {
          dispatch(setCompetitions(newOrder));
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
                          dispatch(
                            changeCompetitions({
                              field,
                              value,
                              idx: index,
                            })
                          );
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
