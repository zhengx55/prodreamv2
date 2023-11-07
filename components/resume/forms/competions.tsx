import DatePicker from '@/components/root/DatePicker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';

type Props = {};

const CompetionsInfo = (props: Props) => {
  return (
    <>
      <h1 className='title-semibold mt-8 text-black-100'>Competition</h1>
      <div className='mt-8 flex w-full flex-col rounded-md border-1 border-shadow-border px-4 py-4'>
        <h3 className='base-semibold text-black-300'>
          New competition experience
        </h3>
        <section className='mt-4 grid grid-flow-row grid-cols-2 gap-x-10 gap-y-5 px-2'>
          <div className='form-input-group'>
            <Label aria-label='firstname'>Competition Name</Label>
            <Input type='text' id='last-name' placeholder='Enter first name' />
          </div>
          <div className='form-input-group'>
            <Label aria-label='lastname'>Location</Label>
            <Input type='text' id='last-name' placeholder='Enter last name' />
          </div>
          <div className='form-input-group'>
            <Label aria-label='phone number'>Competition Date</Label>
            <DatePicker />
          </div>
          <div className='form-input-group'>
            <Label aria-label='linkedIn'>Competition Results</Label>
            <Input
              type='text'
              id='last-name'
              placeholder='https://www.linkedin.com/'
            />
          </div>
          <div className='form-input-group col-span-2'>
            <Label aria-label='areas'>
              Additional Descriptions of this Competition
            </Label>
            <Textarea
              id='related experience'
              className='h-[150px]'
              placeholder='...'
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default CompetionsInfo;
